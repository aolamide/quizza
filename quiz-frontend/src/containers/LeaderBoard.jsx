import React from 'react'

class LeaderBoard extends React.Component {
    constructor({match}){
        super()
        this.state = {
            quizId : match.params.quizId,
            quiz : null,
            quizCreator : null,
        }
    }
   
    componentDidMount() {
        fetch(`http://localhost:5050/api/v1/quiz/${this.state.quizId}/leaderboard`)
        .then(res => res.json())
        .then(quiz => {
            const { name, takenBy, created, creator} = quiz;
            this.setState({
                quiz : {name, takenBy, created},
                quizCreator : creator
            })
            document.title = `${name} Leaderboard | Quizza`;
        })
    }


    render() {
        
        if(this.state.quiz) {
          const {takenBy, name, created} = this.state.quiz;
          const {name : creatorName} =   this.state.quizCreator;
          return (
            <div style={{padding : '10px'}}>
                <h3>{name}</h3>
                <h4>Created by {creatorName} on {new Date(created).toDateString()}</h4>
                <table>
                    <thead>
                        <tr>
                           <td>Name</td>
                            <td>Score</td> 
                        </tr>
                    </thead>
                    <tbody>
                    {
                        takenBy
                        .sort((a,b) => Number(b.score) - Number(a.score))
                        .map(user => 
                            (<tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.score}</td>
                            </tr>))
                    }
                    </tbody>
                </table>
            </div>
        )
        }
        return (
            <div>
                <h3>Quiz Not Found </h3>
                <p>This quiz might have expired</p>
            </div>
        )
    }
}

export default LeaderBoard;