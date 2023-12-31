// components/SignUp.js
import { useState } from "react";
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed up:", user);
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    }
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="layout">
      <h2>Sign Up</h2>
      <div className="inputbox">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p className="error-msg">{error}</p>}
      <div className="login-a">
        <p>Already have an account?</p>
      </div>
    </div>
  );
};

export default Signup;