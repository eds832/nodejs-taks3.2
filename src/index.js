import 'dotenv/config';
import express from 'express';
import userRouter from './routes/userRouter';
import groupRouter from './routes/groupRouter';
import authRouter from './routes/authRouter';
import loginRouter from './routes/loginRouter';
import logger from './util/logger';
import { internalErr, notFound } from './util/constant';
import { stringifyBody } from './util/util';
import cors from 'cors';
import * as HttpStatus from 'http-status-codes';

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

app.use(['/users', '/groups'], authRouter);
app.post('/login', loginRouter);
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
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).send(internalErr);
});

app.use((req, res) => {
    logger.warn(`wrong request: ${req.url}, method: ${req.method}, body: ${stringifyBody(req.body)}`);
    res.status(HttpStatus.NOT_FOUND).send(notFound);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    logger.info(`Server is running on PORT ${port}`);
});

