import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setToken, setUser } from "../actions";
import './Authorization.css';

function SignUpPage({ onSetToken, onSetUser }) {

  const [errorMessage, setErrorMessage] = useState("");

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  let navigate = useNavigate();

  const onSignUpClicked = async () => {
    const body = JSON.stringify({ email: emailValue, password: passwordValue });
    const response = await fetch("/api/signup", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body,
    });
    const resp = await response.json();
    console.log(resp);
    const { token } = resp;

    onSetToken(token);
    const encodedPayload = token.split(".")[1];
    const user = JSON.parse(atob(encodedPayload));
    onSetUser(user);
    navigate("/");
  };

  return (
    <div className="content-container">
      <h1>Sign Up</h1>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <input
        className="inputClass"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        placeholder="someone@gmail.com"
      />
      <input
        className="inputClass"
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="password"
      />
      <input
        className="inputClass"
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="password"
      />
      <hr />
      <button
        className="buttonClass"
        disabled={
          !emailValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}
      >
        Sign Up
      </button>
      <button className="buttonClass" onClick={() => navigate("/login")}>
        Already have an account? Log In
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
 
});

const mapDispatchToProps = (dispatch) => ({
  onSetToken: token => dispatch(setToken(token)),
  onSetUser: user => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
