import 'dotenv/config';
import express from 'express';
import routerWeb from './routes/web';

const app = express();
const PORT = process.env.PORT || 8080;

//congfig view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

routerWeb(app);

app.listen(8080, () => {
    console.log(`Server is running on port: ${PORT}`);
})