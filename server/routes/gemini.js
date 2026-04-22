const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Invalid ingredients list" });
    }

    const ingredientsList = ingredients.join(', ');
    const prompt = `You are a cooking assistant. Given these available ingredients: ${ingredientsList}.
Suggest exactly 3 recipes the user can make using mostly these ingredients.
Respond ONLY with a valid JSON array. No explanation. No markdown. No code blocks. Format:
[{"name":"...","ingredients":["..."],"steps":["...","...","...","...","..."]}]
Each recipe must have exactly 5 steps. Keep steps short (1 sentence each).`;

    const apiKey = process.env.GEMINI_API_KEY;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    let textResponse = response.data.candidates[0].content.parts[0].text;
    
    // Strip markdown code fences if present using regex
    textResponse = textResponse.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    let parsedResult;
    try {
      parsedResult = JSON.parse(textResponse);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", textResponse);
      return res.status(500).json({ error: "Couldn't parse suggestions, try again" });
    }
    
    res.json({ recipes: parsedResult });

  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Gemini unavailable", fallback: true });
  }
});

module.exports = router;
