import express from "express";
import { signUp, signIn, forgotPassword, confirmResetLink, updatePassword} from "../controllers/auth";
import validate from '../validation';
const router = express.Router();

router.post('/register', validate, signUp );
router.post('/login', signIn);
router.post('/forgotPassword', forgotPassword);
router.get('/reset', confirmResetLink);
router.put('/updatePassword', updatePassword);



export default router;