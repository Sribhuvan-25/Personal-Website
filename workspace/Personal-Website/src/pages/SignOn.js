import React from 'react';
import './SignOn.css';

class SignOn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle sign on logic here
  }

  render() {
    return (
      <div className="sign-on-container">
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="email" name="email" onChange={this.handleInputChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Sign On" />
        </form>
      </div>
    );
  }
}

export default SignOn;