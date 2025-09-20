import 'dotenv/config';

const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;
app.get('/', (req, res) => {
    res.send('Hello World Nodemon');
})

app.listen(8080, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log("env port:", process.env.PORT)
})