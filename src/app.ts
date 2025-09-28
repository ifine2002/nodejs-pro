import initDatabase from 'config/seed';
import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import webRoutes from 'routes/web';
import configPassportLocal from 'src/middleware/passport.local';

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

//config passport
app.use(passport.initialize())
configPassportLocal();

//config routes
webRoutes(app);

initDatabase();

//handle 404 not found
app.use((req, res) => {
    res.render('client/handle/notfound');
})

app.listen(8080, () => {
    console.log(`Server is running on port: ${PORT}`);
})