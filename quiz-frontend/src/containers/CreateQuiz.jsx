import React, {Component} from 'react';
import Question from '../components/Question';
import styles from '../css/createquiz.module.css';
import { isAuthenticated } from '../auth';
import logo from '../images/quizza.png';
import {Link} from 'react-router-dom'


class CreateQuiz extends Component {
    state = {
        questions : [],
        answers : [],
        title : '',
        optionA : '',
        optionB : '',
        optionC : '',
        optionD : '',
        answer : '',
        verifiedQuestions : [],
        duration : '',
        noOfQuestions : '',
        questionFilling : 1,
        status : 'fillingDetails',
        quizId : '',
        sending : false,
        name : '',
        min : '',
        sec : '',
        error : '',
        loading : false,
        linkCopied : false
    }
    saveDetails = (e) => {
        e.preventDefault();
        this.setState({loading : true});
        let { min, sec } = this.state;
        const duration = {
            min,
            sec
        }
        let answers = [];
        let questions = [];
        for(let i = 0; i < this.state.noOfQuestions; i++) {
            let question = {title : '', options : ['', '', '', '']};
            let answer = '';
            answers.push(answer);
            questions.push(question)
        }
        this.setState({questions, answers, status : 'fillingQuiz', duration, loading : false})

    }
    submitQuiz = async(e) => {
        e.preventDefault();
        this.setState({error : '', loading : true});
        let questionsVerified = await this.allQuestionsVerified();
        if(!questionsVerified) {
            this.setState({error : 'Please fill all questions, options and answers correctly', loading : false})
            return;
        }
        const {questions, answers, duration, name} = this.state;
        let jwt = isAuthenticated();
        let creator = jwt.user._id; 
        let token = jwt.token;
        fetch('https://lalaquiz.herokuapp.com/api/v1/newquiz', {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({questions, answers, creator, duration, name}),
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                this.setState({error : data.error, loading : false});
                return;
            }
            this.setState({quizId : data.quizId, status : 'completed', loading : false})
        })
        .catch(err => console.log(err));
    }
    copyToClipboard = () => {
        let textField = document.createElement('textarea');
        textField.innerText = `https://quizza.live/${this.state.quizId}`;
        document.body.appendChild(textField);
        textField.select()
        document.execCommand('copy')
        textField.remove()
        this.setState({linkCopied : true}, () => this.copyButton.style.opacity = 0)
        setTimeout(() => this.copyButton.style.display = 'none', 1300)
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.error && prevState.status === 'fillingQuiz') this.setState({error : ''})
        if(this.state.status === 'fillingQuiz' && prevState.questionFilling !== this.state.questionFilling) {
            let { answers, questions, questionFilling } = this.state;
            let answer = answers[questionFilling - 1];
            let title = questions[questionFilling - 1].title;
            let optionA = questions[questionFilling - 1].options[0];
            let optionB = questions[questionFilling - 1].options[1];
            let optionC = questions[questionFilling - 1].options[2];
            let optionD = questions[questionFilling - 1].options[3];
            this.setState({answer, title, optionA, optionB, optionC, optionD}, () => {document.querySelector('select').value = this.state.answer;});
        }
    }
    handleQuestionChange = async(number) => {
        if(this.state.questionFilling === number) return;
        await this.storeQuestion()
        let verified = await this.inputsAreVerified(this.state);
        if(verified) await this.verifyQuestion(this.state.questionFilling);
        else await this.unVerifyQuestion(this.state.questionFilling);
        this.setState({questionFilling : number}, () => this.form.reset())
    }
    handleInput = name => e => {
        this.setState({[name] : e.target.value})
    }
    inputsAreVerified = () => {
        let { answer : ans, title, optionA, optionB, optionC, optionD } = this.state;
        if(ans !== 'A' && ans !== 'B' && ans !== 'C' && ans !== 'D') return false;
        else if(optionA.trim() && optionB.trim() && optionC.trim() && optionD.trim() && title.trim()) return true;
    }
    storeQuestion = () => {
        let {questionFilling, questions, answers, answer, title, optionA, optionB, optionC, optionD } = this.state;
        let question = {title, options : [optionA, optionB, optionC, optionD]}
        let currentAnswers = [...answers];
        currentAnswers[questionFilling - 1] = answer;
        let currentQuestions = [...questions];
        currentQuestions[questionFilling - 1] = question;
        this.setState({answers : currentAnswers, questions : currentQuestions});
    }
    verifyQuestion = number => {
        if(this.state.verifiedQuestions.includes(number)) return;
        let verified = [...this.state.verifiedQuestions];
        verified.push(number);
        this.setState({verifiedQuestions : verified})
    }
    unVerifyQuestion = number => {
        if(!this.state.verifiedQuestions.includes(number)) return;
        let verified = [...this.state.verifiedQuestions];
        let index = verified.indexOf(number);
        verified.splice(index, 1);
        this.setState({verifiedQuestions : verified})
    }
    saveAndNext = async() => {
        let verified = await this.inputsAreVerified(this.state);
        if(!verified) {
            this.setState({error : 'Fill all fields'});
            return;
        };
        await this.storeQuestion();
        if(this.state.questionFilling + 1 <= this.state.noOfQuestions) {
            await this.verifyQuestion(this.state.questionFilling);
            this.setState({questionFilling : this.state.questionFilling + 1}, () => this.form.reset())
        } 
    }
    allQuestionsVerified = () => {
        for(let ans of this.state.answers) if(ans !== 'A' && ans !== 'B' && ans !== 'C' && ans !== 'D') return false;
        for(let question of this.state.questions){
            let { options , title } = question;
            if(!options[0].trim() || !options[1].trim() || !options[2].trim() || !options[3].trim() || !title.trim()) return false;
        } 
        return true;
    }
    componentDidMount() {
        document.title = `Create Quiz | Quizza`;
    }

    render() {
        if(this.state.status === 'fillingDetails') {
            return (
                <>
                    <img style={{marginTop : '90px'}} src={logo} alt="Quizza logo" className='logo-page'/>
                    <div className={styles.details}>
                        <form onSubmit={this.saveDetails} className={styles.quizForm}>
                            <div>
                                <p className={styles.head}>CREATE QUIZ</p>
                            </div>
                            <div>
                                <label htmlFor='qname'>QUIZ NAME :</label> 
                                <input onInput={this.handleInput('name')} required id="qname" type="text" />
                            </div>
                            <div>
                                <label htmlFor='qnos'>NUMBER OF QUESTIONS :</label> 
                                <input onChange={this.handleInput('noOfQuestions')} required id="qnos" type="number" min='1' />
                            </div>
                            <div>
                                <label htmlFor='duration-minutes'>DURATION : </label> 
                                <input onChange={this.handleInput('min')} required id="duration-minutes" type="number" max="60" placeholder="MM"/> :
                                <input onChange={this.handleInput('sec')} required id="duration-seconds" type="number" max="59" placeholder="SS"/>
                            </div>
                            <button disabled={this.state.sending}>CONTINUE</button>
                        </form>
                        {this.state.loading && <div className="loading"></div>}
                    </div>
                </>
            )
        } else if(this.state.status === "fillingQuiz"){
            return(
                <div className={styles.quiz}>
                    <p className={styles.head}>{this.state.name}</p>
                    <div style={{display : 'flex', flexWrap : 'wrap', margin : 'auto', justifyContent : 'center'}}>
                        {Array.from({length : this.state.noOfQuestions}, (item, i) => {
                            return <button onClick = {() => this.handleQuestionChange(i+1)} key ={i} style={{margin : '10px', backgroundColor : this.state.verifiedQuestions.includes(i + 1) ? 'green' : 'red', color : 'white', width : '30px', height : '30px'}}>{i + 1}</button>
                        })}
                    </div>
                    <form ref={elem => this.form = elem} onSubmit={this.submitQuiz}>
                        <div id="questions">
                            <Question inputChange = {this.handleInput} question = {this.state.questions[this.state.questionFilling - 1]} answer = {this.state.answers[this.state.questionFilling - 1]} number = {this.state.questionFilling} />
                            {this.state.error && <p style={{textAlign:'center', color: 'red', fontWeight :'bold'}}>{this.state.error}</p>}
                            <button type = 'button' onClick = {this.saveAndNext} className="btn-quiz-next">NEXT</button>
                            <button className={styles.button} disabled={this.state.sending} type="submit" >SUBMIT QUIZ</button>
                        </div>
                    </form>
                    {this.state.loading && <div className="loading"></div>}
                </div>
            );
    } 
    else if(this.state.status === 'completed')
    return (
        <>
            <img style={{marginTop : '90px'}} src={logo} alt="Quizza logo" className='logo-page'/>
            <div className={styles.complete}>
                <div style={{width : '100%'}}>
                    <p className={styles.head}>Quiz created successfully</p> 
                    <p>Link to take quiz is </p> 
                    <Link target='_blank' to = {`/${this.state.quizId}`} >{`https://quizza.live/${this.state.quizId}`}</Link>
                    <button ref = {elem => this.copyButton = elem} onClick={this.copyToClipboard} className={styles.btnCopy}>{!this.state.linkCopied ? 'Copy to clipboard' : 'Copied!'}</button>
                    <p>Live leaderboard can be seen here : </p> 
                    <Link target = '_blank' to = {`/${this.state.quizId}/leaderboard`} >{`https://quizza.live/${this.state.quizId}/leaderboard`}</Link> 
                </div>
            </div>
        </>
    )
    }
}

export default CreateQuiz;