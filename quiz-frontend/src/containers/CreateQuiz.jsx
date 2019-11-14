import React, {Component} from 'react';
import Question from '../components/Question';
import styles from '../css/createquiz.module.css';
import { isAuthenticated } from '../auth';


class CreateQuiz extends Component {
    constructor(){
        super()
        this.state = {
            questions : [],
            answers : [],
            duration : '',
            noOfQuestions : 0,
            status : 'fillingDetails',
            quizId : '',
            sending : false,
            name : '', 
            error : ''
        }
    }
    saveDetails = (e) => {
        e.preventDefault();
        const durationMinutes = document.getElementById('duration-minutes').value;
        const durationSeconds = document.getElementById('duration-seconds').value;
        const noOfQuestions = document.getElementById('qnos').value;
        const duration = {
            min : durationMinutes,
            sec : durationSeconds
        }
        const quizName = document.getElementById('qname').value;
        this.setState({
            name : quizName,
            duration : duration,
            noOfQuestions : noOfQuestions,
            status : 'fillingQuiz'
        });
    }
    saveQuestions = async (e) => {
        e.preventDefault();
        this.setState({sending : true});
        let questions = await document.getElementsByClassName('question');
        let answers = await document.querySelectorAll('select');
        let allQuestions = [];
        let allAnswers = [];
        for(let i = 0; i < questions.length; i++){
            let title = questions[i].children[1].value;
            let optionA = questions[i].children[2].children[0].children[0].value;
            let optionB = questions[i].children[2].children[1].children[0].value;
            let optionC = questions[i].children[3].children[0].children[0].value;
            let optionD = questions[i].children[3].children[1].children[0].value;
            let options =[optionA, optionB, optionC, optionD];
            let singleQuestion = {title : title, options : options};
            allQuestions.push(singleQuestion);
        }
        for(let i = 0; i < answers.length; i++) {
            allAnswers.push(answers[i].value);
        }
        this.setState({
            questions : allQuestions,
            answers : allAnswers
        });
        if(window.confirm(`Are you sure you want to submit ? `)) {
            this.submitQuiz();
        } else {
            this.setState({sending : false});
        }
    }

    submitQuiz = () => {
        this.setState({error : ''});
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
                this.setState({error : data.error});
                return;
            }
            this.setState({quizId : data.quizId, status : 'completed'})
        })
        .catch(err => console.log(err));
    }
    componentDidMount() {
        document.title = `Create Quiz | Quizza`;
    }

    render() {
        if(this.state.status === 'fillingDetails') {
            return (
                <div className={styles.details}>
                    <form onSubmit={this.saveDetails} className={styles.quizForm}>
                        <div>
                            <p className={styles.head}>CREATE QUIZ</p>
                        </div>
                        <div>
                            <label>QUIZ NAME :</label> 
                            <input required id="qname" type="text" />
                        </div>
                        <div>
                            <label>NUMBER OF QUESTIONS :</label> 
                            <input required id="qnos" type="number" min='3' />
                        </div>
                        <div>
                            <label>DURATION : </label> 
                            <input required id="duration-minutes" type="number" max="60" placeholder="MM"/> :
                            <input required id="duration-seconds" type="number" max="59" placeholder="SS"/>
                        </div>
                        <button disabled={this.state.sending}>CONTINUE</button>
                    </form>
                </div>
            )
        } else if(this.state.status === "fillingQuiz"){
            return(
                <div className={styles.quiz}>
                    <p className={styles.head}>{this.state.name}</p>
                    <form onSubmit={this.saveQuestions}>
                        <div id="questions">
                            {
                                Array.from({length : this.state.noOfQuestions}, (item, i) => {
                                    return <Question key={i} number = {i + 1} />;
                                })
                            }
                        </div>
                        {this.state.error && <p style={{textAlign:'center', color: 'red', fontWeight :'bold'}}>{this.state.error}</p>}
                        <button className={styles.button} disabled={this.state.sending} type="submit" >SUBMIT QUIZ</button>
                    </form>
                </div>
            );
    } else if(this.state.status === 'completed')
    return (
        <div className={styles.complete}>
            <div>
                <p className={styles.head}>Quiz created successfully</p> 
                <p>Link to take quiz is <a href={`https://quizza.live/#/${this.state.quizId}`}>{`https://quizza.live/${this.state.quizId}`}</a></p>
                <p>Live leaderboard can be seen here : <a href={`https://quizza.live/${this.state.quizId}/leaderboard`}>{`https://quizza.live/${this.state.quizId}/leaderboard`}</a> </p>
            </div>
        </div>
    )
    }
}

export default CreateQuiz;