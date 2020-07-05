import 'dotenv/config';
import express from 'express';
import userRouter from './routes/userRouter';
import groupRouter from './routes/groupRouter';
import authRouter from './routes/authRouter';
import loginRouter from './routes/loginRouter';
import logger from './util/logger';
import { internalErr, notFound } from './util/constant';
import { unless, stringifyBody } from './util/util';
import cors from 'cors';

const app = express();

const domainsWhitelist = process.env.CORS_WHITELIST.split(',');
const corsOptions = {
    origin: (origin, callback) => {
        if (domainsWhitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error(`origin: ${origin} isn't allowed by CORS`));
        }
    }
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
    logger.info(`request url: ${req.url}, method: ${req.method}, body: ${stringifyBody(req.body)}`);
    next();
});

app.use(unless('/login', authRouter));
app.post('/login', loginRouter);
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
    logger.warn(`wrong request: ${req.url}, method: ${req.method}, body: ${stringifyBody(req.body)}`);
    res.status(404).send(notFound);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    logger.info(`Server is running on PORT ${port}`);
});

