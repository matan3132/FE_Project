import { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import styles from "./StatusBar.module.css";

export default function StatusBar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log("StatusBar mounted"); // Debug log
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed:", user); // Debug log
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className={styles.statusBar}>
            <div className={styles.statusContent}>
                {user ? (
                    <span>שלום {user.email}</span>
                ) : (
                    <span>
                        שלום אורח, אנא{" "}
                        <Link to="/login" className={styles.link}>התחבר</Link>
                        {" "}או{" "}
                        <Link to="/register" className={styles.link}>הירשם</Link>
                    </span>
                )}
            </div>
        </div>
    );
} 