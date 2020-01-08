import React from 'react';
import  { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './containers/Home';
import HowItWorks from './containers/HowItWorks';
import QuizPage from './containers/QuizPage';
import CreateQuiz from './containers/CreateQuiz';
import LeaderBoard from './containers/LeaderBoard';
import LoginAndSignup from './components/LoginAndSignup';
import { isAuthenticated } from './auth';
import './css/App.css';
import PasswordResetPage from './containers/PasswordResetPage';


const NavRoute = ({exact, path, component: Component}) => (
  <Route exact={exact} path={path} render={(props) => (
    <div>
      <Nav />
      <Component {...props}/>
    </div>
  )}/>
)

const PrivateRoute = ({ component: Component, ...rest }) => (  
<Route {...rest} render={props => (    
    isAuthenticated() ? 
    ( <div>
        <Nav />
        <Component {...props}/>
      </div> 
    ) 
    : 
    (<Redirect to={{pathname: '/login', state: { from: props.location }}}/> )  
    )}
  />
)

function App() {
  return (
      <Router>
        <Switch>
            <NavRoute exact path='/' component={Home} />
            <NavRoute path='/howitworks' component={HowItWorks} />
            <PrivateRoute path='/createquiz' component={CreateQuiz} />
            <Route exact path='/login' component={LoginAndSignup} />
            <Route exact path='/:quizId' component={QuizPage} />
            <NavRoute path='/:quizId/leaderboard' component={LeaderBoard} />
            <Route path='/reset/:token' component={PasswordResetPage} />
        </Switch>
      </Router>
  );
}

export default App;
