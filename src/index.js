import 'dotenv/config';
import express from 'express';
import userRouter from './routes/userRouter';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.use((req, res) => {
    res.status(404).send('Not Found');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

