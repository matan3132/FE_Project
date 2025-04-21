import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.logo}>🎓 מלגות</div>

      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <ul className={`${styles.sideMenu} ${isOpen ? styles.open : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            דף הבית
          </Link>
        </li>
        <li>
          <Link to="/welcome" onClick={() => setIsOpen(false)}>
            פתיחה
          </Link>
        </li>
        <li>
          <Link to="/register" onClick={() => setIsOpen(false)}>
            הרשמה
          </Link>
        </li>
        <li>
          <Link to="/scholarships" onClick={() => setIsOpen(false)}>
            מלגות
          </Link>
        </li>
        <li>
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            דשבורד
          </Link>
        </li>
        <li>
          <Link to="/help" onClick={() => setIsOpen(false)}>
            עזרה
          </Link>
        </li>
        <li>
          <Link to="/admin" onClick={() => setIsOpen(false)}>
            ניהול
          </Link>
        </li>
      </ul>
    </nav>
  );
}
