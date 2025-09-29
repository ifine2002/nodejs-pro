/// <reference path="./type/index.d.ts" />

import initDatabase from 'config/seed';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import webRoutes from 'routes/web';
import configPassportLocal from 'src/middleware/passport.local';
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

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

//config session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 1 * 24 * 60 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))

//config passport
app.use(passport.initialize())
app.use(passport.authenticate("session"));
configPassportLocal();

//config global
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});

//config routes
webRoutes(app);

initDatabase();

//handle 404 not found
app.use((req, res) => {
    res.render('status/404');
})

app.listen(8080, () => {
    console.log(`Server is running on port: ${PORT}`);
})