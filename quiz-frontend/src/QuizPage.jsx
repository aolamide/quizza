import React, {Component} from 'react';
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
            result : null,
            currrentQuestion : 1,
            selectedAnswer : null,
            answers : [],
            submitted : false,
            disableButton :  false
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

    submitAnswers = () => {
        this.saveAndNext();
        this.setState({disableButton : true, submitted : true});
        let answers = this.state.answers;
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

   saveAnswer = (e) => {
        this.setState({selectedAnswer : e.target.name});
        let buttons = document.querySelectorAll('.btn-answers');
        buttons.forEach(button => {
            if(button.name === e.target.name) button.style.backgroundColor = 'green'
            else button.style.backgroundColor = '#ddd';
        })
   }

   saveAndNext = () => {
       this.setState({disableButton : true});
        this.state.answers.push(this.state.selectedAnswer);
        if(this.state.quiz.questions[this.state.currrentQuestion]){
            this.setState({selectedAnswer : null, currrentQuestion : this.state.currrentQuestion + 1, disableButton : false});
            document.querySelectorAll('.btn-answers').forEach(button => button.style.backgroundColor = '#ddd');
        }
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
                    <div className="quiz">
                        <Timer timeOver = {this.submitAnswers} min = {this.state.quiz.duration.min} sec = {this.state.quiz.duration.sec} submitted={this.state.submitted}/>
                        <div>Question {this.state.currrentQuestion}</div>
                        <div className="questionDisplay">
                            <div>{this.state.quiz.questions[this.state.currrentQuestion - 1].title }</div>
                        </div>
                        <div className="option-row">
                            <div className="option">
                                <button className='btn-answers' onClick={this.saveAnswer} id="optionA" name="A">
                                {this.state.quiz.questions[this.state.currrentQuestion - 1].options[0]}
                                </button>
                            </div>
                            <div className="option">
                                <button className='btn-answers' onClick={this.saveAnswer} id="optionB" name="B">
                                {this.state.quiz.questions[this.state.currrentQuestion - 1].options[1]}
                                </button>
                            </div>
                        </div>
                        <div className="option-row">
                            <div className="option">
                                <button className='btn-answers' onClick={this.saveAnswer} id="optionC" name="C">
                                {this.state.quiz.questions[this.state.currrentQuestion - 1].options[2]}
                                </button>
                            </div>
                            <div className="option">
                                <button className='btn-answers' onClick={this.saveAnswer} id="optionD" name="D">
                                {this.state.quiz.questions[this.state.currrentQuestion - 1].options[3]}
                                </button>
                            </div>  
                        </div>
                        {this.state.quiz.questions[this.state.currrentQuestion] ? <button disabled={this.state.disableButton} onClick = {this.saveAndNext}>NEXT</button> : <button disabled={this.state.disableButton} onClick = {this.submitAnswers}> FINISH QUIZ</button> }
                        <form></form>
                    </div>
                )
            }
            if(this.state.result) {
                return (
                    <div>
                        <p>{`${user}, your score is ${result.percent}%`}</p>
                        <p>{`You got ${result.score} questions correctly out of ${result.max}.`}</p>
                        <p>See the quiz leaderboard and see where you rank amongst all who have taken quiz <a href={`https://quizza.live/#/${this.state.quizId}/leaderboard`} target="_blank" rel="noopener noreferrer">LEADERBOARD</a></p>
                    </div>
                )
            }
        }
        return <div></div>
    }
}

export default QuizPage;