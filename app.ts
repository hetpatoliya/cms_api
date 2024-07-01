import express from 'express';
import db from './src/db/connectDb';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.static('public/uploads'))

db.on('Error', console.error.bind(console, 'error'));

import userRoute from './src/routes/user.routes';
import mediaRoute from './src/routes/media.route';
import articleRoute from './src/routes/article.route';

app.use('/user', userRoute);
app.use('/media', mediaRoute);
app.use('/article', articleRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});