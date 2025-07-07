import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const SignUp = () => {
  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <div className="input-icon">
            <FaUser />
            <input type="email" id="email" name="email" required />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <div className="input-icon">
            <FaLock />
            <input type="password" id="password" name="password" required />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
