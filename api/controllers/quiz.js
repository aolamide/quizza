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
    submitQuiz(req, res) {
        const userAnswers = req.body.answers;
        const takenBy = req.body.takenBy;
        const quizId = req.params.quizId;
        Quiz.findById(quizId, (err, result) => {
            if (err) return res.status(400).json({
                msg : "QUiz not found"
            });
            console.log(result.takenBy)
            let realAnswers = result.answers;
            let correct = 0;
            for(let i = 0; i < realAnswers.length; i++){
                if(userAnswers[i] === realAnswers[i]) correct++;
            }
            let taken = result.takenBy;
            let newQuizTaker = {
               name : takenBy, 
               score : correct
            }
            taken.push(newQuizTaker);
            result.save((err, saved) => {
                if(err) res.status(500).json({msg : 'Unable to submit, try again'})
                res.json({result : newQuizTaker, maxScore : realAnswers.length})
            });
        })
    },
    getAllQuiz(req, res) {
       
        Quiz.find()
        .then(quizzes => {
            res.json({ quizzes });
        })
        .catch(err => console.log(err))
    },
    getSingleQuizIntro(req, res) {
        Quiz.findById(req.params.quizId, (err, quizDetails) => {
            if (err) return res.status(400).json({
                msg : 'Quiz not found'
            })
            return res.json({quizDetails});
        })
        .select('name created creator duration expires');
    },
    getQuizLeaderBoard (req, res) {
        Quiz.findById(req.params.quizId, (err, quiz) => {
            if (err) return res.status(400).json({
                msg : 'Quiz not found'
            })
            return res.json(quiz);
        })
        .select('name takenBy created creator');
    },
    getSingleQuizQuestions(req,res) {
        Quiz.findById(req.params.quizId, (err, quiz) => {
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