import React from 'react';
import {authenticate} from '../auth';
import { Redirect } from 'react-router-dom';
import API_BASE from '../apiBase.js';
import logo from '../images/quizza.png'
import { Link } from 'react-router-dom' 

class LoginAndSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            name : '',
            password : '',
            pageStatus : 'login',
            error : '',
            successMessage : '',
            loading : false,
            redirectToReferer : false
        }
    }

    onInputChange = name => e => {
        this.setState({[name] : e.target.value, error : '', message :''});
    }

    changeFormState = () => {
        this.state.pageStatus === 'register' ? this.setState({pageStatus : 'login'}) : this.setState({pageStatus : 'register'});
        this.form.reset();
        this.setState({error : '', message :''});
    }

    register = () => {
        fetch(`${API_BASE}/register`, {
            method : 'POST',
            headers : {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                name : this.state.name,
                email : this.state.email,
                password : this.state.password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) this.setState({error : data.error})
            else this.setState({successMessage : data.message}, () => this.form.reset());
            this.setState({loading : false});
        })
        .catch(err => {
            console.log(err);
            this.setState({ error : 'Login failed, please retry', loading : false})
        })
    }

    login = () => {
        fetch(`${API_BASE}/login`, {
            method : 'POST',
            headers : {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : this.state.email,
                password : this.state.password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) this.setState({error : data.error, loading : false})
            else {
                authenticate(data, () => {
                    this.setState({redirectToReferer : true});
                })
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({ error : 'Login failed, please retry', loading : false})
        })
    }
    requestPasswordReset = (e) => {
        e.preventDefault();
        this.setState({loading : true, resetError : '', resetMessage :''});
        fetch(`${API_BASE}/forgotPassword`, {
            method : 'POST',
            headers : {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : this.email.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) this.setState({resetError : data.error})
            else {
                this.setState({resetMessage : data.message})
            }
            this.setState({loading : false})
        })
        .catch(err => {
            console.log(err);
            this.setState({ resetError : 'Login failed, please retry', loading : false})
        })
    }
    displayModal = () => {
        this.popup.style.display = "flex";
    }

    closeModal = () => {
        this.popup.style.display = 'none';
    }
    submitForm = e => {
        this.setState({loading : true})
        e.preventDefault();
        this.state.pageStatus === 'register' ? this.register() : this.login()
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        if(this.state.redirectToReferer) {
            return <Redirect to={from} />
        }
        return (
            <>
                <div className='auth'>
                    <Link to='/'><img style={{marginBottom : '75px'}} src={logo} alt="Quizza logo" className='logo-page'/></Link>
                    <form ref={form => this.form = form} onSubmit={this.submitForm}>
                        {this.state.error && <p style={{color : 'red', textAlign: 'center'}}>{this.state.error}</p>}
                        {this.state.successMessage && <p style={{color: 'green', textAlign: 'center'}}>{this.state.successMessage}</p>}
                        {this.state.pageStatus === 'register' &&
                            <div className="formgroup">
                                <label htmlFor="name">Name</label>
                                <input required id="name" onChange={this.onInputChange('name')} type="text" placeholder="John Doe"/>
                            </div>
                        }
                        <div className="formgroup">
                            <label htmlFor="email">Email</label>
                            <input required onChange={this.onInputChange('email')} type="email" id="email" placeholder="johndoe@gmail.com"/>
                        </div> 
                        <div className="formgroup">
                            <label htmlFor="password">Password</label>
                            <input required id="password" onChange={this.onInputChange('password')} type="password" placeholder="password"/>
                        </div>
                        <div>{
                            this.state.pageStatus === 'login' && 
                            <button type='button' onClick={this.displayModal} className='btnForgot bold'>Forgot Password?</button>
                        }</div>
                        <div>{
                            this.state.loading ? 
                            <div className="loader"></div> 
                            : 
                            <button style={{color : 'white', backgroundColor :'#07323f', padding:'8px'}} type="submit">{this.state.pageStatus === 'login' ? 'Login' : 'Register'}</button> 
                        }</div>
                        <p style={{textAlign: 'center', marginBottom : '5px'}}>{this.state.pageStatus === 'login' ? 'Don\'t have an account ?' : 'Already Registered ?'}</p>
                        <button className='btn-auth' type="button" onClick={this.changeFormState}>{this.state.pageStatus === 'login' ? 'Register' : 'Login'}</button>
                    </form>
                </div>
                <div ref = {elem => this.popup = elem} className="popup">
                    <button type='button' onClick={this.closeModal} className='btn-close-popup'>X</button>
                    <form onSubmit={this.requestPasswordReset}>
                        <p>Enter your registered email address and we will send you a link to reset your password</p>
                        <input style={{width : '200px'}} required ref={elem => this.email = elem} type="email" placeholder="me@example.com"/>
                        <button type="submit" >Send password reset email</button>
                        <p>{this.state.resetError || ''}</p>
                        <p>{this.state.resetMessage || ''}</p>
                    </form>
                </div>
                {this.state.loading && <div className="loading"></div> }
            </>
        )
    }
}

export default LoginAndSignup;