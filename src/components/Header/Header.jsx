import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      try {
        await signOut(auth);
        setCurrentUser(null);
        navigate("/login");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  return (
    <header>
      <div className="left-side">
        {/* left side */}
        <div className="logo">
          <i className="ri-map-pin-2-line"></i>
        </div>
        <div className="title">
          <h3>UniTrack</h3>
          <p>by Nikhil, Mansi, Madiha</p>
        </div>
      </div>

      <div className="middle-side">
        <h3 onClick={() => navigate("/")}>Home</h3>
        <h3 onClick={() => navigate("/all-items")}>Browse</h3>
        <h3 onClick={() => navigate("/report-item")}>Report</h3>
      </div>
      {/* right side */}
      {currentUser && (
        <div className="user-info">
          <div className="profile">
            <i className="ri-account-circle-fill"></i>
            <p>{currentUser.displayName}</p>
          </div>
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
