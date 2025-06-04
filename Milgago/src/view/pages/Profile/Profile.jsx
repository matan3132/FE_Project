import React, { useState, useEffect, useRef } from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const topRef = useRef(null);

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', idNumber: '', birthDate: '', gender: '',
    institution: '', faculty: '', degree: '', yearOfStudy: '', gpa: '', fieldOfStudy: '',
    familyStatus: '', numberOfChildren: '', monthlyIncome: '', financialAid: '',
    militaryService: '', volunteerWork: '', specialNeeds: '', immigrationStatus: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setForm(userData);
          }
        } catch (err) {
          setError('שגיאה בטעינת נתוני המשתמש');
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (!currentUser) throw new Error('לא נמצא משתמש מחובר');
      await updateDoc(doc(db, 'users', currentUser.uid), { ...form, updatedAt: new Date() });
      setSuccess('הפרופיל עודכן בהצלחה');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('שגיאה בעדכון הפרופיל');
    }
    setLoading(false);
  }

  if (loading) return <div className={styles.container}>טוען...</div>;

  const formFields = [
    {
      section: 'מידע אישי', fields: [
        { name: 'fullName', label: 'שם מלא', type: 'text', required: true },
        { name: 'email', label: 'אימייל', type: 'email', required: true },
        { name: 'phone', label: 'טלפון', type: 'tel' },
        { name: 'idNumber', label: 'מספר תעודת זהות', type: 'text' },
        { name: 'birthDate', label: 'תאריך לידה', type: 'date' },
        { name: 'gender', label: 'מין', type: 'text' }
      ]
    },
    {
      section: 'מידע אקדמי', fields: [
        { name: 'institution', label: 'מוסד לימודים', type: 'text' },
        { name: 'faculty', label: 'פקולטה', type: 'text' },
        { name: 'degree', label: 'תואר', type: 'text' },
        { name: 'yearOfStudy', label: 'שנת לימודים', type: 'text' },
        { name: 'gpa', label: 'ממוצע ציונים', type: 'text' },
        { name: 'fieldOfStudy', label: 'תחום לימוד', type: 'text' }
      ]
    },
    {
      section: 'מידע פיננסי', fields: [
        { name: 'familyStatus', label: 'סטטוס משפחתי', type: 'text' },
        { name: 'numberOfChildren', label: 'מספר ילדים', type: 'text' },
        { name: 'monthlyIncome', label: 'הכנסה חודשית', type: 'text' },
        { name: 'financialAid', label: 'סיוע כספי', type: 'text' }
      ]
    },
    {
      section: 'מידע נוסף', fields: [
        { name: 'militaryService', label: 'שירות צבאי', type: 'text' },
        { name: 'volunteerWork', label: 'עבודה התנדבותית', type: 'text' },
        { name: 'specialNeeds', label: 'צרכים מיוחדים', type: 'text' },
        { name: 'immigrationStatus', label: 'סטטוס הגירה', type: 'text' }
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div ref={topRef}>
          <h1>פרופיל אישי</h1>
          <p>כאן תוכל למלא את הנתונים האישיים שלך לצורך התאמת מלגות</p>
          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}
        </div>
        <form onSubmit={handleSubmit} className={styles.profileForm}>
          {formFields.map((section, idx) => (
            <div key={idx} className={styles.section}>
              <h2>{section.section}</h2>
              <div className={styles.formGrid}>
                {section.fields.map((field) => (
                  <div key={field.name} className={styles.formGroup}>
                    <label>{field.label}</label>
                    <input
                      type={field.type}
                      value={form[field.name]}
                      onChange={(e) => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                      required={field.required}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'שומר...' : 'שמור שינויים'}
          </button>
        </form>
      </div>
    </div>
  );
} 