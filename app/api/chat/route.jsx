export async function POST(req) {
  try {
    const { prompt, conversationHistory, shouldGreet } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "No prompt provided" }), {
        status: 400,
      });
    }

    const response = await fetch("https://jobstell-chatbot.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        conversationHistory,
        shouldGreet, // Pass the shouldGreet flag to the backend
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from external API");
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
