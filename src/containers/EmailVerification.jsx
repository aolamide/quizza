import React, { useEffect, useState } from "react"
import { Redirect } from "react-router";
import API_BASE from "../apiBase";
import { isAuthenticated } from "../auth";

const EmailVerification = (props) => {
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() =>{
    const { token, email } = props.match.params;
    if(!token || !email) return setError('Invalid link');
    fetch(`${API_BASE}/verify?token=${token}&email=${email}`, {
      method : 'PUT'
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) setError(data.error);
      else {
        const jwt = isAuthenticated();
        if(jwt && jwt.user.email === email) {
          jwt.user.isVerified = true;
          localStorage.setItem('jwt', JSON.stringify(jwt));
        }
        setSuccess(true);
        setTimeout(() => setVerified(true), 2000);
      }
    })
    .catch(err => setError('Network error, refresh.'))
  }, [])
  if(verified) return <Redirect to='/createquiz' />
  return (
    <div style={{marginTop : '90px'}}>
      {(!error && !success) ? 'Verifying...' : ''}
      {error ? error : '' }
      {success ? `${props.match.params.email} verified. Redirecting...` : ''}
    </div>
  )
}

export default EmailVerification