const express = require('express');
const app = express();

const rootRouter = require('./routes/index');

app.use(express.static('.'));

app.use(express.json());

app.listen('8080', () => {
        // 
})

app.use('/api', rootRouter);