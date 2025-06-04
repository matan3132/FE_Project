import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./Scholarships.module.css";

export default function Scholarships() {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, "scholarships"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const active = data.filter(sch => sch.status === 'active');
        setScholarships(active);
        setFilteredScholarships(active);
      } catch {
        setError("שגיאה בטעינת המלגות");
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setFilteredScholarships(
      scholarships.filter(sch =>
        [sch.title, sch.organization, sch.type, sch.academicLevel]
          .filter(Boolean)
          .some(val => val.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, scholarships]);

  if (loading) return <div className={styles.container}>טוען...</div>;
  if (error) return <div className={styles.container}>{error}</div>;

  return (
    <div className={styles.scholarships}>
      <div className={styles.scholarshipsContainer}>
        <div className={styles.scholarshipsHeader}>
          <h1 className={styles.scholarshipsTitle}>המלגות הזמינות</h1>
          <p className={styles.scholarshipsSubtitle}>גלו את כל המלגות המתאימות לכם</p>
        </div>
        <div className={styles.filters}>
          <input
            type="text"
            className={styles.filterInput}
            placeholder="חיפוש לפי שם מלגה, ארגון, סוג או רמה אקדמית..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.scholarshipGrid}>
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map(({ id, imageUrl, title, amount, deadline, organization, type, academicLevel }) => (
              <div className={styles.scholarshipCard} key={id}>
                {imageUrl && <img src={imageUrl} alt={title} className={styles.scholarshipImage} />}
                <div className={styles.scholarshipContent}>
                  <h3 className={styles.scholarshipTitle}>{title}</h3>
                  <div className={styles.scholarshipDetails}>
                    <div className={styles.scholarshipDetail}><span>סכום: {amount} ₪</span></div>
                    <div className={styles.scholarshipDetail}><span>מועד אחרון: {new Date(deadline).toLocaleDateString('he-IL')}</span></div>
                    <div className={styles.scholarshipDetail}><span>ארגון: {organization}</span></div>
                    {type && <div className={styles.scholarshipDetail}><span>סוג: {type}</span></div>}
                    {academicLevel && <div className={styles.scholarshipDetail}><span>רמה: {academicLevel}</span></div>}
                  </div>
                  <button className={styles.primaryBtn} onClick={() => navigate(`/scholarship/${id}`)}>פרטי מלגה</button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>לא נמצאו מלגות מתאימות</div>
          )}
        </div>
      </div>
    </div>
  );
}
