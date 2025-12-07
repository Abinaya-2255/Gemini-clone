export async function runChat(prompt, maxRetries = 5) {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer AIzaSyAQwi9OU-P8EJX7D10Vi-Eo0pzS-BaYsrY`
  };

  const bodyBase = {
    model: "google/gemini-2.5-pro-preview",
    messages: [
      { role: "user", content: prompt }
    ],
    // you can add optional parameters like temperature, max_tokens etc.
    temperature: 0.7,
    max_tokens: 1000
  };

  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(bodyBase)
      });

      const data = await response.json();

      if (response.status === 429) {
        attempt++;
        const waitTime = 1000 * Math.pow(2, attempt); // 1s, 2s, 4s...
        console.warn(`Rate limited: retry in ${waitTime/1000}s (attempt ${attempt}/${maxRetries})`);
        await new Promise(res => setTimeout(res, waitTime));
        continue;
      }

      if (!data.choices || data.choices.length === 0) {
        throw new Error("Empty response: " + JSON.stringify(data));
      }

      return data.choices[0].message.content;

    } catch (err) {
      if (attempt >= maxRetries - 1) {
        throw err;
      }
      attempt++;
      const waitTime = 1000 * Math.pow(2, attempt);
      console.warn(`Error occurred: ${err.message}. Retrying in ${waitTime/1000}s`);
      await new Promise(res => setTimeout(res, waitTime));
    }
  }

  throw new Error("Max retries exceeded");
}

export default runChat;
