require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.static("public"));

//template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Routes
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));

app.listen(PORT, console.log(`Server started on port ${PORT}`));
