import React, {Component} from 'react';
import Question from './Question';


class CreateQuiz extends Component {
    constructor(){
        super()
        this.state = {
            questions : [],
            answers : [],
            creator : null,
            duration : null,
            expires : null,
            noOfQuestions : 3,
            status : 'fillingDetails',
            quizId : '',
            sending : false
        }

    }
    saveDetails = (e) => {
        e.preventDefault();
        const creatorName = document.getElementById('name').value;
        const durationMinutes = document.getElementById('duration-minutes').value;
        const durationSeconds = document.getElementById('duration-seconds').value;
        const noOfQuestions = document.getElementById('qnos').value;
        const duration = {
            min : durationMinutes,
            sec : durationSeconds
        }
        const creatorEmail = document.getElementById('email').value;
        const quizName = document.getElementById('qname').value;
        const creator = {
            name : creatorName,
            email : creatorEmail
        }
        this.setState({
            name : quizName,
            creator : creator,
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
        }
    }

    submitQuiz = async () => {
        const response = await fetch('https://lalaquiz.herokuapp.com/api/v1/newquiz', {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        });
        const res = await response.json();
        this.setState({quizId : res.quizId, status : 'completed'})
    }
    componentDidMount() {
        window.addEventListener('click', e => {
            if(e.target.classList.contains('delete-question')) {
                e.target.parentNode.parentNode.remove()
            }
        })
        document.title = `Create Quiz | Quizza`;
    }

    render() {
        if(this.state.status === 'fillingDetails') {
            return (
                <div>
                    <form onSubmit={this.saveDetails}>
                        <div>
                            <label>Name : </label> <input required id="name" type="text"/>
                        </div>
                        <div>
                            <label>Email Address : </label> <input required id="email" type="email" />
                        </div>
                        <div>
                            <label>Duration : </label> <input required id="duration-minutes" type="number" max="60" placeholder="MM"/> :
                            <input required id="duration-seconds" type="number" max="59" placeholder="SS"/>
                        </div>
                        <div>
                            <label>QUIZ NAME :</label> <input required id="qname" type="text" />
                        </div>
                        <div>
                            <label>NUMBER OF QUESTIONS :</label> <input required id="qnos" type="number" min='5' />
                        </div>
                        <button disabled={this.state.sending}>CONTINUE</button>
                    </form>
                </div>
            )
        } else if(this.state.status === "fillingQuiz"){
            return(
                <div>
                    <form onSubmit={this.saveQuestions}>
                        <div id="questions">
                            {
                                Array.from({length : this.state.noOfQuestions}, (item, i) => {
                                    return <Question number = {i + 1} />;
                                })
                            }
                        </div>
                        <button disabled={this.state.sending} type="submit" >SUBMIT QUIZ</button>
                    </form>
                </div>
            );
    } else if(this.state.status === 'completed')
    return (
        <div>
           <p>Quiz created successfully</p> 
           <p>Link to take quiz is <a href={`https://quizza.live/#/${this.state.quizId}`}>{`https://quizza.live/#/${this.state.quizId}`}</a></p>
        </div>
    )
    }
}

export default CreateQuiz;