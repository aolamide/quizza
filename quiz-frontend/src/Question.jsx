import React from 'react'



class Question extends React.Component{
    constructor(props) {
        super(props);
    }
    
  

    render() {
        const { question } = this.props;
        return (
            <div>
                <div>{question.title}</div>
                <div className="option-row">
                    <div className="option">
                        <input ref={ele => this.elem = ele} type="radio" name={`q${question._id}`} value="A" id={`opt${question._id}A`}/>
                        <label htmlFor={`opt${question._id}A`}>{question.options[0]}</label>
                    </div>
                    <div className="option">
                        <input type="radio" name={`q${question._id}`} value="B" id={`opt${question._id}B`}/>
                        <label htmlFor={`opt${question._id}B`}>{question.options[1]}</label>
                    </div>
                </div>
                <div className="option-row">
                    <div className="option">
                        <input type="radio" name={`q${question._id}`} value="C" id={`opt${question._id}C`}/>
                        <label htmlFor={`opt${question._id}C`}>{question.options[2]}</label>
                    </div>
                    <div className="option">
                        <input type="radio" name={`q${question._id}`} value="D" id={`opt${question._id}D`}/>
                        <label htmlFor={`opt${question._id}D`}>{question.options[3]}</label>
                    </div>
                </div>
            </div>
        )
    }
    
}



export default Question;