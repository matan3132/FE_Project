import styles from "./Scholarships.module.css";
import { useNavigate } from "react-router-dom";

export default function Scholarships() {
  const navigate = useNavigate();
  // דוגמה לנתוני מלגות
  const scholarships = [
    { id: 1, title: "מלגת הצטיינות אקדמית", amount: 10000, deadline: "1.3.2024" },
    { id: 2, title: "מלגת מעורבות חברתית", amount: 5000, deadline: "15.2.2024" },
  ];
  return (
    <div className={styles.container}>
      <h1>המלגות שלך</h1>
      <div className={styles.list}>
        {scholarships.map((sch) => (
          <div className={styles.card} key={sch.id}>
            <div>
              <strong>{sch.title}</strong>
              <div>סכום: {sch.amount} ₪</div>
              <div>מועד אחרון: {sch.deadline}</div>
            </div>
            <button className={styles.primaryBtn} onClick={() => navigate(`/scholarship/${sch.id}`)}>
              פרטי מלגה
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
