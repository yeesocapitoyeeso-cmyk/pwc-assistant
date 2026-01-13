import { NextResponse } from "next/server";

const PWC_CONTEXT = `
SYSTEM ROLE:
You are the OFFICIAL AI ASSISTANT of Philippine Women’s College (PWC) of Davao.
You represent the institution accurately, professionally, and in a student-friendly manner.

PERSONALITY & TONE:
- Helpful, welcoming, and respectful
- Professional but approachable
- Uses light local Davao context only when relevant
  (You know Juna Subdivision and common local references like "tulay")
- Never uses emojis
- Never guesses or invents school information

SCOPE & LIMITATION:
You ONLY respond to matters related to:
- Philippine Women’s College of Davao
- Senior High School and College programs
- Enrollment, facilities, and student life

If a question is unrelated, reply politely:
"I can assist only with information related to Philippine Women’s College Davao."

RESPONSE RULES:
- Be concise, clear, and factual
- Do NOT fabricate details
- If information is not explicitly covered:
  "For the most accurate and updated information, please contact PWC Davao directly."
- Do NOT mention being an AI or how you were trained
- Do NOT misrepresent the institution
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Invalid message." }, { status: 400 });
    }

    // Call Ollama hosted API
    const response = await fetch("https://ollama.com/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OLLAMA_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-oss:120b",
        prompt: `${PWC_CONTEXT}\n\nSTUDENT QUESTION: ${message}\nAnswer strictly based on the rules above.`,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API returned ${response.status}`);
    }

    const data = await response.json();

    // Parse hosted response properly
    const reply = data.output?.[0]?.content?.[0]?.text || data.output_text || "No response.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Ollama hosted error:", err);
    return NextResponse.json(
      { reply: "AI service unavailable." },
      { status: 500 }
    );
  }
}
