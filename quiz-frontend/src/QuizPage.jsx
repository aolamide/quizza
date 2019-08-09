import React, {Component} from 'react';
import Questions from './Questions';

class QuizPage extends Component {
    constructor({match}){
        super()
        this.state = {
            quizId : match.params.quizId,
            quiz : null,
            starting : false
        }
        console.log(this.state.quizId);
    }
   
    componentDidMount() {
        fetch(`http://localhost:8080/api/v1/quiz/${this.state.quizId}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                quiz : data.quizDetails
            })
            console.log(this.state.quiz.creator)
        })
    }

    fetchQuestions = () => {
        fetch(`http://localhost:8080/api/v1/quiz/${this.state.quizId}/take`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                quiz : data.quiz,
                starting: true
            })
        })
    }

    submitAnswers = (e) => {
        e.preventDefault();
        let inputNames = [];
        this.state.quiz.questions.forEach(question => {
            inputNames.push(question._id)
        });
        console.log(inputNames);
        // let answersInputs = document.querySelectorAll(`input`);
        let answers = []
        ;
        inputNames.forEach(name => {
            answers.push(document.forms[0][`q${name}`].value)
        });
        console.log(answers);
        fetch(`http://localhost:8080/api/v1/submit/${this.state.quiz._id}`, {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({answers}),
        })
        .then(res => res.json())
        .then(result => console.log(result))

    }

    render(){
        if(this.state.quiz) {
            console.log(this.state.quiz);
            const {creator, duration, created} = this.state.quiz;
            if (!this.state.starting) {
                return (
                    <div>
                        <h1>Creator : {creator}</h1>
                        <h2>Duration :{duration}</h2>
                        <h3>Created :{new Date(created).toDateString()}</h3>
                        <div>
                            <button onClick = {this.fetchQuestions}>TAKE QUIZ</button>
                        </div>
                    </div>
                );
            }
            if(this.state.starting) {
                return (
                    <form>
                        <Questions questions = {this.state.quiz.questions} />
                        <button onClick = {this.submitAnswers}>SUBMIT QUIZ</button>
                    </form>
                )
            }
        }
        return <div></div>
    }
}

export default QuizPage;