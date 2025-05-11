import styles from "./HelpCenter.module.css";

export default function HelpCenter() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>מרכז העזרה וההגדרות</h1>
        <p>כאן תוכל למצוא תשובות לשאלות נפוצות ולנהל את הגדרות החשבון שלך</p>
        <div className={styles.tabs}>
          <button className={styles.tabActive}>שאלות נפוצות</button>
          <button className={styles.tab}>הגדרות אישיות</button>
        </div>
        <div className={styles.faqSection}>
          <h2>שאלות נפוצות</h2>
          <div className={styles.faqItem}>
            <strong>איך פועלת המערכת?</strong>
            <div>המערכת מאפשרת לך לנהל את כל המידע והפעולות שלך במקום אחד. היא מספקת ממשק נוח וידידותי למשתמש.</div>
          </div>
          <div className={styles.faqItem}>
            <strong>איך אני נרשם?</strong>
            <div>ההרשמה פשוטה - לחץ על כפתור ההרשמה בדף הראשי ומלא את הפרטים הנדרשים אשר את המייל שישלח אליך.</div>
          </div>
          <div className={styles.faqItem}>
            <strong>האם המידע שלי מאובטח?</strong>
            <div>אנחנו משקיעים משאבים רבים באבטחת המידע שלך. כל המידע מוצפן ונשמר בשרתים מאובטחים.</div>
          </div>
        </div>
        <div className={styles.privacySection}>
          <h2>הגדרות פרטיות</h2>
          <div>כאן תוכל לנהל את הגדרות הפרטיות והעדפות החשבון שלך.</div>
        </div>
      </div>
    </div>
  );
}
