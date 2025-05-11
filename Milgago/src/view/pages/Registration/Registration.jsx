import styles from "./Registration.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

export default function Registration() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [otherInstitution, setOtherInstitution] = useState("");
  const [field, setField] = useState("");
  const [otherField, setOtherField] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const finalInstitution = institution === "other" ? otherInstitution : institution;
    const finalField = field === "other" ? otherField : field;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        institute: finalInstitution,
        field: finalField,
        provider: "email",
        createdAt: new Date(),
      });

      navigate("/profile");
    } catch (error) {
      alert("שגיאה בהרשמה: " + error.message);
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heroTitle}>הרשמה למילגה-גו</h1>
      <p className={styles.subtitle}>הצטרפו עכשיו ותתחילו לקבל התאמות למלגות שמתאימות בדיוק לכם!</p>
      <hr className={styles.divider} />
      <form className={`${styles.formContainer} card`} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>טופס הרשמה</h2>
        <input
          className={styles.input}
          type="text"
          placeholder="* שם מלא"
          required
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <input
          className={styles.input}
          type="email"
          placeholder="* אימייל"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="* סיסמה"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <select
          className={styles.input}
          required
          value={institution}
          onChange={e => setInstitution(e.target.value)}
        >
          <option value="">בחר מוסד לימודים</option>
          <option>אוניברסיטת תל אביב</option>
          <option>אוניברסיטת בן-גוריון</option>
          <option>הטכניון</option>
          <option value="other">אחר</option>
        </select>
        {institution === "other" && (
          <input
            className={styles.input}
            type="text"
            placeholder="הקלד את שם המוסד שלך"
            value={otherInstitution}
            onChange={e => setOtherInstitution(e.target.value)}
            required
          />
        )}
        <select
          className={styles.input}
          required
          value={field}
          onChange={e => setField(e.target.value)}
        >
          <option value="">בחר תחום לימוד</option>
          <option>מדעי המחשב</option>
          <option>הנדסה</option>
          <option>מדעי החברה</option>
          <option value="other">אחר</option>
        </select>
        {field === "other" && (
          <input
            className={styles.input}
            type="text"
            placeholder="הקלד את תחום הלימוד שלך"
            value={otherField}
            onChange={e => setOtherField(e.target.value)}
            required
          />
        )}
        <button className={styles.bigPrimaryBtn} type="submit">צור חשבון</button>
      </form>
    </div>
  );
}
