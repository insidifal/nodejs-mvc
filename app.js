const express = require('express');
const app = express();

const PORT = 3000;
const userRoutes = require('./routes/userRoutes');

// Set ejs as the view engine
app.set('view engine', 'ejs');

// For parsing form data (POST requests)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('<h1>Hello Express</h1>'));

// Mount the user routes
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
