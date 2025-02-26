import { GenAiCode } from "@/components/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        console.log("🟢 Received API request");

        // Ensure request body is valid JSON
        const rawBody = await req.text();
        console.log("📩 Raw Request Body:", rawBody);

        let prompt;
        try {
            ({ prompt } = JSON.parse(rawBody)); // Safely parse JSON
        } catch (jsonError) {
            console.error("❌ JSON Parsing Error:", jsonError);
            return NextResponse.json({ error: "Invalid JSON request" }, { status: 400 });
        }

        console.log("🔹 Extracted prompt:", prompt);

        // Send request to AI model
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

        // 🛠 FIX: Strip unwanted ```json formatting if present
        resp = resp.trim();
        if (resp.startsWith("```json")) {
            resp = resp.replace(/```json/, "").trim(); // Remove leading ```json
        }
        if (resp.endsWith("```")) {
            resp = resp.replace(/```$/, "").trim(); // Remove trailing ```
        }

        console.log("🔄 Cleaned AI Response:", resp);

        // Attempt to parse JSON response
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
