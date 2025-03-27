const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { getResponse } = require("./chatBotPrompt");

// Middlewares
dotenv.config();
const app = express();
app.use(cors());
app.use(cors({ origin: "*" }));
app.use(express.json());

let history = [];

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
  try {
    const { userInput } = req.body;
    const response = await getResponse(history, userInput);

    console.log(
      history.map((chat) => {
        return `${chat.role}: ${chat.parts[0].text}.`;
      })
    );
    res.status(200).send({ response: response });
  } catch (error) {
    console.log(error);
  }
});

// Server
const PORT = process.env.PORT || 4000; // Default port is 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
