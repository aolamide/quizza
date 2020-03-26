import mongoose from 'mongoose';
import nanoid from 'nanoid';

mongoose.set('useCreateIndex', true);

const quizSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => nanoid(10),
        unique : true
    },
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
    privateBoard : {
        type : Boolean,
        default : false
    },
    duration : Object
});



const quizModel = mongoose.model('Quiz', quizSchema);

export default quizModel;