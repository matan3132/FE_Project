import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ScholarshipDetails.module.css";

export default function ScholarshipDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    // דוגמה לנתוני מלגה
    const scholarship = id === "1"
        ? { title: "מלגת הצטיינות אקדמית", amount: 10000, deadline: "1.3.2024", description: "מלגה לסטודנטים מצטיינים בתחומי המדעים." }
        : { title: "מלגת מעורבות חברתית", amount: 5000, deadline: "15.2.2024", description: "מלגה עבור פעילות התנדבותית בקהילה." };

    function handleApply() {
        navigate("/application-success");
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>{scholarship.title}</h1>
                <div>סכום: {scholarship.amount} ₪</div>
                <div>מועד אחרון: {scholarship.deadline}</div>
                <p>{scholarship.description}</p>
                <button className={styles.primaryBtn} onClick={handleApply}>
                    הגש מועמדות
                </button>
            </div>
        </div>
    );
} 