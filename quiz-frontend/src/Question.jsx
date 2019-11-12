import React from 'react';

const Question = ({number}) => {
    return(
        <div className="question">
            <p>Question {number}</p>
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
            </div>
        </div>
    )
}

export default Question;
