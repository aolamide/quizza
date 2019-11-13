import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
  return (
   <nav>
       <ul>
           <Link to='/'>
            <li>Home</li>
           </Link>
           <span className="right">
             <Link to='/howitworks'>
              <li>How It Works</li>
            </Link>
            <Link to='/createquiz'>
              <li>Create Quiz</li>
            </Link>
           </span>
       </ul>
   </nav>
  );
}

export default Nav;
