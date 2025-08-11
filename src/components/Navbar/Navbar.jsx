import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";

// Import Firebase Auth
import { auth } from "../../firebase"; // adjust path if needed
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const navRef = useRef();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Scroll effect for navbar color
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });

    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => console.log("User signed out"))
      .catch((err) => console.error(err));
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse My Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt="" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            {user ? (
              <p onClick={handleLogout}>Sign Out</p>
            ) : (
              <p>
                <a href="/login" style={{ color: "white", textDecoration: "none" }}>
                  Log In
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
