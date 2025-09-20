import express, { Express } from 'express';

const router = express.Router();

const routerWeb = (app: Express) => {

    router.get('/', (req, res) => {
        res.render('home.ejs');
    })

    router.get('/abc', (req, res) => {
        res.send('Hello ABC');
    })

    app.use('/', router);
}

export default routerWeb;