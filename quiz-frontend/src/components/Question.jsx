import React from 'react';

const Question = ({number, question, answer, inputChange}) => {
    let { title, options } = question;
    return(
        <div className="question">
            <p>Question {number}</p>
            <textarea onInput={inputChange('title')} defaultValue={title} className="question-input" placeholder="Question"></textarea>
            <div className="option-row">
                <div className="option">
                    <textarea onInput={inputChange('optionA')} defaultValue={options[0]} placeholder="OPTION A"></textarea>
                </div>
                <div className="option">
                    <textarea onInput={inputChange('optionB')} defaultValue={options[1]} placeholder="OPTION B"></textarea>
                </div>
            </div>
            <div className="option-row">
                <div className="option">
                    <textarea onInput={inputChange('optionC')} defaultValue={options[2]} placeholder="OPTION C"></textarea>
                </div>
                <div className="option">
                    <textarea onInput={inputChange('optionD')} defaultValue={options[3]} placeholder="OPTION D"></textarea>
                </div>
            </div>
            <div>
                <label htmlFor="answer">Choose correct answer</label>
                <select onInput={inputChange('answer')} style={{borderRadius : '6px', padding : '7px', marginLeft :'8px'}} id="answer" className='answers'>
                    <option value=''>Choose Answer</option>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                </select>
            </div>
        </div>
    )
}

export default Question;
