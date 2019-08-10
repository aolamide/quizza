import { Router } from 'express';
import quizControllers from '../controllers/quiz';
const router = Router();
const { createQuiz, submitQuiz, getAllQuiz, deleteQuiz, getSingleQuizIntro, getSingleQuizQuestions, getQuizLeaderBoard }  = quizControllers;

router.post('/newquiz', createQuiz);

router.post('/submit/:quizId', submitQuiz);

router.get('/allquiz', getAllQuiz);

router.delete('/delete/:quizId', deleteQuiz);
router.get('/quiz/:quizId', getSingleQuizIntro);
router.get('/quiz/:quizId/take', getSingleQuizQuestions );

router.get('/quiz/:quizId/leaderboard', getQuizLeaderBoard);

export default router;