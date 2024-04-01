import React, { useRef, useState, useEffect, ChangeEvent, FormEvent } from "react";
import './UserRegistrationForm.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

interface UserRegistrationFormProps {}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const confirmPwdRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<string>('');
  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>('');
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMatchPwd(e.target.value)}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                ref={confirmPwdRef}
                required
              />
              {matchFocus && (!validMatch || pwd !== matchPwd) && (
                <div className="error-msg">Passwords do not match</div>
              )}
            </div>
            <button type="submit" className="submit-btn">
              Create Account
            </button>
            {errMsg && <div className="error-msg">{errMsg}</div>}
            {success && <div className="success-msg">Account created successfully!</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
