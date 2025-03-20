const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Middlewares
dotenv.config();
const app = express();
app.use(cors());

// API

app.get("/api", (req, res) => {
  res.send("Hello World");
});

// Server
const PORT = process.env.PORT || 5000; // Default port is 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
