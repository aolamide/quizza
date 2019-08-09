import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    name : String,
    questions : [{title: String, options: [String]}],
    answers : [String],
    created : {
        type: Date,
        default : Date.now
    },
    creator : String,
    takenBy : [
        {
            name : String, 
            score : String
        }
    ],
    duration : String,
    expires : String
});



const quizModel = mongoose.model('Quiz', quizSchema);

export default quizModel;