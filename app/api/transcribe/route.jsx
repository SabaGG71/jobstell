import axios from "axios";

const ASSEMBLY_API_KEY = "2e5ad5ef4c9f4756a41ecea1d7c81dc9";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("file");

    if (!audioFile) {
      return new Response(JSON.stringify({ error: "No audio file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the audio file
    const uploadResponse = await axios.post(
      "https://api.assemblyai.com/v2/upload",
      buffer,
      {
        headers: {
          authorization: ASSEMBLY_API_KEY,
          "content-type": "application/octet-stream",
        },
      }
    );

    // Request transcription
    const transcriptResponse = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      {
        audio_url: uploadResponse.data.upload_url,
      },
      {
        headers: {
          authorization: ASSEMBLY_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    // Poll for transcription completion
    let transcript;
    let retries = 0;
    const maxRetries = 30; // Maximum number of polling attempts

    while (!transcript || transcript.status === "processing") {
      if (retries >= maxRetries) {
        throw new Error("Transcription timeout");
      }

      const pollResponse = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptResponse.data.id}`,
        {
          headers: { authorization: ASSEMBLY_API_KEY },
        }
      );

      transcript = pollResponse.data;

      if (transcript.status === "completed") {
        return new Response(
          JSON.stringify({ transcription: transcript.text }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (transcript.status === "error") {
        throw new Error("Transcription failed");
      }

      retries++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Internal server error",
        details: error.response?.data || {},
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
