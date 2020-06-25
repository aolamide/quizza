import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import logo from '../images/quizza.png'
import { authenticate } from '../auth';
import apiBase from '../apiBase';



const AdminLogin = () => {
  let [credentials, setCredentials] = useState({
    email : '',
    password : ''
  });
  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let [redirect, setRedirect] = useState(false);
  let handleChange = e => {
    credentials[e.target.name] = e.target.value;
    setCredentials(credentials);
  }
  let submitForm = e => {
    e.preventDefault();
    fetch(`${apiBase}/admin/login`, {
        method : 'POST',
        headers : {
            Accept : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(credentials)
    })
    .then(res => res.json())
    .then(data => {
        if(data.error) setError(data.error)
        else {
          authenticate(data, () => {
            setRedirect(true)
          })
        }
    })
    .catch(err => {
      console.log(err);
      setError('Login failed, please retry');
    })
    .finally(() => {
      setLoading(false);
    })
  }
  if(redirect) {
    return <Redirect to='/admin/dashboard' />
  }
  return (
    <>
      <div className='auth'>
          <Link to='/'><img style={{marginBottom : '75px'}} src={logo} alt="Quizza logo" className='logo-page'/></Link>
          <form onSubmit={submitForm}>
              {error && <p style={{color : 'red', textAlign: 'center'}}>{error}</p>}
              <div className="formgroup">
                  <label htmlFor="email">Email</label>
                  <input name="email" required onChange={handleChange} type="email" id="email" placeholder="johndoe@gmail.com"/>
              </div> 
              <div className="formgroup">
                  <label htmlFor="password">Password</label>
                  <input name="password" required id="password" onChange={handleChange} type="password" placeholder="password"/>
              </div>
              <div>{
                  loading ? 
                  <div className="loader"></div> 
                  : 
                  <button style={{color : 'white', backgroundColor :'#07323f', padding:'8px'}} type="submit">Login</button> 
              }</div>
          </form>
      </div>
      {loading && <div className="loading"></div> }
  </>
  )
}

export default AdminLogin;