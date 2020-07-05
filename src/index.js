import 'dotenv/config';
import express from 'express';
import userRouter from './routes/userRouter';
import groupRouter from './routes/groupRouter';
import logger from './util/logger';
import { internalErr, notFound } from './util/constant';

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use((req, res, next) => {
    if (res.locals.log) {
        logger.info(res.locals.log);
    }
    if (res.locals.status && res.locals.send) {
        res.status(res.locals.status).send(res.locals.send);
    } else {
        return next();
    }
});

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

