import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config()

sgMail.setApiKey(process.env.SG_KEY);

const sendQuizMail = (quizId, quizName, userEmail, userName, questions, answers) => {
    let QA = questions.map((question, i) => {
        let display = `<div><strong>Question ${i + 1} </strong></div><br><div><em>${question.title}</em></div><div><strong>A.</strong> ${question.options[0]}</div><div><strong>B.</strong> ${question.options[1]}</div><div><strong>C.</strong> ${question.options[2]}</div><div><strong>D.</strong> ${question.options[3]}</div><br><div>Correct Answer : <strong>${answers[i]}<strong></div><br><br>`;
        return display;
    });
    QA = QA.join('');
    const mailOptions = {
        from: `Quizza <quiz@quizza.live>`,
        to: userEmail,
        subject: 'Quizza quiz creation',
        text : `Hi, ${userName}, Your quiz ${quizName} has been created succesfully. The link to take the quiz is shown below \n\nhttps://quizza.live/${quizId}`,
        html : `<p>Hi, ${userName}<br>Your quiz <strong>${quizName}</strong> has been created succesfully. The link to take the quiz is shown below </p><p><a href='https://quizza.live/${quizId}'>https://quizza.live/${quizId}<a/></p><p> Leaderboard is at : <a href='https://quizza.live/${quizId}/leaderboard'>https://quizza.live/${quizId}/leaderboard<a/></p><p>Share to friends and let everyone have fun answering your questions.</p><p><strong>Below is a summary of your questions and answers :</strong></p> ${QA}`
    };
    return sgMail.send(mailOptions);
}

export default sendQuizMail;