import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
  return (
   <nav>
       <ul>
           <Link to='/'>
            <li>Home</li>
           </Link>
           <Link to='/about'>
            <li>About</li>
           </Link>
           <Link to='/contact'>
            <li>Contact</li>
           </Link>
           <Link to={`/quiz/5d304edf9f12db292c6c4f82`}>
            <li>Quiz</li>
           </Link>
           <Link to='/createquiz'>
            <li>Create Quiz</li>
           </Link>
       </ul>
   </nav>
  );
}

export default Nav;
