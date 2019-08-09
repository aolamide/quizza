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
        div.innerHTML = '<textarea></textarea><input placeholder="OPTION A"><input placeholder="OPTION B"><input placeholder="OPTION C"><input placeholder="OPTION D"><div><label htmlFor="answer">Choose correct answer</label><select id="answer" class="answers"><option disabled>Choose Answer</option><option value="A">Option A</option><option value="B">Option B</option><option value="C">Option C</option><option value="D">Option D</option></select></div>';
        div.classList.add('question');
       const questionsBox = document.getElementById('questions');
       questionsBox.appendChild(div);
    }

    saveQuestions = async () => {
        let questions = await document.getElementsByClassName('question');
        console.log(questions)
        let answers = await document.querySelectorAll('select');
        const creator = document.getElementById('name').value;
        const duration = document.getElementById('duration').value;
        const expires = document.getElementById('expires').value;
        let allQuestions = [];
        let allAnswers = [];
        for(let i = 0; i < questions.length; i++){
            let title = questions[i].children[0].value;
            let optionA = questions[i].children[1].value;
            let optionB = questions[i].children[2].value;
            let optionC = questions[i].children[3].value;
            let optionD = questions[i].children[4].value;
            let options =[optionA, optionB, optionC, optionD];
            let singleQuestion = {title : title, options : options};
            allQuestions.push(singleQuestion);
        }
        for(let i = 0; i < answers.length; i++) {
            allAnswers.push(answers[i].value);
        }
        this.setState({
            questions : allQuestions,
            answers : allAnswers,
            creator : creator,
            duration : duration,
            expires : expires
        });
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

    render() {
        return(
            <div>
                <div>
                    <label>Name : </label> <input id="name" type="text"/>
                </div>
                <div>
                    <label>Duration (in seconds) : </label> <input id="duration" type="number" min="1"/>
                </div>
                <div>
                    <label>Expiry Date : </label> <input id="expires" type="date" min="19/07/2019"/>
                </div>
                <div id="questions">
                    <div className="question">
                        <textarea></textarea>
                        <input placeholder="OPTION A" />
                        <input placeholder="OPTION B" />
                        <input placeholder="OPTION C" />
                        <input placeholder="OPTION D" />
                        <div>
                            <label htmlFor="answer">Choose correct answer</label>
                            <select id="answer" className='answers'>
                                <option disabled>Choose Answer</option>
                                <option value="A">Option A</option>
                                <option value="B">Option B</option>
                                <option value="C">Option C</option>
                                <option value="D">Option D</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button onClick={this.newQuestion} >ADD</button>
                <button onClick={this.saveQuestions}>SAVE</button>
                <button onClick={this.submitQuiz}>SUBMIT QUIZ</button>
            </div>
        );
    }
}

export default CreateQuiz;