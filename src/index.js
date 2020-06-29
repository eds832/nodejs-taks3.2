import 'dotenv/config';
import express from 'express';
import userRouter from './routes/userRouter';
import groupRouter from './routes/groupRouter';
import logger from './util/logger';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    logger.info(`request url: ${req.url}, method: ${req.method}, body: ${JSON.stringify(req.body)}`);
    next();
});

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use((req, res) => {
    logger.warn(`wrong request: ${req.url}, method: ${req.method}, body: ${JSON.stringify(req.body)}`);
    res.status(404).send('Not Found');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    logger.info(`Server is running on PORT ${port}`);
});

