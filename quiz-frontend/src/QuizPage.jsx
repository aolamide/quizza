import React, {Component} from 'react';
import Questions from './Questions';
import Timer from './Timer';

class QuizPage extends Component {
    constructor({match}){
        super()
        this.state = {
            quizId : match.params.quizId,
            quiz : null,
            quizCreator : null,
            starting : false,
            user : '',
            result : null
        }
    }
   
    componentDidMount() {
        fetch(`https://lalaquiz.herokuapp.com/api/v1/quiz/${this.state.quizId}`)
        .then(res => res.json())
        .then(data => {
            const { created, name, duration,  creator } = data.quizDetails;
            this.setState({
                quiz : {created, name, duration},
                quizCreator : creator
            })
            document.title = `${name} | Quizza`;
        })
    }

    fetchQuestions = (e) => {
        e.preventDefault()
        fetch(`https://lalaquiz.herokuapp.com/api/v1/quiz/${this.state.quizId}/take`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                quiz : data.quiz,
                starting: true,
                modalHidden : true,
                user : this.user.value
            })
        })
    }

    submitAnswers = (e) => {
        if(e) {
           e.preventDefault(); 
        }
        let inputNames = [];
        this.state.quiz.questions.forEach(question => {
            inputNames.push(question._id)
        });
        let answers = []
        ;
        inputNames.forEach(name => {
            answers.push(document.forms[0][`q${name}`].value)
        });
        fetch(`https://lalaquiz.herokuapp.com/api/v1/submit/${this.state.quiz._id}`, {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({answers, takenBy : this.state.user}),
        })
        .then(res => res.json())
        .then(data => {
                this.setState({
                    starting : false,
                    result : {
                        score : data.result.score,
                        max : data.maxScore,
                        percent : (data.result.score/data.maxScore) * 100
                    }
                })
            }
        )
    }
   
    displayModal = () => {
        this.popup.style.display = "block";
    }

    render(){
        if(this.state.quiz) {
            const {user, result} = this.state;
            const {name, duration, created} = this.state.quiz;
            const { name : creatorName } = this.state.quizCreator;
            if (!this.state.starting && !this.state.result) {
                return (
                    <div>
                        <h1>{name}</h1>
                        <p>Created by {creatorName}</p>
                        <h2>Duration : {`${duration.min} minutes : ${duration.sec} seconds`}</h2>
                        <h3>Created : {new Date(created).toDateString()}</h3>
                        <div>
                            <button onClick = {this.displayModal}>TAKE QUIZ</button>
                        </div>  
                        <div ref = {elem => this.popup = elem} className="popup">
                            <form onSubmit= {this.fetchQuestions}>
                                <input required ref={elem => this.user = elem} minLength="3" type="text" placeholder="Enter Name"/>
                                <button type="submit" >START</button>
                            </form>
                        </div>
                    </div>
                );
            }
            if(this.state.starting) {
                return (
                    <div>
                        <Timer stop = {this.submitAnswers} min = {this.state.quiz.duration.min} sec = {this.state.quiz.duration.sec} />
                        <form>
                            <Questions questions = {this.state.quiz.questions} />
                            <button onClick = {this.submitAnswers}>SUBMIT QUIZ</button>
                        </form>
                    </div>
                )
            }
            if(this.state.result) {
                return (
                    <div>
                        <p>{`${user}, your score is ${result.percent}%`}</p>
                        <p>{`You got ${result.score} questions correctly out of ${result.max}.`}</p>
                        <p>See the quiz leaderboard and see where you rank amongst all who have taken quiz <a href={`https://aolamide.me/quiz-app/#/quiz/${this.state.quizId}/leaderboard`} target="_blank" rel="noopener noreferrer">LEADERBOARD</a></p>
                    </div>
                )
            }
        }
        return <div></div>
    }
}

export default QuizPage;