import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { loginUser } from "../apis/Apis";
import { createUser } from "../apis/Apis";


export const Navbar = () => {

  const [username, setUsername] = useState(localStorage.getItem('username'));

  const [email, setEmail] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');

  const [validatingEmail, setValidatingEmail] = useState(false);
  const [validatingPassword, setValidatingPassword] = useState(false);
  const [validatingUsername, setValidatingUsername] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [inputUsernameValid, setInputUsernameValid] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [loginFailed, setLoginFailed] = useState(false);
  const [signupFailed, setSignupFailed] = useState(false);
  const [signupSuccessful, setSignupSuccessful] = useState(false);

  const [searchTerm, setSearchTerm] = useState();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleInputUsernameChange = (e) => {
    setInputUsername(e.target.value);
  }

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setInputUsername('');
  }

  const emailValidation = () => {
    setValidatingEmail(true);
    setLoginFailed(false);
    setSignupFailed(false);
    setSignupSuccessful(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    emailRegex.test(email) ? setEmailValid(true) : setEmailValid(false);
  }
  const usernameValidation = () => {
    setValidatingUsername(true);
    setLoginFailed(false);
    setSignupFailed(false);
    setSignupSuccessful(false);
    inputUsername.length > 0 ? setInputUsernameValid(true) : setInputUsernameValid(false);
  }
  const passwordValidation = () => {
    setValidatingPassword(true);
    setLoginFailed(false);
    setSignupFailed(false);
    setSignupSuccessful(false);
    password.length > 0 ? setPasswordValid(true) : setPasswordValid(false);
  }

  const handleLogin = async () => {
    emailValidation();
    passwordValidation();
    if (!emailValid || !passwordValid) {
      alert('Email or password invalid!');
    } else {
      try {
        const res = await loginUser({
          email,
          password
        });
        if (res) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('username', res.username);
          window.location.reload();
        }
      } catch (error) {
        console.log(error.message);
        setLoginFailed(true);
        setValidatingEmail(false);
        setValidatingPassword(false);
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    setUsername('');
    window.location.reload();
  }

  const handleSignup = async () => {
    emailValidation();
    usernameValidation();
    passwordValidation();
    if (!emailValid || !passwordValid || !inputUsernameValid) {
      alert('Email or password or username invalid!');
    } else {
      try {
        console.log(email, password, inputUsername);
        await createUser({
          email,
          password,
          username: inputUsername
        });
        setSignupSuccessful(true);
      } catch (error) {
        console.log(error.message);
        setSignupFailed(true);
        setValidatingEmail(false);
        setValidatingPassword(false);
        setValidatingUsername(false);
      }
    }
  }

  const handleSignupClose = () => {
    setSignupFailed(false);
    setSignupSuccessful(false);
    setValidatingEmail(false);
    setValidatingPassword(false);
    setValidatingUsername(false);
    setShowSignupModal(false);
  }
  const handleSignupShow = () => setShowSignupModal(true);
  const handleLoginClose = () => {
    setLoginFailed(false);
    setValidatingEmail(false);
    setValidatingPassword(false);
    setShowLoginModal(false);
  }
  const handleLoginShow = () => setShowLoginModal(true);
  const handleLoginCloseSignupShow = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearch = async () => {
    window.location.pathname = '/articlesSearchResult/' + searchTerm;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg mb-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/demo-blog-logo.png" alt="" style={{ width: '10rem' }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <div className="d-flex me-5 my-3">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange} value={searchTerm} />
              <button className="btn btn-secondary" type="submit" onClick={handleSearch}>Search</button>
            </div>
            {username ? (
              <div>
                <div className='me-3 d-inline-block text-danger'><FontAwesomeIcon icon={faUser} className='me-2' />{username}</div>
                <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div>
                <button className="btn btn-danger me-2" onClick={handleLoginShow}>Login</button>
                <button className="btn btn-outline-secondary" onClick={handleSignupShow}>Signup</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleLoginClose} size='sm' centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-3">
            <label for="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={handleEmailChange} onBlur={emailValidation} value={email} />
            {validatingEmail && !emailValid && (
              <div className="text-danger">
                Email is invalid!
              </div>
            )}
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={handlePasswordChange} onBlur={passwordValidation} value={password} />
            {validatingPassword && !passwordValid && (
              <div className="text-danger">
                Password is required!
              </div>
            )}
          </div>
          <div className='mb-3'>
            {loginFailed && (
              <div className="text-danger">
                Login failed. Please try again.
              </div>
            )}
          </div>
          <div className="row text-center my-3">
            <div className="col">
              <button className="btn btn-danger me-3" onClick={handleLogin}>Login</button>
              <button className="btn btn-outline-secondary" onClick={handleClear}>Clear</button>
            </div>
          </div>
          <div className="text-center">
            <p className='text-primary text-decoration-underline' onClick={handleLoginCloseSignupShow}>Don't have an count? Sign up here</p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignupModal} onHide={handleSignupClose} size='sm' centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>User Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="my-3">
            <label for="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={handleEmailChange} onBlur={emailValidation} value={email} />
            {validatingEmail && !emailValid && (
              <div className="text-danger">
                Email is invalid!
              </div>
            )}
          </div>
          <div className="mb-3">
            <label for="inputUsername" className="form-label">Username</label>
            <input type="text" className="form-control" id="inputUsername" onChange={handleInputUsernameChange} onBlur={usernameValidation} value={inputUsername} />
            {validatingUsername && !inputUsernameValid && (
              <div className="text-danger">
                Username is required!
              </div>
            )}
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={handlePasswordChange} onBlur={passwordValidation} value={password} />
            {validatingPassword && !passwordValid && (
              <div className="text-danger">
                Password is required!
              </div>
            )}
          </div>
          <div className='mb-3'>
            {signupFailed && (
              <div className="text-danger">
                Signup failed. Please try again.
              </div>
            )}
            {signupSuccessful && (
              <div className="text-success">
                Signup successful! <span onClick={() => {
                  handleSignupClose();
                  handleLoginShow();
                  handleClear();
                }} className='text-decoration-underline text-primary'>Login here</span>
              </div>
            )}
          </div>
          <div className="row text-center my-3">
            <div className="col">
              <button className="btn btn-danger me-3" onClick={handleSignup}>Signup</button>
              <button className="btn btn-outline-secondary" onClick={handleClear}>Clear</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}