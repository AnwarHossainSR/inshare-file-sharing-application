require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, console.log(`Server started on port ${PORT}`));
