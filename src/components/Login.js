import React, { useState, useRef } from "react";
// import "./Login.css"; // assume styling is in place

function Login({ onLogin }) {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validate = (username, password) => {
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const newErrors = validate(username, password);

    if (Object.keys(newErrors).length === 0) {
      onLogin(username);
    }

    setErrors(newErrors);
  };

  const handleInputChange = () => {
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value;

    const updatedErrors = { ...errors };

    // Username live validation
    if (username) {
      updatedErrors.username = "";
    }

    // Password live validation
    if (password) {
      if (password.length < 6) {
        updatedErrors.password = "Password must be at least 6 characters";
      } else {
        updatedErrors.password = "";
      }
    } else {
      updatedErrors.password = "Password is required";
    }

    setErrors(updatedErrors);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <h2 data-testid="login-page-title">Login to Todo App</h2>

      <div className="form-group">
        <input
          ref={usernameRef}
          type="text"
          data-testid="username"
          placeholder="Username"
          className={errors.username ? "error" : ""}
          onChange={handleInputChange}
        />
        {errors.username && (
          <small className="error-text">{errors.username}</small>
        )}
      </div>

      <div className="form-group">
        <input
          ref={passwordRef}
          type="password"
          data-testid="password"
          placeholder="Password"
          className={errors.password ? "error" : ""}
          onChange={handleInputChange}
        />
        {errors.password && (
          <small className="error-text">{errors.password}</small>
        )}
      </div>

      <button type="submit" className="btn-login" data-testid="login-btn">
        Login
      </button>
    </form>
  );
}

export default Login;
