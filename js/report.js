const PDFDocument = require('pdfkit');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Create a function to generate and send the PDF report
const generateAndSendPDF = async (emailAddress, pdfData) => {
  try {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF output to a writable stream
    const pdfStream = doc.pipe(fs.createWriteStream('output.pdf'));

    // Embed a font, set the font size, and render some text
    doc
      .font('path/to/your/font.ttf') // Update with the correct font path
      .fontSize(25)
      .text('Real Estate Cash Flow Report', 100, 100);

    // Add the data from pdfData to the PDF
    doc.text(`Monthly Income: $${pdfData.monthlyIncome}`, 100, 150);
    // Add other data fields as needed

    // Finalize the PDF
    doc.end();

    // Wait for the PDF to be finished writing
    await new Promise((resolve) => pdfStream.on('finish', resolve));

    // Create a transport object for sending email
    const transporter = nodemailer.createTransport({
      // Configure your email server details here
      service: 'your-email-service-provider', // e.g., 'Gmail', 'Outlook'
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });

    // Define the email content
    const mailOptions = {
      from: 'pratiknpatil2001@gmail.com',
      to: emailAddress,
      subject: 'Real Estate Cash Flow Report',
      text: 'Please find the attached report.',
      attachments: [
        {
          filename: 'RealEstateCashFlowReport.pdf',
          path: 'output.pdf',
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Delete the generated PDF file
    fs.unlinkSync('output.pdf');

    console.log(`Report sent to ${emailAddress}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Example usage:
const emailAddress = 'recipient@example.com'; // Replace with the user's email address
const pdfData = {
  monthlyIncome: 10000, // Replace with the actual data
  // Add other data fields as needed
};

generateAndSendPDF(emailAddress, pdfData);
