import { Router } from 'express';
import { getStats } from '../controllers/admin';
import { requireSignIn, tokenValid, isAdmin} from '../controllers/auth';

const router = Router();

router.get('/stats', requireSignIn, tokenValid, isAdmin, getStats);

export default router;