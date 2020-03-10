// import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config()

sgMail.setApiKey(process.env.SG_KEY);

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: 465,
//   secure: true,
//   auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS
//   },
//   tls:{
//     rejectUnauthorized: false
//   }
// });


const sendMail = (userEmail, token) => {
    const mailOptions = {
        from: `Quizza <reset@quizza.live>`,
        to: userEmail,
        subject: 'Quizza Password Reset',
        text : 'You are receiving this mail because you(or someone else) have requested to reset your password on Quizza \n\nPlease click the link below to reset your password \n\n' + `https://quizza.live/reset/${token}` + '\n\nIf you did not request this, please ignore and your password would remain unchanged.\n\n\n',
        html : `<p>You are receiving this mail because you(or someone else) have requested to reset your password on Quizza</p><br><p>Please click the link below to reset your password</p><br><a href='https://quizza.live/reset/${token}'><button>RESET PASSWORD</button></a><br><p>If you did not request this, please ignore and your password would remain unchanged.</p>`
    };
    return sgMail.send(mailOptions);
}

export default sendMail;