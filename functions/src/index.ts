import * as functions from "firebase-functions";
import { defineSecret } from "firebase-functions/params";
import fetch from "node-fetch";

const geminiApiKey = defineSecret("GEMINI_API_KEY");

// Helper to make API calls with strategy fallback
async function callGeminiAPI(prompt: string, apiKey: string) {
  // List of models and versions to try (Verified available models)
  const strategies = [
    { model: "gemini-2.0-flash", version: "v1beta" }, // Primary: Fast & Stable
    { model: "gemini-2.0-pro-exp", version: "v1beta" }, // Premium: High Intelligence
    { model: "gemini-2.0-flash-exp", version: "v1beta" }, // Backup: Experimental
    { model: "gemini-flash-latest", version: "v1beta" }, // Fallback: Generic
  ];

  const safetySettings = [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_ONLY_HIGH",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_ONLY_HIGH",
    },
  ];

  let lastError: any = null;

  for (const strategy of strategies) {
    try {
      console.log(`Attempting: ${strategy.model} (${strategy.version})`);
      const url = `https://generativelanguage.googleapis.com/${strategy.version}/models/${strategy.model}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          safetySettings: safetySettings,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`${strategy.model} failed:`, errorData);
        throw new Error(
          errorData.error?.message || `API Error: ${response.status}`
        );
      }

      const data = await response.json();

      // Check for safety blocks
      if (data.promptFeedback && data.promptFeedback.blockReason) {
        throw new Error(
          `Blocked by safety filter: ${data.promptFeedback.blockReason}`
        );
      }

      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content
      ) {
        if (data.candidates?.[0]?.finishReason) {
          throw new Error(
            `Generation stopped: ${data.candidates[0].finishReason}`
          );
        }
        throw new Error("Invalid response format from AI");
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error: any) {
      console.warn(`Failed strategy ${strategy.model}:`, error.message);
      lastError = error;
      // Continue to next strategy
    }
  }

  throw new Error(lastError?.message || "Failed to generate content.");
}

export const generateContent = functions
  .runWith({ secrets: [geminiApiKey] })
  .https.onCall(async (data, context) => {
    const { topic, platform, tone } = data;

    if (!topic || !platform || !tone) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing required fields"
      );
    }

    const prompt = `
    You are an expert content creator. Write a ${platform} about "${topic}".
    
    Tone: ${tone}
    
    Requirements:
    - If it's a Twitter Thread, separate tweets with "---".
    - If it's a LinkedIn Post, use professional formatting and hashtags.
    - If it's a Blog Post, include a catchy title and clear headings.
    - If it's an Email, include a subject line.
    - If it's an Instagram Caption, include engaging emojis, 20-30 relevant hashtags, and a short script idea for a Reel/Story if applicable.
    - If it's a TikTok Script, provide a scene-by-scene breakdown with visual cues and dialogue.
    - If it's a YouTube Video Script, include a hook, intro, body paragraphs with visual cues, and a strong call-to-action (CTA).
    
    Make it engaging, high-quality, and ready to post.
  `;

    try {
      const result = await callGeminiAPI(prompt, geminiApiKey.value());
      return { text: result };
    } catch (error: any) {
      throw new functions.https.HttpsError("internal", error.message);
    }
  });

export const refineContent = functions
  .runWith({ secrets: [geminiApiKey] })
  .https.onCall(async (data, context) => {
    const { content, instruction } = data;

    if (!content || !instruction) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing content or instruction"
      );
    }

    const prompt = `
    You are an expert editor. Rewrite the following text based on this instruction: "${instruction}".
    
    ORIGINAL TEXT:
    "${content}"
    
    output ONLY the rewritten text. Do not include any explanations or quotes.
  `;

    try {
      const result = await callGeminiAPI(prompt, geminiApiKey.value());
      return { text: result };
    } catch (error: any) {
      throw new functions.https.HttpsError("internal", error.message);
    }
  });
