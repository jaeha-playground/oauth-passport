import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('server is running!');
});

app.listen(`${process.env.PORT}`, async () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
