import express from 'express';
import { sequelizeCities } from './models/cities.mjs';
import { sequelizeWeather } from './models/weather.mjs';
import cityRoutes from './routes/cityRoutes.mjs';
import weatherRoutes from './routes/weatherRoutes.mjs';

const app = express();
const PORT = 3000;

// Set ejs as the view engine
app.set('view engine', 'ejs');

// For parsing form data (POST requests)
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public')); // serves index.html
// app.use(cityRoutes);
app.use(weatherRoutes);

await sequelizeCities.sync().then( () => console.log('Database: Cities table synced'));
await sequelizeWeather.sync().then( () => console.log('Database: Weather table synced'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
