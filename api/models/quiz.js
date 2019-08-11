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
        name : {
            type : String,
            trim : true
        },
        email : {
            type : String,
            trim : true
        }
    },
    takenBy : [
        {
            name : String, 
            score : String
        }
    ],
    duration : String
});



const quizModel = mongoose.model('Quiz', quizSchema);

export default quizModel;