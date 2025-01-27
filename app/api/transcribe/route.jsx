import { NextResponse } from "next/server";
import axios from "axios";

// Configure API settings with increased timeout
export const config = {
  api: {
    bodyParser: false,
    responseLimit: "50mb",
  },
};

// Create an axios instance with improved config
const assemblyAI = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: process.env.ASSEMBLY_AI_API_KEY,
    "content-type": "application/json",
  },
  timeout: 60000, // Increased to 60 seconds
});

// Helper function to upload audio with chunking for large files
async function uploadAudio(buffer) {
  try {
    // For large files, consider implementing chunked upload
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
    if (buffer.length > CHUNK_SIZE) {
      let uploadUrl;
      for (let i = 0; i < buffer.length; i += CHUNK_SIZE) {
        const chunk = buffer.slice(i, i + CHUNK_SIZE);
        const response = await assemblyAI.post("/upload", chunk, {
          headers: {
            "content-type": "application/octet-stream",
            "transfer-encoding": "chunked",
          },
        });
        uploadUrl = response.data.upload_url;
      }
      return uploadUrl;
    }

    const response = await assemblyAI.post("/upload", buffer, {
      headers: {
        "content-type": "application/octet-stream",
      },
    });
    return response.data.upload_url;
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    throw new Error(`Failed to upload audio file: ${error.message}`);
  }
}

// Improved polling function with better error handling and backoff strategy
async function pollTranscription(transcriptId, maxRetries = 60) {
  // Increased retries
  let delay = 1000;
  let consecutiveErrors = 0;
  const MAX_CONSECUTIVE_ERRORS = 3;

  for (let retries = 0; retries < maxRetries; retries++) {
    try {
      const response = await assemblyAI.get(`/transcript/${transcriptId}`);
      const transcript = response.data;
      consecutiveErrors = 0; // Reset error counter on successful request

      if (transcript.status === "completed") {
        return transcript.text;
      }

      if (transcript.status === "error") {
        throw new Error(`Transcription failed: ${transcript.error}`);
      }

      // More informative logging
      console.log(
        `Transcription status: ${transcript.status}, attempt ${
          retries + 1
        }/${maxRetries}`
      );

      // Improved backoff strategy
      delay = Math.min(delay * 1.5, 15000); // Max delay increased to 15 seconds
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      console.error(
        `Polling error (attempt ${retries + 1}):`,
        error.response?.data || error.message
      );
      consecutiveErrors++;

      if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
        throw new Error("Multiple consecutive polling failures detected");
      }

      delay = Math.min(delay * 2, 15000);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Transcription timeout after maximum retries");
}

export async function POST(req) {
  try {
    // API key verification with more detailed error
    if (!process.env.ASSEMBLY_AI_API_KEY) {
      throw new Error(
        "AssemblyAI API key not configured in environment variables"
      );
    }

    // Parse form data with better error handling
    let formData;
    try {
      formData = await req.formData();
    } catch (error) {
      throw new Error(`Failed to parse form data: ${error.message}`);
    }

    const audioFile = formData.get("file");
    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided in form data" },
        { status: 400 }
      );
    }

    // Enhanced file size checking
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    if (audioFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File size exceeds limit",
          details: {
            providedSize: audioFile.size,
            maxSize: MAX_FILE_SIZE,
            sizeInMB: Math.round(audioFile.size / (1024 * 1024)),
          },
        },
        { status: 400 }
      );
    }

    // Buffer conversion with error handling
    let buffer;
    try {
      const arrayBuffer = await audioFile.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } catch (error) {
      throw new Error(`Failed to process audio file: ${error.message}`);
    }

    // Upload with progress tracking
    console.log("Starting audio upload...");
    const uploadUrl = await uploadAudio(buffer);
    console.log("Upload completed successfully");

    // Request transcription with error handling
    let transcriptResponse;
    try {
      transcriptResponse = await assemblyAI.post("/transcript", {
        audio_url: uploadUrl,
        language_detection: true, // Optional: enable language detection
      });
    } catch (error) {
      throw new Error(`Transcription request failed: ${error.message}`);
    }

    // Poll for results with progress logging
    console.log("Starting transcription polling...");
    const transcription = await pollTranscription(transcriptResponse.data.id);
    console.log("Transcription completed successfully");

    return NextResponse.json(
      { transcription },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("API Error:", error);

    // Enhanced error response
    return NextResponse.json(
      {
        error: error.message || "Internal server error",
        details: {
          timestamp: new Date().toISOString(),
          type: error.name,
          details: error.response?.data || {},
          stack:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
      },
      {
        status: error.response?.status || 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
