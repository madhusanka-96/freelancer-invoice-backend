const express = require("express");
const Invoice = require("../models/Invoice");
const auth = require("../middleware/authMiddleware");
const generatePDF = require("../utils/pdfGenerator");

const router = express.Router();

// CREATE INVOICE
router.post("/generate", auth, async (req, res) => {
  const invoiceNumber = "INV-" + Date.now();

  const invoice = await Invoice.create({
    user: req.userId,
    ...req.body,
    invoiceNumber
  });

  const pdfBuffer = await generatePDF(invoice);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=${invoiceNumber}.pdf`
  });

  res.send(pdfBuffer);
});

// HISTORY
router.get("/history", auth, async (req, res) => {
  const invoices = await Invoice.find({ user: req.userId });
  res.json(invoices);
});

module.exports = router;
