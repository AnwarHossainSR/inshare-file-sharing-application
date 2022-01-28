require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = () => {
  // Database connection 🥳
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const connection = mongoose.connection;
  connection.once("open", (err) => {
    if (err) {
      console.log("Connection failed ☹️☹️☹️☹️");
    } else {
      console.log("Database connected 🥳🥳🥳🥳");
    }
  });
};

// mongodb+srv://inShare:uCg4Ai3D3ek4p6Wr@cluster0.tqnvn.mongodb.net/inshare?retryWrites=true&w=majority

module.exports = connectDB;
