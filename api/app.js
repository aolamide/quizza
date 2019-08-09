import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongodb from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';

const url = 'mongodb://localhost:27017/test';

mongoose.connect(url, {useNewUrlParser: true})
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//routes
import quizRoutes from './routes/quiz';


dotenv.config();
//app
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api/v1', quizRoutes);




app.get('/', (req, res) => {
    res.json('Welcome man')
}) 



//listen to app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`A Node app is listening on port ${PORT}`));