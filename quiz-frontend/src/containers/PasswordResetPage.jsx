import React, {Component} from 'react';

class PasswordResetPage extends Component {
    state = {
        loading : true,
        password : '',
        cpassword : ''
    }
    submitForm = e => {
        this.setState({validationnError : ''})
        let { password, cpassword } = this.state;
        e.preventDefault();
        if(!(password.trim() && cpassword.trim())) this.setState({validationError : 'Fill noth fiields'})
        else if(password.trim() !== cpassword.trim()) this.setState({validationError : 'Passwords do not match!'})
        else {
            this.setState({loading : true})
            const token = this.props.match.params.token;
            fetch(`https://lalaquiz.herokuapp.com/api/v1/updatePassword?token=${token}`, {
                method : 'PUT',
                headers : {
                    Accept : 'applicatio/jsoon',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({password, name : this.state.user.name})
            })
            .then(res => res.json())
            .then(data => {
                if(data.error) this.setState({validationError : data.error})
                else {
                    this.setState({successMessage :data.message})
                }
                this.setState({loading : false})
            })
            .catch(err => console.log('error'))
            }
    }
    onInputChange = name => e => {
        this.setState({[name] : e.target.value})
    }
    componentDidMount() {
        const token = this.props.match.params.token;
        fetch(`https://lalaquiz.herokuapp.com/api/v1/reset?token=${token}`)
        .then(res => res.json())
        .then(data => {
            if(data.error) this.setState({error : data.error})
            else {
                this.setState({user : data.user})
            }
            this.setState({loading : false})
        })
        .catch(err => console.log('error'))
    }
    render() {
        if(this.state.user) return (
            <div className='auth'>
                <form ref={form => this.form = form} onSubmit={this.submitForm}>
                    <div className="formgroup">
                        <label htmlFor="password">Password</label>
                        <input required id="password" onChange={this.onInputChange('password')} type="password" placeholder="Password"/>
                    </div>
                    <div className="formgroup">
                        <label htmlFor="c-password">Confirm Password</label>
                        <input required id="c-password" onChange={this.onInputChange('cpassword')} type="password" placeholder="Confirm password"/>
                    </div>
                    <div>{
                        this.state.loader ? 
                        <div className="loader"></div> 
                        : 
                        <button style={{color : 'white', backgroundColor :'#07323f', padding:'8px'}} type="submit">Reset Password</button> 
                    }</div>
                    <div><span>{this.state.validationError}</span></div>
                </form>
                {this.state.loading && <div className="loading"></div> }
            </div>
        )
        else if(this.state.successMessage) return <div>{this.state.successMessage}</div>
        else if(this.state.error) return <div>{this.state.error}</div>
        return <div className="loading"></div>
    }
}

export default PasswordResetPage;