import React from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';

class Nav extends React.Component{
  constructor(){
    super()
    this.state = {
      user : ''
    }
  }

  logout = () => {
    localStorage.removeItem('jwt');
    this.setState({user : ''});
  }

  componentDidMount() {
    let signedIn = isAuthenticated();
    console.log(signedIn);
    if(signedIn) 
    {
      this.setState({user : signedIn.user});
    }
  }

  render() {
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
               {!this.state.user ? 
               <Link to='/login'>
                 <button>Login</button>
               </Link>
               :
               <span className='dropdown' style={{position : 'relative', color: 'grey', display: 'inline-block', borderBottom: '1px dotted black', marginLeft : '13px', marginRight :'7px'}}>
                 Hi, {this.state.user.name.split(' ')[0]}
                 <span className="dropdown-content">
                    <Link to='/createquiz'>Create Quiz</Link>
                    <hr/>
                    <Link onClick={this.logout} to='/'>LogOut</Link>
                 </span>
               </span>
               }
              </span>
          </ul>
      </nav>
     );
  }
}

export default Nav;
