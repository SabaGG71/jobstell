import axios from "axios";

// Set maximum payload size
export const config = {
  api: {
    bodyParser: false,
    maxDuration: 300, // 5 minutes timeout
  },
};

export async function POST(req) {
  try {
    // Verify API key exists
    if (!process.env.ASSEMBLY_AI_API_KEY) {
      throw new Error("ASSEMBLY_AI_API_KEY is not configured");
    }

    const formData = await req.formData();
    const audioFile = formData.get("file");

    if (!audioFile) {
      return new Response(JSON.stringify({ error: "No audio file provided" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Add CORS headers
        },
      });
    }

    // Add file size check
    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
    if (audioFile.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({ error: "File size exceeds 25MB limit" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload with timeout
    const uploadResponse = await axios.post(
      "https://api.assemblyai.com/v2/upload",
      buffer,
      {
        headers: {
          authorization: process.env.ASSEMBLY_AI_API_KEY,
          "content-type": "application/octet-stream",
        },
        timeout: 30000, // 30 second timeout
      }
    );

    // Request transcription with timeout
    const transcriptResponse = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      {
        audio_url: uploadResponse.data.upload_url,
      },
      {
        headers: {
          authorization: process.env.ASSEMBLY_AI_API_KEY,
          "content-type": "application/json",
        },
        timeout: 30000,
      }
    );

    // Poll with exponential backoff
    let transcript;
    let retries = 0;
    const maxRetries = 30;
    let delay = 1000; // Start with 1 second delay

    while (!transcript || transcript.status === "processing") {
      if (retries >= maxRetries) {
        throw new Error("Transcription timeout");
      }

      try {
        const pollResponse = await axios.get(
          `https://api.assemblyai.com/v2/transcript/${transcriptResponse.data.id}`,
          {
            headers: { authorization: process.env.ASSEMBLY_AI_API_KEY },
            timeout: 10000,
          }
        );

        transcript = pollResponse.data;

        if (transcript.status === "completed") {
          return new Response(
            JSON.stringify({ transcription: transcript.text }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-store",
              },
            }
          );
        }

        if (transcript.status === "error") {
          throw new Error(`Transcription failed: ${transcript.error}`);
        }

        retries++;
        delay = Math.min(delay * 1.5, 10000); // Exponential backoff, max 10 seconds
        await new Promise((resolve) => setTimeout(resolve, delay));
      } catch (pollError) {
        console.error("Polling error:", pollError);
        retries++;
        delay = Math.min(delay * 2, 10000); // Double delay on error
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error",
        details: error.response?.data || {},
      }),
      {
        status: error.response?.status || 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
