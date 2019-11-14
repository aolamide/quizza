import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
  return (
   <nav style={{position : 'fixed', width : '100%', backgroundColor:'white', top : '0', zIndex : '1000', padding: '5px'}}>
       <ul>
           <Link to='/'>
            <li>Home</li>
           </Link>
           <span className="right">
             <Link to='/howitworks'>
              <li>How It Works</li>
            </Link>
            <Link to='/createquiz'>
              <button>Create Quiz</button>
            </Link>
           </span>
       </ul>
   </nav>
  );
}

export default Nav;
