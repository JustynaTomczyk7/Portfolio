require("dotenv").config();
const nodemailer = require("nodemailer");
const express = require("express");
const path = require("path");

const NodeMailerTransporter = initNodeMailer();
const port = 7000;

const app = express();
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port);

console.log("Server started at http://localhost:" + port);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/mail", async function (req, res) {
  let mailDetails = {
    from: `${req.body.name} ${req.body.email} <tomczykjustyna99@gmail.com>`,
    to: "tomczykjustyna99@gmail.com",
    subject: `EMAIL Z PORTFOLIO - ${req.body.email} - ${req.body.name}`,
    text: `
      nadawca: ${req.body.name}
      email: ${req.body.email}
      treść: ${req.body.message}
    `,
  };

  const result = await sendMail(mailDetails);

  if (result) {
    res.writeHead(200);
    res.end(`{"message": "Email sent successfully"}`);
  } else {
    res.writeHead(500);
    res.end(`{"message": "Email error"}`);
  }
});

function initNodeMailer() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "tomczykjustyna99@gmail.com",
      pass: process.env.MAIL_PASSWORD,
    },
  });
}

function sendMail(mailDetails) {
  return new Promise((resolve, reject) => {
    NodeMailerTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        reject(false);
      }

      resolve(true);
    });
  });
}
