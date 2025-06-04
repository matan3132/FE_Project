import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import styles from "./HelpCenter.module.css";

const HelpCenter = () => {
  const { currentUser } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>מרכז העזרה וההגדרות</h1>
        <p>כאן תוכל למצוא תשובות לשאלות נפוצות ולנהל את הגדרות החשבון שלך</p>

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
          <div className={styles.faq}>
            <h3>איך אני יכול להגיש מועמדות למלגה?</h3>
            <p>כדי להגיש מועמדות למלגה, עליך להתחבר לחשבון שלך, לבחור מלגה מהרשימה, ולחץ על כפתור "הגש מועמדות".</p>
          </div>
          <div className={styles.faq}>
            <h3>כמה מלגות אני יכול להגיש?</h3>
            <p>אתה יכול להגיש מועמדות למלגה אחת בלבד בכל פעם.</p>
          </div>
          <div className={styles.faq}>
            <h3>איך אני יכול לעקוב אחרי סטטוס המועמדות שלי?</h3>
            <p>אתה יכול לראות את סטטוס המועמדויות שלך בדף הפרופיל שלך.</p>
          </div>
        </div>

        {currentUser && (
          <div className={styles.privacySection}>
            <h2>הגדרות פרטיות</h2>
            <div>כאן תוכל לנהל את הגדרות הפרטיות והעדפות החשבון שלך.</div>
          </div>
        )}

        <div className={styles.section}>
          <h2>צור קשר</h2>
          <p>אם יש לך שאלות נוספות, אנא צור קשר עם התמיכה שלנו:</p>
          <p>אימייל: support@milgago.com</p>
          <p>טלפון: 03-1234567</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
