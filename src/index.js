import 'dotenv/config';
import express from 'express';
import userRouter from './routes/userRouter';
import groupRouter from './routes/groupRouter';
import logger from './util/logger';
import { internalErr, notFound } from './util/constant';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    logger.info(`request url: ${req.url}, method: ${req.method}, body: ${JSON.stringify(req.body)}`);
    next();
});

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }
    logger.error(err.message);
    res.status(err.status || 500).send(internalErr);
});

app.use((req, res) => {
    logger.warn(`wrong request: ${req.url}, method: ${req.method}, body: ${JSON.stringify(req.body)}`);
    res.status(404).send(notFound);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    logger.info(`Server is running on PORT ${port}`);
});

