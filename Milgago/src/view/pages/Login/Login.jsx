import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, form.email, form.password);
            navigate("/profile");
        } catch (error) {
            switch (error.code) {
                case "auth/invalid-email": setError("כתובת האימייל אינה תקינה"); break;
                case "auth/user-disabled": setError("חשבון זה הושבת"); break;
                case "auth/user-not-found": setError("לא נמצא משתמש עם כתובת אימייל זו"); break;
                case "auth/wrong-password": setError("סיסמה שגויה"); break;
                default: setError("שגיאה בהתחברות. אנא נסה שוב");
            }
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heroTitle}>התחברות למילגה-גו</h1>
            <p className={styles.subtitle}>התחברו לחשבון שלכם כדי לצפות במלגות המותאמות אישית</p>
            <hr className={styles.divider} />
            <form className={`${styles.formContainer} card`} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>טופס התחברות</h2>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <input
                    className={styles.input}
                    type="email"
                    placeholder="* אימייל"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="* סיסמה"
                    required
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                />
                <button className={styles.bigPrimaryBtn} type="submit">התחבר</button>
                <p className={styles.registerLink}>
                    אין לך חשבון? <span onClick={() => navigate("/register")}>הירשם כאן</span>
                </p>
            </form>
        </div>
    );
} 