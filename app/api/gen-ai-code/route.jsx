import { GenAiCode } from "@/components/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        console.log("🟢 Received API request");

        // Read request body safely
        const rawBody = await req.text();
        console.log("📩 Raw Request Body:", rawBody);

        let prompt;
        try {
            ({ prompt } = JSON.parse(rawBody)); // Parse JSON safely
        } catch (jsonError) {
            console.error("❌ JSON Parsing Error:", jsonError);
            return NextResponse.json({ error: "Invalid JSON request" }, { status: 400 });
        }

        console.log("🔹 Extracted prompt:", prompt);

        // Call AI model
        console.log("🚀 Sending request to GenAiCode...");
        const result = await GenAiCode.sendMessage(prompt);
        console.log("🟢 AI Model Response Received:", result);

        if (!result || !result.response) {
            console.error("❌ AI Model returned invalid response:", result);
            throw new Error("AI Model response is undefined or empty");
        }

        // Await response text
        let resp = await result.response.text();
        console.log("📩 Raw AI Response:", resp);

        // ✅ FIX: Remove unnecessary ```json wrapping
        resp = resp.replace(/^```json\s*|\s*```$/g, "").trim();
        console.log("🔄 Cleaned AI Response:", resp);

        // ✅ FIX: Ensure JSON format
        try {
            const jsonResponse = JSON.parse(resp);
            return NextResponse.json(jsonResponse);
        } catch (jsonError) {
            console.error("❌ Failed to parse AI response:", resp);
            throw new Error("AI Model response is not valid JSON");
        }

    } catch (e) {
        console.error("❌ Server Error:", e);
        return NextResponse.json({ error: e.message || "Unknown error occurred" }, { status: 500 });
    }
}

// ✅ API CONFIGURATION (Add this at the bottom)
export const config = {
  api: {
    responseLimit: "8mb", // Allow large AI responses
    bodyParser: true, // Parse request body
    externalResolver: true, // Prevent Next.js from timing out
  },
};
