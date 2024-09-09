const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
require('dotenv').config();

// Initialize Mailgun
const api_key = 'cec03bb9b498b8963903ad3076c5dd6d-826eddfb-f230bcf2';
const domain = 'sandbox48a15a1f13ac4d16986f38d889aa2c90.mailgun.org';
const mg = mailgun({ apiKey: api_key, domain: domain });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Handle form submission
app.post('/', (req, res) => {
    const email = req.body.email;

    const data = {
        from: 'parthjrnarang@gmail.com',
        to: email,
        subject: 'Welcome to Deakin!',
        text: 'Welcome to Deakin subscription',
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent:", body);
            res.send("Your email was sent successfully");
        }
    });
});

const port = process.env.PORT || 8050;
app.listen(port, () => {
    console.log(`Server is running at port ${port}!!!`);
});
