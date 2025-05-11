import styles from "./AdminPanel.module.css";

export default function AdminPanel() {
  return (
    <div className={styles.container}>
      <h1>מערכת ניהול מלגות</h1>
      <div className={styles.section}>
        <h2>רשימת מלגות</h2>
        <button className={styles.primaryBtn}>הוספת מלגה חדשה</button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>סטטוס</th>
              <th>שם המלגה</th>
              <th>תאריך</th>
              <th>מגישים</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className={styles.statusActive}>פעיל</span></td>
              <td>מלגת מצטיינים 2024</td>
              <td>15.01.2024</td>
              <td>156</td>
              <td>
                <button className={styles.editBtn}>עריכה</button>
                <button className={styles.deleteBtn}>מחיקה</button>
                <button className={styles.secondaryBtn}>השבתה</button>
              </td>
            </tr>
            <tr>
              <td><span className={styles.statusInactive}>לא פעיל</span></td>
              <td>מלגת סיוע כלכלי</td>
              <td>10.01.2024</td>
              <td>89</td>
              <td>
                <button className={styles.editBtn}>עריכה</button>
                <button className={styles.deleteBtn}>מחיקה</button>
                <button className={styles.secondaryBtn}>הפעלה</button>
              </td>
            </tr>
            <tr>
              <td><span className={styles.statusActive}>פעיל</span></td>
              <td>מלגת מחקר</td>
              <td>01.01.2024</td>
              <td>45</td>
              <td>
                <button className={styles.editBtn}>עריכה</button>
                <button className={styles.deleteBtn}>מחיקה</button>
                <button className={styles.secondaryBtn}>השבתה</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.section}>
        <h2>משתמשים</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>שם מלא</th>
              <th>הגשות</th>
              <th>הצלחות</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>יעל כהן</td>
              <td>8</td>
              <td>6</td>
            </tr>
            <tr>
              <td>דוד לוי</td>
              <td>7</td>
              <td>5</td>
            </tr>
            <tr>
              <td>מיכל חזן</td>
              <td>6</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
