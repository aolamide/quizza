import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    name : String,
    questions : [{title: String, options: [String]}],
    answers : [String],
    created : {
        type: Date,
        default : Date.now
    },
    creator : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    takenBy : [
        {
            name : String, 
            score : String
        }
    ],
    duration : Object
});



const quizModel = mongoose.model('Quiz', quizSchema);

export default quizModel;