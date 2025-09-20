import 'dotenv/config';
import express from 'express';
import webRoutes from './routes/web';
import getConnection from './config/database';

const app = express();
const PORT = process.env.PORT || 8080;

//middleware to parse form data
//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

//config static files: images/css/js
app.use(express.static('public'));

//config routes
webRoutes(app);

getConnection();

app.listen(8080, () => {
    console.log(`Server is running on port: ${PORT}`);
})