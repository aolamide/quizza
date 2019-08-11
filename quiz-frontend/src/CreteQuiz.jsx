import React, {Component} from 'react';


class CreateQuiz extends Component {
    constructor(){
        super()
        this.state = {
            questions : [],
            answers : [],
            creator : null,
            duration : null,
            expires : null
        }

    }

    newQuestion = () => {
        const div = document.createElement('div');
        div.innerHTML = '<textarea required class="question-input" placeholder="Question"></textarea><div class="option-row"><div class="option"><textarea required placeholder="OPTION A"></textarea></div><div class="option"><textarea required placeholder="OPTION B"></textarea></div></div><div class="option-row"><div class="option"><textarea required placeholder="OPTION C"></textarea></div><div class="option"><textarea required placeholder="OPTION D"></textarea></div></div><div><label for="answer">Choose correct answer</label><select id="answer" class="answers"><option disabled>Choose Answer</option><option value="A">Option A</option><option value="B">Option B</option><option value="C">Option C</option><option value="D">Option D</option></select><button title="Delete Question" class="delete-question">DELETE</button></div>';
        div.classList.add('question');
       const questionsBox = document.getElementById('questions');
       questionsBox.appendChild(div);
    }

    saveQuestions = async (e) => {
        e.preventDefault();
        let questions = await document.getElementsByClassName('question');
        console.log(questions)
        let answers = await document.querySelectorAll('select');
        const creatorName = document.getElementById('name').value;
        const duration = document.getElementById('duration').value;
        const creatorEmail = document.getElementById('email').value;
        const quizName = document.getElementById('qname').value;
        const creator = {
            name : creatorName,
            email : creatorEmail
        }
        let allQuestions = [];
        let allAnswers = [];
        for(let i = 0; i < questions.length; i++){
            let title = questions[i].children[0].value;
            let optionA = questions[i].children[1].children[0].children[0].value;
            let optionB = questions[i].children[1].children[1].children[0].value;
            let optionC = questions[i].children[2].children[0].children[0].value;
            let optionD = questions[i].children[2].children[1].children[0].value;
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
        const response = await fetch('http://localhost:8080/api/v1/newquiz', {
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
                        <label>Duration (in seconds) : </label> <input required id="duration" type="number" min="1"/>
                    </div>
                    <div>
                        <label>QUIZ NAME :</label> <input required id="qname" type="text" />
                    </div>
                    <div id="questions">
                        <div className="question">
                            <textarea required className="question-input" placeholder="Question"></textarea>
                            <div className="option-row">
                                <div className="option">
                                    <textarea required placeholder="OPTION A"></textarea>
                                </div>
                                <div className="option">
                                    <textarea required placeholder="OPTION B"></textarea>
                                </div>
                                
                            </div>
                            <div className="option-row">
                                <div className="option">
                                    <textarea required placeholder="OPTION C"></textarea>
                                </div>
                                <div className="option">
                                    <textarea required placeholder="OPTION D"></textarea>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="answer">Choose correct answer</label>
                                <select id="answer" className='answers'>
                                    <option disabled>Choose Answer</option>
                                    <option value="A">Option A</option>
                                    <option value="B">Option B</option>
                                    <option value="C">Option C</option>
                                    <option value="D">Option D</option>
                                </select>
                                <button title="Delete Question" className="delete-question">DELETE</button>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.newQuestion} >ADD</button>
                    <button type="submit" >SUBMIT QUIZ</button>
                    {/* <button onClick={this.submitQuiz}>SUBMIT QUIZ</button> */}
                </form>
            </div>
        );
    }
}

export default CreateQuiz;