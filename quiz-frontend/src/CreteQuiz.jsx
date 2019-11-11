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
            totalQuestions : 3
        }

    }
    saveQuestions = async (e) => {
        e.preventDefault();
        let questions = await document.getElementsByClassName('question');
        let answers = await document.querySelectorAll('select');
        const creatorName = document.getElementById('name').value;
        const durationMinutes = document.getElementById('duration-minutes').value;
        const durationSeconds = document.getElementById('duration-seconds').value;
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
            name : quizName,
            questions : allQuestions,
            answers : allAnswers,
            creator : creator,
            duration : duration
        });
        if(window.confirm(`Are you sure you want to submit ? \n Quiz contains ${allQuestions.length} questions `)) {
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
        alert(res);
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
        return(
            <div>
                <form onSubmit={this.saveQuestions}>
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
                    <div id="questions">
                        {
                            Array.from({length : this.state.totalQuestions}, (item, i) => {
                                return <Question number = {i + 1} />;
                            })
                        }
                    </div>
                    <button type="submit" >SUBMIT QUIZ</button>
                </form>
            </div>
        );
    }
}

export default CreateQuiz;