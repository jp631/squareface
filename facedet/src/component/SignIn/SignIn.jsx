import React, { Component } from "react";

class SignIn extends Component{
  constructor(props){
    super(props)
    this.state = {
      signEmail: '',
      signPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signEmail: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({signPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signEmail,
        password: this.state.signPassword
      })
    })
    .then(response => response.json())
    .then( user =>{
      if(user.id) {
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
  }
  
  render(){

  return (
    <div>
      <main className="pa4 black-80">
        <div className="measure center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick = {this.onSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3">
            <a href="#0" className="f6 link dim black db" onClick={()=> this.props.onRouteChange('register')}>
              Register
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
}


export default SignIn;
