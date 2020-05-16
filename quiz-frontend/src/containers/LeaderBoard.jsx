import React from 'react';
import API_BASE from '../apiBase.js';
import {Link} from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { Helmet } from 'react-helmet';

class LeaderBoard extends React.Component {
    constructor({match}){
        super()
        this.state = {
            loading : true,
            noResult : false,
            quizId : match.params.quizId,
            quiz : null,
            quizCreator : null,
        }
    }
   
    componentDidMount() {
        let auth = isAuthenticated();
        let token = '';
        if(auth){ token = auth.token};
        fetch(`${API_BASE}/quiz/${this.state.quizId}/leaderboard`, {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({token})
        })
        .then(res => res.json())
        .then(quiz => {
            if(!quiz.error) {
                const { name, takenBy, created, creator} = quiz;
                this.setState({
                    loading : false,
                    quiz : {name, takenBy, created},
                    quizCreator : creator
                })
            }
            else {
                this.setState({loading : false, noResult : true, error : quiz.error})
            }
        })
    }


    render() {
        if(this.state.loading) return <div className='loading'></div>
        else if(this.state.quiz) {
          const {takenBy, name, created} = this.state.quiz;
          const {name : creatorName} =   this.state.quizCreator;
          return (
            <>
                <Helmet>
                    <title>{name}'s Leaderboard | Quizza</title>
                    <meta name="description" content={`Leaderboard for Quizza quiz ${name}. Quizza is a platform that allows you create fun quizzes and share with friends to take.`} />
                </Helmet>
                <div style={{minHeight : 'calc(100vh - 105px)',padding : '10px', marginTop : '50px', display:'flex', flexDirection:'column', alignItems : 'center'}}>
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
                <div className='textCenter underline bold'>
                    <Link to='/createquiz' target='_blank'>Create your own quiz</Link>
                </div>
                <div className='textCenter'>
                    <em>Quizza was developed by <a style={{color:'brown'}} href='https://twitter.com/olamideaboyeji' target='_blank' rel="noopener noreferrer">Olamide Aboyeji</a></em>
                </div>
            </>
        )
        }
        else if(this.state.noResult) return (
            <div className='textCenter' style={{marginTop : '140px'}}>
                <h3>{this.state.error} </h3>
            </div>
        )
        return <div></div>
    }
}

export default LeaderBoard;