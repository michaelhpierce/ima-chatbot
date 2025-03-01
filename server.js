const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Define the "/chat" route (this is the missing piece!)
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
            max_tokens: 50
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API Error:", error);
   
