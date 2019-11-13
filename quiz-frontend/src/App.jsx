import React from 'react';
import  { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './containers/Home';
import HowItWorks from './containers/HowItWorks';
import QuizPage from './containers/QuizPage';
import CreateQuiz from './containers/CreateQuiz';
import LeaderBoard from './containers/LeaderBoard';
import './css/App.css';


const NavRoute = ({exact, path, component: Component}) => (
  <Route exact={exact} path={path} render={(props) => (
    <div>
      <Nav />
      <Component {...props}/>
    </div>
  )}/>
)

function App() {
  return (
      <Router>
        <Switch>
            <NavRoute exact path='/' component={Home} />
            <NavRoute path='/howitworks' component={HowItWorks} />
            <NavRoute path='/createquiz' component={CreateQuiz} />
            <Route exact path='/:quizId' component={QuizPage} />
            <NavRoute path='/:quizId/leaderboard' component={LeaderBoard} />
        </Switch>
      </Router>
  );
}

export default App;
