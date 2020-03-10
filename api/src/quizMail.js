import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config()

sgMail.setApiKey(process.env.SG_KEY);

const sendQuizMail = (quizId, quizName, userEmail, userName) => {
    const mailOptions = {
        from: `Quizza <quiz@quizza.live>`,
        to: userEmail,
        subject: 'Quizza quiz creation',
        text : `Hi, ${userName}, Your quiz ${quizName} has been created succesfully. The link to take the quiz is shown below \n\nhttps://quizza.live/${quizId}`,
        html : `<p>Hi, ${userName}<br>Your quiz <strong>${quizName}</strong> has been created succesfully. The link to take the quiz is shown below </p><p><a href='https://quizza.live/${quizId}'>https://quizza.live/${quizId}<a/></p><p>Share to friends and let everyone have fun answering your questions.</p>`
    };
    return sgMail.send(mailOptions);
}

export default sendQuizMail;