import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
// import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();

//routes
import quizRoutes from './routes/quiz';
import authRoutes from './routes/auth'; 
import adminRoutes from './routes/admin'; 

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});


//app
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
// app.use(morgan('dev'));
app.use('/v1', [quizRoutes, authRoutes]);
app.use('/v1/admin', adminRoutes );


app.get('/', (req, res) => {
    res.json('Welcome to Quizza API');
});

app.get('/v1', (req, res) => {
    res.json('Welcome to Quizza API v1');
});


app.use((req, res, next) => {
    return res.status(404).json({
        error : 'Not Found'
    })
})


//listen to app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`A Node app is listening on port ${PORT}`));