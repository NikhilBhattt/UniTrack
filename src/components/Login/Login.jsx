import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";
import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  const notify = (message) => toast(message);
  const navigate = useNavigate();
  
  const login = useGoogleLogin({
    flow: "implicit",
    scope: "https://www.googleapis.com/auth/gmail.send",
    onSuccess: (tokenResponse) => {
      localStorage.setItem("gmail_token", tokenResponse.access_token);
    },
    onError: (err) => console.error(err),
  });

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error("Error:", err.code, "Message: ", err.message);
      notify(err.code);
    }
  };

  useEffect(() => {
    if (auth.currentUser) navigate("/");
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <h3 className="login-header">
          Welcome To <br /> UniTrack
        </h3>
        <p className="login-description">Sign in to continue</p>

        <button onClick={handleSignIn} className="google-button">
          <img src="./src/assets/google_logo_signin.png" />
          <span className="google-btn-text">Sign in with Google</span>
        </button>
        <p className="policy">Learn more about our privacy policy</p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
