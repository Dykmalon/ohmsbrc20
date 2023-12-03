// components/Login.js
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user);

      // Notify parent component about successful login
      onLogin();
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="layout">
      <h2>Login</h2>
      <div className="inputbox">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      <div className="login-a">
      <p>Already have an account?</p>
      </div>
    </div>
  );
};

export default Login;
