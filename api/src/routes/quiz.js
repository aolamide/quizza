import { Router } from 'express';
import quizControllers from '../controllers/quiz';
import { confirmUser, hasAuthorization, requireSignIn } from "../controllers/auth";
const router = Router();
const { createQuiz, submitQuiz, getAllQuiz, deleteQuiz, getSingleQuizIntro, getSingleQuizQuestions, getQuizLeaderBoard }  = quizControllers;

router.post('/newquiz', confirmUser,  requireSignIn, hasAuthorization, createQuiz);

router.post('/submit/:quizId', submitQuiz);

router.get('/allquiz', getAllQuiz);

router.delete('/quiz/delete/:quizId', deleteQuiz);
router.get('/quiz/:quizId', getSingleQuizIntro);
router.get('/quiz/:quizId/take', getSingleQuizQuestions );

router.get('/quiz/:quizId/leaderboard', getQuizLeaderBoard);


export default router;