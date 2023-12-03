// components/Logout.js
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");

      // Notify parent component about successful logout
      onLogout();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      {/* <h2>Logout</h2> */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
