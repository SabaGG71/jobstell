export async function POST(req) {
  try {
    const { prompt, conversationHistory, shouldGreet } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "No prompt provided" }), {
        status: 400,
      });
    }

    const response = await fetch(
      "https://jobstellchatbot-485935052734.europe-west1.run.app/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.JOBSTELL_CHATBOT_API_KEY, // Must be set correctly on your server
        },
        body: JSON.stringify({
          prompt, // Ensure this is not undefined
          conversationHistory,
          shouldGreet,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from external API:", errorData);
      throw new Error(
        `Failed to fetch from external API: ${
          errorData.details || response.statusText
        }`
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
