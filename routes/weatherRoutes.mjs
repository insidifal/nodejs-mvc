import express from 'express';
const router = express.Router();

import * as weatherController from '../controllers/weatherController.mjs';

// cityName goes into URL query parameter
router.get('/api/weather/:cityName', weatherController.getWeatherData);

export default router;
