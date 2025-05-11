import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import logo from "../../../assets/milgago-logo.png";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="MilgaGo Logo" />
        </Link>

        <ul className={styles.sideMenu}>
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
              to="/register"
              className={location.pathname === "/register" ? styles.active : ""}
            >
              הרשמה
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
              to="/dashboard"
              className={location.pathname === "/dashboard" ? styles.active : ""}
            >
              דשבורד
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
          <li>
            <Link
              to="/admin"
              className={location.pathname === "/admin" ? styles.active : ""}
            >
              ניהול
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
