import React from 'react'
import Question from './Question';

class Questions extends React.Component {
    constructor(props) {
        super(props)
        // console.log(props);
    }

    render() {
        console.log(this.props)
        return (
           <div>
                {this.props.questions.map(question => <Question key={question._id}  question = {question} />)}
            </div> 
        )
    }
}

export default Questions;