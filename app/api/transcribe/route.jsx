import { NextResponse } from "next/server";
import axios from "axios";

// Configure API settings
export const config = {
  api: {
    bodyParser: false,
    maxDuration: 300, // 5 minutes timeout
    responseLimit: "50mb",
  },
};

// Create an axios instance with default config
const assemblyAI = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: process.env.ASSEMBLY_AI_API_KEY,
    "content-type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

// Helper function to handle file upload
async function uploadAudio(buffer) {
  try {
    const response = await assemblyAI.post("/upload", buffer, {
      headers: {
        "content-type": "application/octet-stream",
      },
    });
    return response.data.upload_url;
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    throw new Error("Failed to upload audio file");
  }
}

// Helper function to poll for transcription results
async function pollTranscription(transcriptId, maxRetries = 30) {
  let delay = 1000;

  for (let retries = 0; retries < maxRetries; retries++) {
    try {
      const response = await assemblyAI.get(`/transcript/${transcriptId}`);
      const transcript = response.data;

      if (transcript.status === "completed") {
        return transcript.text;
      }

      if (transcript.status === "error") {
        throw new Error(`Transcription failed: ${transcript.error}`);
      }

      // Exponential backoff with max delay of 10 seconds
      delay = Math.min(delay * 1.5, 10000);
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      console.error("Polling error:", error.response?.data || error.message);
      delay = Math.min(delay * 2, 10000);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("Transcription timeout after maximum retries");
}

export async function POST(req) {
  try {
    // Verify API key
    if (!process.env.ASSEMBLY_AI_API_KEY) {
      return NextResponse.json(
        { error: "AssemblyAI API key not configured" },
        { status: 500 }
      );
    }

    // Parse form data
    const formData = await req.formData();
    const audioFile = formData.get("file");

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Check file size (25MB limit)
    const MAX_FILE_SIZE = 25 * 1024 * 1024;
    if (audioFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 25MB limit" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload audio file
    const uploadUrl = await uploadAudio(buffer);

    // Request transcription
    const transcriptResponse = await assemblyAI.post("/transcript", {
      audio_url: uploadUrl,
    });

    // Poll for results
    const transcription = await pollTranscription(transcriptResponse.data.id);

    // Return successful response
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

    return NextResponse.json(
      {
        error: error.message || "Internal server error",
        details: error.response?.data || {},
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
