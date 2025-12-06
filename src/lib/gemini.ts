const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateContent = async (
  topic: string,
  platform: string,
  tone: string
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is missing");
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

  // List of models and versions to try (based on available models for this key)
  const strategies = [
    { model: "gemini-2.0-flash", version: "v1beta" },
    { model: "gemini-flash-latest", version: "v1beta" },
    { model: "gemini-pro-latest", version: "v1beta" },
  ];

  let lastError: any = null;

  for (const strategy of strategies) {
    try {
      console.log(`Attempting: ${strategy.model} (${strategy.version})`);
      const url = `https://generativelanguage.googleapis.com/${strategy.version}/models/${strategy.model}:generateContent?key=${API_KEY}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(
          `${strategy.model} (${strategy.version}) failed:`,
          errorData
        );
        throw new Error(
          errorData.error?.message ||
            `API Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content
      ) {
        throw new Error("Invalid response format from AI");
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error: any) {
      console.warn(
        `Failed strategy ${strategy.model} (${strategy.version}):`,
        error.message
      );
      lastError = error;
      // Continue to next strategy
    }
  }

  console.error("All strategies failed. Last error:", lastError);
  throw new Error(
    lastError?.message ||
      "Failed to generate content. Please check your API key."
  );
};

export const refineContent = async (
  content: string,
  instruction: string
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is missing");
  }

  const prompt = `
    You are an expert editor. Rewrite the following text based on this instruction: "${instruction}".
    
    ORIGINAL TEXT:
    "${content}"
    
    output ONLY the rewritten text. Do not include any explanations or quotes.
  `;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refine content");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.warn("Refinement failed, trying backup model...");
    // Simple fallback to pro model if flash fails
    try {
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
      const response = await fetch(fallbackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (e) {
      throw new Error("Failed to refine content. Please try again.");
    }
  }
};
