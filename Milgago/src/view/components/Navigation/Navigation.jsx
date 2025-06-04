/**
 * Navigation Component
 * 
 * A responsive navigation bar component that handles user authentication state
 * and provides navigation links based on user roles. The component includes:
 * - Logo and branding
 * - Main navigation links (Home, Scholarships, Help)
 * - Authentication-related links (Login/Register for guests, Profile/Logout for users)
 * - Admin panel link for administrators
 * 
 * The component uses React Router for navigation and the AuthContext for
 * managing authentication state. It also implements a logout function that
 * clears all local storage and redirects to the home page.
 */
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import styles from "./Navigation.module.css";
import logo from "../../../assets/milgago-logo.png";

const Navigation = () => {
  const location = useLocation();
  const { currentUser, userRole, logout } = useAuth();

  /**
   * Handles user logout process
   * - Calls the logout function from AuthContext
   * - Clears all local and session storage
   * - Redirects to home page
   */
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        {/* Logo and branding */}
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="MilgaGo Logo" />
        </Link>

        {/* Main navigation menu */}
        <ul className={styles.sideMenu}>
          {/* Common navigation links */}
          <li>
            <Link
              to="/"
              className={location.pathname === "/" ? styles.active : ""}
            >
              דף הבית
            </Link>
          </li>
          <li>
            <Link
              to="/scholarships"
              className={location.pathname === "/scholarships" ? styles.active : ""}
            >
              מלגות
            </Link>
          </li>
          <li>
            <Link
              to="/help"
              className={location.pathname === "/help" ? styles.active : ""}
            >
              עזרה
            </Link>
          </li>

          {/* Conditional rendering based on authentication state */}
          {currentUser ? (
            <>
              {/* Admin-only navigation */}
              {userRole === 'admin' && (
                <li>
                  <Link
                    to="/admin"
                    className={location.pathname === "/admin" ? styles.active : ""}
                  >
                    ניהול
                  </Link>
                </li>
              )}
              {/* User-specific navigation */}
              <li>
                <Link
                  to="/profile"
                  className={location.pathname === "/profile" ? styles.active : ""}
                >
                  פרופיל
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  <FaSignOutAlt className={styles.logoutIcon} />
                  <span>התנתק</span>
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Guest navigation */}
              <li>
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? styles.active : ""}
                >
                  התחברות
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={location.pathname === "/register" ? styles.active : ""}
                >
                  הרשמה
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
