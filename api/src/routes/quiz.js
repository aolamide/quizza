import { Router } from 'express';
import quizControllers from '../controllers/quiz';
import { userById } from "../controllers/auth";
const router = Router();
const { createQuiz, submitQuiz, getAllQuiz, deleteQuiz, getSingleQuizIntro, getSingleQuizQuestions, getQuizLeaderBoard }  = quizControllers;

router.post('/newquiz', createQuiz);

router.post('/submit/:quizId', submitQuiz);

router.get('/allquiz', getAllQuiz);

router.delete('/quiz/delete/:quizId', deleteQuiz);
router.get('/quiz/:quizId', getSingleQuizIntro);
router.get('/quiz/:quizId/take', getSingleQuizQuestions );

router.get('/quiz/:quizId/leaderboard', getQuizLeaderBoard);

//any route containing userId, our app would first exec userById()
router.param("userId", userById );

export default router;