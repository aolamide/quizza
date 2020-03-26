import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Timer from '../components/Timer';
import logo from '../images/quizza.png';
import API_BASE from '../apiBase.js';

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
            questions : '',
            answers : [],
            submitted : false,
            disableButton :  false,
            loading : true, 
            quizNotFound : false
        }
    }
   
    componentDidMount() {
        fetch(`${API_BASE}/quiz/${this.state.quizId}`)
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                this.setState({quizNotFound : true, loading : false})
            } else {
                const { created, name, duration,  creator, noOfQuestions } = data.quizDetails;
                this.setState({
                    loading : false,
                    quiz : {created, name, duration, noOfQuestions},
                    quizCreator : creator
                })
                this.min = duration.min;
                this.sec = duration.sec;
                document.title = `${name} | Quizza`;
            }
        })
    }
    
    fetchQuestions = e => {
        e.preventDefault()
        this.setState({loading : true})
        fetch(`${API_BASE}/quiz/${this.state.quizId}/take`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                loading : false,
                questions : data.questions,
                starting: true,
                modalHidden : true,
                user : this.user.value
            })
        })
    }
    handleQuestionChange = num => {
        this.setState({currrentQuestion : num, selectedAnswer : this.state.answers[num - 1]})
        document.querySelectorAll('.btn-answers').forEach(button => {
            if(button.name === this.state.answers[num - 1]) {
                button.style.backgroundColor = 'green';
                button.style.color = 'white';
            } else {
                button.style.backgroundColor = '#ddd';
                button.style.color = '#07323f'
            }
        })
    }

    submitAnswers = async () => {
        await this.saveAndNext();
        this.setState({disableButton : true, submitted : true, loading : true});
        let answers = this.state.answers;
        fetch(`${API_BASE}/submit/${this.state.quizId}`, {
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
                    loading : false,
                    result : {
                        score : data.result.score,
                        max : data.maxScore,
                        percent : (data.result.score/data.maxScore) * 100
                    }
                })
            }
        )
    }

   saveAnswer = e => {
        this.setState({selectedAnswer : e.target.name}, () => {
            let answers = [...this.state.answers];
            answers[this.state.currrentQuestion - 1] = this.state.selectedAnswer;
            this.setState({answers})
        });
        let buttons = document.querySelectorAll('.btn-answers');
        buttons.forEach(button => {
            if(button.name === e.target.name){
                button.style.backgroundColor = 'green';
                button.style.color = 'white';
            } 
            else {
                button.style.backgroundColor = '#ddd';
                button.style.color = '#07323f';
            }
        })
   }

   saveAndNext = async() => {
    if(this.state.questions[this.state.currrentQuestion]){
        await this.setState({currrentQuestion : this.state.currrentQuestion + 1, disableButton : false}, () => this.setState({selectedAnswer : this.state.answers[this.state.currrentQuestion - 1]}));
        document.querySelectorAll('.btn-answers').forEach(button => {
            if(button.name === this.state.answers[this.state.currrentQuestion - 1]){
                button.style.backgroundColor = 'green';
                button.style.color = 'white';
            } else {
                button.style.backgroundColor = '#ddd';
                button.style.color = '#07323f'
            }
        });
    }
   }

    displayModal = () => {
        this.popup.style.display = "flex";
    }

    closeModal = () => {
        this.popup.style.display = 'none';
    }
    render(){
        if(this.state.quiz) {
            const {user, result} = this.state;
            const {name, duration, created, noOfQuestions} = this.state.quiz;
            const { name : creatorName } = this.state.quizCreator;
            if (!this.state.starting && !this.state.result) {
                return (
                    <>
                        <div style={{minHeight : 'calc(100vh - 60px)'}}>
                            <img src={logo} alt="Quizza logo" className='logo-page'/>
                            <div style={{padding : '10px', display : 'flex', flexDirection : 'column', justifyContent: 'center', alignItems : 'center', height : '50vh', textAlign : 'center'}}>
                                <div>
                                    <h1>{name}</h1>
                                    <p>Created by {creatorName} on {new Date(created).toDateString()} </p>
                                    <h3>No of questions : {noOfQuestions}</h3>
                                    <h2>Time Allowed : {`${duration.min} min ${duration.sec.padStart(2, 0)} sec`}</h2>
                                    <div>
                                        <button className='btn-take' onClick = {this.displayModal}>TAKE QUIZ</button>
                                    </div>
                                </div>  
                                <div ref = {elem => this.popup = elem} className="popup">
                                    <button onClick={this.closeModal} className='btn-close-popup'>X</button>
                                    <form onSubmit= {this.fetchQuestions}>
                                        <input required ref={elem => this.user = elem} minLength="3" type="text" placeholder="Enter Name"/>
                                        <button type="submit" >START</button>
                                    </form>
                                </div>
                                {this.state.loading && <div className="loading"></div>}
                            </div>
                        </div>
                        <div className='textCenter underline bold'>
                            <Link to='/createquiz' target='_blank'>Create your own quiz</Link>
                        </div>
                        <div className='textCenter'>
                            <em>Quizza was created by <a style={{color:'brown'}} href='https://twitter.com/olamideaboyeji' target='_blank' rel="noopener noreferrer">Olamide Aboyeji</a></em>
                        </div>
                    </>
                );
            }
            if(this.state.starting) {
                return (
                    <div className="quiz">
                        <img style={{margin : '0px auto 0px'}} src={logo} alt="Quizza logo" className='logo-page'/>
                        <Timer timeOver = {this.submitAnswers} min = {this.min} sec = {this.sec} submitted={this.state.submitted}/>
                        <div style={{display : 'flex', flexWrap : 'wrap', margin : 'auto', justifyContent : 'center'}}>
                            {Array.from({length : this.state.questions.length}, (item, i) => {
                                return <button title={`Question ${i + 1}`} onClick = {() => this.handleQuestionChange(i+1)} key ={i} style={{margin : '10px', backgroundColor : this.state.answers[i] ? 'green' : 'red', color : 'white', width : '30px', height : '30px', border : this.state.currrentQuestion === i + 1 ? '3px solid rgba(35, 173, 255, 1)' : ''}}>{i + 1}</button>
                            })}
                        </div>
                        <div className="activeQuestion bold">Question {this.state.currrentQuestion} of {this.state.questions.length}</div>
                        <div className="bold questionDisplay">
                            <div>{this.state.questions[this.state.currrentQuestion - 1].title }</div>
                        </div>
                        <div className="option-row">
                            <div className="option">
                                <button className='btn-answers' onClick={this.saveAnswer} id="optionA" name="A">
                                {this.state.questions[this.state.currrentQuestion - 1].options[0]}
                                </button>
                            </div>
                            <div className="option">
                                <button className='btn-answers' onClick={this.saveAnswer} id="optionB" name="B">
                                {this.state.questions[this.state.currrentQuestion - 1].options[1]}
                                </button>
                            </div>
                        </div>
                        <div className="option-row">
                            <div className="option">
                                <button className='btn-answers' onClick={this.saveAnswer} id="optionC" name="C">
                                {this.state.questions[this.state.currrentQuestion - 1].options[2]}
                                </button>
                            </div>
                            <div className="option">
                                <button className='btn-answers' onClick={this.saveAnswer} id="optionD" name="D">
                                {this.state.questions[this.state.currrentQuestion - 1].options[3]}
                                </button>
                            </div>  
                        </div>
                        {this.state.questions[this.state.currrentQuestion] ? <button disabled={this.state.disableButton}  className="btn-quiz" onClick = {this.saveAndNext}>NEXT</button> : <button disabled={this.state.disableButton} className="btn-quiz" onClick = {this.submitAnswers}> FINISH QUIZ</button> }
                        <form></form>
                        {this.state.loading && <div className="loading"></div>}
                    </div>
                )
            }
            if(this.state.result) {
                return (
                    <>
                        <div style={{minHeight : 'calc(100vh - 60px)'}}>
                            <img src={logo} alt="Quizza logo" className='logo-page'/>
                            <div className='result-container'>
                                <div className='result-img'>

                                </div>
                                <div style={{textAlign : 'center'}}>
                                    <p className='result-name'>Hey, <span className='bold' style={{color: 'sienna'}}>{user}</span></p>
                                    <p className='result-percent-intro'>Your score for '<span className='bold'>{name}</span>' is </p>
                                    <p className='result-percent'>{result.percent.toFixed(1).split('.')[1] === '0' ? result.percent : result.percent.toFixed(1)}%</p>
                                    <p className='result-score-intro'>Correct Answers / Total Questions</p>
                                    <p className='result-score bold'>{result.score} / {result.max}</p>
                                    <p>See where you rank on the <Link to={`${this.state.quizId}/leaderboard`} target='_blank'>Quiz Leaderboard</Link></p>
                                </div>
                            </div>
                        </div>
                            <div className='textCenter underline bold'>
                            <Link to='/createquiz' target='_blank'>Create your own quiz</Link>
                        </div>
                        <div className='textCenter'>
                            <em>Quizza was created by <a style={{color:'brown'}} href='https://twitter.com/olamideaboyeji' target='_blank' rel="noopener noreferrer">Olamide Aboyeji</a></em>
                        </div>
                    </>
                )
            }
        }
        else if(this.state.quizNotFound) {
            return (
                <div>
                    <img src={logo} alt="Quizza logo" className='logo-page'/>
                    <h1 className='textCenter'>Quiz Not Found</h1>
                    <h3 className='textCenter'>Please check the link or try again.</h3>
                </div>
            )
        }
        return <div className='loading'></div>
    }
}

export default QuizPage;