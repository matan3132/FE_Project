import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1>מצא את המלגה שמתאימה בדיוק בשבילך</h1>
      <p>
        המערכת שלנו סורקת מאגרי מידע ומתאימה עבורך את המלגות הכי רלוונטיות לפי
        הפרופיל האישי שלך
      </p>
      <button className={styles.primaryBtn}>התחל עכשיו</button>

      <input
        type="text"
        placeholder="...חפש מלגות"
        className={styles.searchBox}
      />

      <h2>איך זה עובד?</h2>
      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.circle}>1</div>
          <p>צור פרופיל</p>
        </div>
        <div className={styles.step}>
          <div className={styles.circle}>2</div>
          <p>קבל התאמות</p>
        </div>
        <div className={styles.step}>
          <div className={styles.circle}>3</div>
          <p>הגש מועמדות</p>
        </div>
      </div>

      <div className={styles.testimonial}>
        <p>"מצאתי מלגה מושלמת תוך שבוע!"</p>
        <p className={styles.testimonialAuthor}>שיר, אוניברסיטת בן-גוריון</p>
      </div>

      <footer className={styles.footer}>
        <a href="#">אודות</a>
        <a href="#">יצירת קשר</a>
        <a href="#">מדיניות פרטיות</a>
      </footer>
    </div>
  );
}
