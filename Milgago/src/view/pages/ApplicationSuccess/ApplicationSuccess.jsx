import React from "react";
import styles from "./ApplicationSuccess.module.css";

export default function ApplicationSuccess() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>המועמדות נשלחה בהצלחה!</h1>
                <p>תודה על הגשת המועמדות. נעדכן אותך במייל בהמשך.</p>
            </div>
        </div>
    );
} 