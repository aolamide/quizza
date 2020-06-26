import { Router } from 'express';
import quizControllers from '../controllers/quiz';
import { confirmUser, hasAuthorization, requireSignIn, tokenValid, isAdmin } from "../controllers/auth";
const router = Router();
const { createQuiz, submitQuiz, getAllQuiz, deleteQuiz, getSingleQuizIntro, getSingleQuizQuestions, getQuizLeaderBoard }  = quizControllers;

router.post('/newquiz', confirmUser,  requireSignIn, tokenValid, hasAuthorization, createQuiz);

router.post('/submit/:quizId', submitQuiz);

router.get('/quizzes', requireSignIn, tokenValid, isAdmin, getAllQuiz);

router.delete('/admin/quiz/:quiz', requireSignIn, tokenValid, isAdmin, deleteQuiz);
router.get('/quiz/:quizId', getSingleQuizIntro);
router.get('/quiz/:quizId/take', getSingleQuizQuestions );

router.post('/quiz/:quizId/leaderboard', getQuizLeaderBoard);


export default router;