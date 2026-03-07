import express from 'express';
import cityRoutes from './routes/cityRoutes.mjs';
import { sequelize } from './models/cities.mjs';

const app = express();
const PORT = 3000;

// Set ejs as the view engine
app.set('view engine', 'ejs');

// For parsing form data (POST requests)
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public')); // serves index.html
app.use(cityRoutes);

await sequelize.sync().then( () => console.log('Database synced'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
