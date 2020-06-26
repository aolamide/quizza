import { Router } from 'express';
import { getStats } from '../controllers/admin';
import { requireSignIn, tokenValid, isAdmin, deleteUser} from '../controllers/auth';

const router = Router();

router.get('/stats', requireSignIn, tokenValid, isAdmin, getStats);
router.delete('/user/:user', requireSignIn, tokenValid, isAdmin, deleteUser);

export default router;