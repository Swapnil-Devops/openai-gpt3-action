const fs = require("fs");
const axios = require("axios");

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.API_KEY;
const prompt = process.env.PROMPT;

const generate = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const generatedResponse = response.data.choices[0].text.trim();

    // Create the response in HTML format
    const responseHTML = `<p>${generatedResponse}</p>`;

    // Save the HTML response to a file in the "output" directory
    fs.writeFileSync("output/generated-response.html", responseHTML);

    // Create the response in Markdown format
    const responseMarkdown = `Generated Response:\n\n${generatedResponse}`;

    // Save the Markdown response to a file in the "output" directory
    fs.writeFileSync("output/generated-response.md", responseMarkdown);
  } catch (error) {
    console.error("Error:", error);
  }
};

generate();
