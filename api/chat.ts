export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { philosopher, messages } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Falta GEMINI_API_KEY" });
  }

  try {
    const geminiMessages = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: `You are ${philosopher}, speaking with the tone, vocabulary, and reasoning typical of their philosophy.`,
              },
            ],
          },
          contents: geminiMessages,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini error:", errText);
      return res.status(500).json({ error: "Gemini API error" });
    }

    const data = await response.json();
    const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "…";

    return res.status(200).json({ choices: [{ message: { content: aiMessage } }] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to reach Gemini" });
  }
}