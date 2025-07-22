const GEMINI_API_KEY = "AIzaSyAWA0uzJeoDpepfL9OdhU7pIdpqZvBG208";
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent";

async function generateWithGemini(base64Image) {
  const body = {
    contents: [{
      parts: [{
        inline_data: {
          mime_type: "image/png",
          data: base64Image.split(",")[1]
        }
      }]
    }]
  };

  const res = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  const base64Output = data?.candidates?.[0]?.content?.parts?.[0]?.data;
  if (!base64Output) throw new Error("Gemini did not return a result.");
  return `data:image/png;base64,${base64Output}`;
}
