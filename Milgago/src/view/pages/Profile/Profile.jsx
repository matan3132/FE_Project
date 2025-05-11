import React from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  function handleSave() {
    // כאן תוכל להוסיף לוגיקת שמירה אמיתית
    navigate("/scholarships");
  }

  return (
    <div className={styles.container}>
      <h1>פרופיל אישי</h1>
      <p>כאן המשתמש ימלא נתונים אישיים לצורך התאמת מלגות.</p>
      <p>בהמשך: טופס עריכת פרופיל, שמירה, מעבר להתאמות מלגות.</p>
      <button className={styles.primaryBtn} onClick={handleSave}>שמור והמשך להתאמות מלגות</button>
    </div>
  );
} 