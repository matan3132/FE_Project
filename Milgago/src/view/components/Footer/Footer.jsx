import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/milgago-logo.png";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.logoSection}>
                    <img src={logo} alt="MilgaGo" className={styles.logo} />
                    <span className={styles.siteName}>מילגה-גו</span>
                </div>
                <nav className={styles.links} aria-label="ניווט תחתון">
                    <Link to="/">בית</Link>
                    <Link to="/scholarships">מלגות</Link>
                    <Link to="/help">עזרה</Link>
                    <Link to="/register">הרשמה</Link>
                </nav>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} מילגה-גו. כל הזכויות שמורות.
            </div>
        </footer>
    );
} 