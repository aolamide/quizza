import React from 'react';
import {Link} from 'react-router-dom';
import {isAuthenticated} from '../auth';
import logo from '../images/quizza.png';

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
    if(signedIn) 
    {
      this.setState({user : signedIn.user});
    }
  }

  render() {
    return (
      <nav style={{position : 'fixed', width : '100%', backgroundColor:'white', top : '0', zIndex : '800', padding: '5px', boxSizing :'border-box'}}>
          <ul>
              <Link style={{paddingLeft: '15px'}} to='/'>
               <img height='auto' width='30px' src={logo} alt="Quizza logo"/>
              </Link>
              <span className="right" style={{lineHeight:'30px'}}>
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
