require("dotenv").config();
console.log("Server file started"); // 👈 IMPORTANT test log

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const invoiceRoute = require("./routes/invoice");
const authRoute = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/invoice", invoiceRoute);
app.use("/api/auth", authRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
