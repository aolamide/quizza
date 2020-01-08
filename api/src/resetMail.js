import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
  },
  tls:{
    rejectUnauthorized: false
  }
});


const sendMail = (userEmail, token) => {
    const mailOptions = {
        from: `Quizza <me@aolamide.me>`,
        to: userEmail,
        subject: 'Quizza Password Reset',
        text : 'You are receiving this mail because you(or someone else) have requested to reset your password on Quizza \n\nPlease click the link below to reset your password \n\n' + `https://quizza.live/reset/${token}` + '\n\nIf you did not request this, please ignore and your password would remain unchanged.\n\n\n'
    };
    return transporter.sendMail(mailOptions)
}

export default sendMail;