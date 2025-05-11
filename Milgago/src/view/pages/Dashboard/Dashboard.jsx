import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <h1>סקירת מערכת המלגות</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>847</div>
          <div>משתמשים חדשים החודש</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>2341</div>
          <div>התאמות מלגות שנשלחו</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>68%</div>
          <div>אחוז הצלחה</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>1238</div>
          <div>הגשות שנשלחו</div>
        </div>
      </div>
      <div className={styles.section}>
        <h2>מלגות פעילות</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>שם המלגה</th>
              <th>סכום</th>
              <th>מגישים</th>
              <th>תאריך אחרון</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>מלגת הצטיינות אקדמאית</td>
              <td>15,000 ₪</td>
              <td>234</td>
              <td>15.02.2024</td>
            </tr>
            <tr>
              <td>מלגת מחקר מתקדם</td>
              <td>25,000 ₪</td>
              <td>156</td>
              <td>01.03.2024</td>
            </tr>
            <tr>
              <td>מלגת חדשנות</td>
              <td>10,000 ₪</td>
              <td>312</td>
              <td>28.02.2024</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.section}>
        <h2>משתמשים מובילים</h2>
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
