import Express from 'express';
import Nodemailer from 'nodemailer';
import Cors from 'cors';
const app = Express();
const router = Express.Router();

const port = 5000;

app.use(Cors());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

router.post('/sendEmail', (req, res) => {
  const { emailEmail, emailName, emailSubject, emailMessage } = req.body;

  const subjectCombined = emailName + ' - ' + emailSubject;

  const transporter = Nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_PS
    }
  })

  const mailOptions = {
    from: emailEmail,
    to: process.env.MY_EMAIL,
    subject: subjectCombined,
    text: emailMessage
  }
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully');
    }
  });
});