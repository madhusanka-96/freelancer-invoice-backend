const PDFDocument = require("pdfkit");

module.exports = (invoice) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50 });
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    doc.fontSize(20).text("ඉන්වොයිසිය", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Invoice No: ${invoice.invoiceNumber}`);
    doc.text(`Freelancer: ${invoice.freelancer}`);
    doc.text(`Client: ${invoice.client}`);
    doc.text(`Service: ${invoice.service}`);
    doc.text(`Amount: ${invoice.amount} ${invoice.currency}`);
    doc.text(`Date: ${new Date(invoice.date).toDateString()}`);

    doc.end();
  });
};
