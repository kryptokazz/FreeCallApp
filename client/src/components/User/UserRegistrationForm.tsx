import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import './UserRegistrationForm.css';  // Assuming this is your styling file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const UserRegistrationForm = () => {
  const userRef = useRef();
  const pwdRef = useRef();
  const confirmPwdRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validName && validPwd && validMatch) {
      setSuccess(true);
      // You can perform additional actions here, like submitting the form data to a server
    } else {
      setErrMsg('Please fix the errors in the form');
    }
  };

  return (
    <div className="container">
      <div className="branding-section">
        <h1>Welcome to Our Service</h1>
      </div>
      <div className="form-section">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                ref={userRef}
                required
              />
              {userFocus && !validName && <div className="error-msg">Invalid username</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                ref={pwdRef}
                required
              />
              {pwdFocus && !validPwd && <div className="error-msg">Invalid password</div>}
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                ref={confirmPwdRef}
                required
              />
              {matchFocus && (!validMatch || pwd !== matchPwd) && (
                <div className="error-msg">Passwords do not match</div>
              )}
            </div>
            <button type="submit" className="submit-btn" disabled={!validName || !validPwd || !validMatch}>
              Create Account
            </button>
            {errMsg && <div className="error-msg">{errMsg}</div>}
            {success && (
              <div className="success-msg">
                Account created successfully! <a href="#">Sign In</a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationForm;

