import React from 'react';
import { Link } from 'react-router-dom';

require('../../../src/stylesheets/style.scss');


const Signup = ({ signup }) => (
  <div>
    <header>
      <ul>
        <li id="logo"><a href="#">PostIt</a></li>
        <li className="nav-item"><Link to="/login">LOGIN</Link></li>
        <li className="nav-item"><Link to="/">Why PostIt?</Link></li>
      </ul>
    </header>
    <section>
      <div className="auth-box">
        <input type="text" id="username" placeholder="Username" />
        <input type="text" id="email" placeholder="Email" />
        <input type="password" id="password" placeholder="Password" />
        <input type="password" id="confirm_password" placeholder="Confirm Password" />
        <button onClick={(e) => {
            e.preventDefault();
            const usernameValue = document.getElementById('username').value;
            const emailValue = document.getElementById('email').value;
            const passwordValue = document.getElementById('password').value;
            const confirmPasswordValue = document.getElementById('confirm_password').value;
            if (passwordValue === confirmPasswordValue) {
                signup({
                    username: usernameValue,
                    email: emailValue,
                    password: passwordValue
                });
            } else {
                alert('confirm password doesn"t match password');
            }
            }}
        >SIGN UP
        </button>
      </div>
      <button>LOGIN</button>
    </section>
  </div>
);

export default Signup;
