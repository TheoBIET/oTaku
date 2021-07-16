require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

const {
    frontendRouter,
    apiRouter
} = require('./app/routers');

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use('/api', apiRouter);
app.use(frontendRouter);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});