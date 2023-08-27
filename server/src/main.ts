import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // form태그 내용 받으려면
app.use(cookieParser());
app.use(morgan('dev'));
mongoose
  .connect(
    `mongodb+srv://jaeahfe:${process.env.MONGODB_PASSWORD}@cluster0.zv75y0a.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log('mongodb connected!'))
  .catch((err) => {
    console.error(err);
  });

app.get('/', (req, res) => {
  res.send('server is running!');
});

app.listen(`${process.env.PORT}`, async () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
