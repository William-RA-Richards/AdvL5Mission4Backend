const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getResponse } = require("./chatBotPrompt");

// Middlewares
dotenv.config();
const app = express();
app.use(cors());
app.use(cors({ origin: "*" }));
app.use(express.json());

let history = [
  {
    role: "Model",
    parts: [
      "I'm Tina. I help you to choose the right insurance policy. May I ask you a few personal questions to make sure I recommend the best policy for you?",
    ],
  },
];

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "You are Tina a insurance policy assistant for the company Turner's Car Insurance. You are helping a customer figure out the best policies for them. There are 3 types of policies: Mechanical Breakdown Insurance (MBI), Comprehensive Car Insurance, and Third Party Car Insurance. There are 2 business rules: MBI is not available to trucks and racing cars. Comprehensive Car Insurance is only available to any motor vehicles less than 10 years old. When you give your suggestion, suggest all insurance policies that they meet and let the customer decide which one or multiple policies they want.",
});

// API

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.post("/api/reset", (req, res) => {
  const { chatHistory } = req.body;
  history = chatHistory;

  res.status(200).send({ response: "ok" });
});

app.post("/api/chatbot", async (req, res) => {
  const { userInput } = req.body;
  const response = await getResponse(model, history, userInput);
  console.log(response);

  console.log(
    history.map((chat) => {
      return `${chat.role}: ${chat.parts[0]}.`;
    })
  );
  res.status(200).send({ response: response });
});

// Server
const PORT = process.env.PORT || 4000; // Default port is 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
