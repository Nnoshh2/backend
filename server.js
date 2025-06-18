const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 5000; // Port du serveur

require('dotenv').config(); 

// Middleware
app.use(cors());
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// Configuration de Nodemailer
// const transporter = nodemailer.createTransport({
//     host: 'smtp-relay.brevo.com', // Serveur SMTP d'Outlook
//     port: 587,                 // Port SMTP sécurisé pour STARTTLS
//     secure: false,             // Utilisez false pour STARTTLS
//     auth: {
//       user: '805d9a001@smtp-brevo.com', // Votre adresse e-mail Outlook
//       pass: 'cK5CEw1U43fL7rXW'       // Votre mot de passe Outlook ou mot de passe d'application
//     }
//   });

// Route pour envoyer des e-mails
app.post('/send-email', (req, res) => {
  console.log("hello from /send-email")
  const { to, subject, html } = req.body;
  console.log("email to: ", to);

  const mailOptions = {
    from: 'yousfi.wacime@gmail.com',
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log("ENTER BACKEND")
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
      res.status(500).send('Erreur lors de l\'envoi de l\'email.');
    } else {
      console.log('Email envoyé :', info.response);
      res.status(200).send('Email envoyé avec succès.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
