import { Router } from 'express';
import propertyRoutes from './propertyRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/properties', propertyRoutes);
router.use('/users', userRoutes);

export default router;
