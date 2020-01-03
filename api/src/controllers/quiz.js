import Quiz from '../models/quiz';


const quizControllers = {
    createQuiz(req, res) {
        const newQuiz = new Quiz(req.body);
        newQuiz.save((err, result) => {
            if(err || !result) {
                console.log(err);
                return res.status(500).json({error :'Quiz not saved'});
            }
            return res.status(200).json({success : 'quiz created successfully', quizId : result.id});
        });
    }, 
    submitQuiz(req, res) {
        const userAnswers = req.body.answers;
        const takenBy = req.body.takenBy;
        const quizId = req.params.quizId;
        Quiz.findOne({id : quizId}, (err, result) => {
            if (err) return res.status(404).json({
                msg : "Quiz not found"
            });
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
                if(err || !saved) res.status(500).json({msg : 'Unable to submit, try again'})
                res.json({result : newQuizTaker, maxScore : realAnswers.length})
            });
        })
    },
    getAllQuiz(req, res) {
        Quiz.find()
        .populate('creator', '_id name email')
        .select('-answers -questions -id -takenBy')
        .then(quizzes => {
            res.json({ quizzes });
        })
        .catch(err => console.log(err))
    },
    getSingleQuizIntro(req, res) {
        Quiz.findOne({id : req.params.quizId})
        .populate('creator', '_id name email')
        .select('name created creator duration expires')
        .exec((err, quizDetails) => {
            if (err || !quizDetails) return res.status(404).json({
                error : 'Quiz not found'
            })
            return res.json({quizDetails});
        });
    },
    getQuizLeaderBoard (req, res) {
        Quiz.findOne({id : req.params.quizId })
        .populate('creator', '_id name email')
        .select('name takenBy created creator')
        .exec((err, quiz) => {
            if (err || !quiz) return res.status(404).json({
                error : 'Quiz not found'
            })
            return res.json(quiz);
        });
    },
    getSingleQuizQuestions(req,res) {
        Quiz.findOne({id : req.params.quizId}, (err, quiz) => {
            if (err || !quiz) return res.status(404).json({
                error : 'Quiz not found'
            })
            return res.json(quiz);
        })
        .select('questions');
    },
    deleteQuiz(req, res) {
        Quiz.findOneAndDelete({id : req.params.quizId}, (err, result) => {
            if (err || !result) return res.json({
                msg : "Quiz can't be deleted"
            });
            return res.json({
                msg : "Quiz deleted"
            })
        });
    }
}


export default quizControllers;