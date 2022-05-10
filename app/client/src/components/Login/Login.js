import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import store from "../../store";

function Login() {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const isLoggedIn = store.getState().auth;

  useEffect(() => {
    if(isLoggedIn.isLoggedIn) {
      navigate("/admin");
    } 
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(login(user, password))
      .then(() => {
        navigate("/admin");
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="login-form">
      <h3 className="login-title">Anmelden</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Benutzername</label>
          <input 
            type="text"
            name="username"
            required
            onChange={(e) => setUser(e.target.value)}
            />
        </div>
        <div className="input-container">
          <label>Passwort</label>
          <input 
            type="password"
            name="pass"
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;
  return {
      isLoggedIn
  };
};

export default connect(mapStateToProps)(Login);