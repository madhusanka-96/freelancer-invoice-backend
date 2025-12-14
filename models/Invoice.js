const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  freelancer: String,
  client: String,
  platform: String,
  service: String,
  amount: Number,
  currency: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
