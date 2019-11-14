import express from "express";
import { signUp, signIn} from "../controllers/auth";
import validate from '../validation';
const router = express.Router();

router.post('/register', validate, signUp );
router.post('/login', signIn);



export default router;