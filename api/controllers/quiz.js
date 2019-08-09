import { quizzes } from '../dummyData';
import Quiz from '../models/quiz';
import dotenv from 'dotenv';
dotenv.config();

const quizControllers = {
    createQuiz(req, res) {
        console.log(req.headers);
        if(req.headers.origin !== process.env.APP_ORIGIN){
            return res.status(400).json("Not allowed");
        }
        const newQuiz = new Quiz(req.body);
        newQuiz.save((err, result) => {
            if(err) return res.json('Not saved to database');
            return res.json("quiz created successfully");
        });
    }, 
    async submitQuiz(req, res) {
        const userAnswers = req.body.answers;
        const quizId = req.params.quizId;
        await Quiz.findById(quizId, (err, result) => {
            if (err) return res.status(400).json({
                msg : "QUiz not found"
            });
            let realAnswers = result.answers;
            let correct = 0;
            for(let i = 0; i < realAnswers.length; i++){
                if(userAnswers[i] === realAnswers[i]) correct++;
            }
            res.json({
                scoreObtained : correct,
                maxObtainable : realAnswers.length
            })
        })
    },
    getAllQuiz(req, res) {
       
        Quiz.find()
        .then(quizzes => {
            res.json({ quizzes });
        })
        .catch(err => console.log(err))
    },
    async getSingleQuizIntro(req, res) {
        await Quiz.findById(req.params.quizId, (err, quizDetails) => {
            if (err) return res.status(400).json({
                msg : 'Quiz not found'
            })
            return res.json({quizDetails});
        })
        .select('name created creator duration expires');
    },
    async getSingleQuizQuestions(req,res) {
        await Quiz.findById(req.params.quizId, (err, quiz) => {
            if (err) return res.status(400).json({
                msg : 'Quiz not found'
            })
            return res.json({quiz});
        })
    },
    deleteQuiz(req, res) {
        Quiz.findByIdAndDelete(req.params.quizId, (err, result) => {
            if (err) return res.json({
                msg : "Quiz can't be deleted"
            });
            return res.json({
                msg : "Quiz deleted"
            })
        });
    }
}


export default quizControllers;