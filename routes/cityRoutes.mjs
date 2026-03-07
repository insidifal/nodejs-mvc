import express from 'express';
const router = express.Router();

import * as cityController from '../controllers/cityController.mjs';

// cityName goes into URL query parameter
router.get('/api/city/:cityName', cityController.getCity);

export default router;
