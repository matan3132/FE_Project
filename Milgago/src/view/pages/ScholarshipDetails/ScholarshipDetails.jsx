import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './ScholarshipDetails.module.css';

const ScholarshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [scholarship, setScholarship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hasApplied, setHasApplied] = useState(false);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        const checkApplication = async () => {
            if (!currentUser) return;
            try {
                const applicationsRef = collection(db, 'applications');
                const q = query(
                    applicationsRef,
                    where('scholarshipId', '==', id),
                    where('userId', '==', currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                setHasApplied(!querySnapshot.empty);
            } catch (error) {
                setError('שגיאה בבדיקת הגשת מועמדות');
            }
        };

        const fetchScholarship = async () => {
            try {
                const docRef = doc(db, 'scholarships', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setScholarship({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('המלגה לא נמצאה');
                }
            } catch (error) {
                setError('שגיאה בטעינת המלגה');
            }
            setLoading(false);
        };

        fetchScholarship();
        if (currentUser) {
            checkApplication();
        }
    }, [id, currentUser]);

    const handleApply = async () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        setApplying(true);
        setError('');

        try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            const userData = userDoc.data();

            const applicationData = {
                scholarshipId: id,
                userId: currentUser.uid,
                status: 'pending',
                appliedAt: new Date(),
                userEmail: currentUser.email,
                userName: userData?.name || '',
                userPhone: userData?.phone || '',
                userUniversity: userData?.university || '',
                userFieldOfStudy: userData?.fieldOfStudy || '',
                userYearOfStudy: userData?.yearOfStudy || '',
                userGPA: userData?.gPA || '',
                additionalInfo: userData?.additionalInfo || ''
            };

            if (!applicationData.userName || !applicationData.userPhone) {
                throw new Error('יש להשלים את פרטי המשתמש לפני הגשת מועמדות');
            }

            await addDoc(collection(db, 'applications'), applicationData);
            setHasApplied(true);
            navigate('/my-applications');
        } catch (error) {
            setError(error.message || 'שגיאה בהגשת המועמדות');
        }
        setApplying(false);
    };

    if (loading) return <div className={styles.loading}>טוען...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!scholarship) return <div className={styles.error}>המלגה לא נמצאה</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{scholarship.title}</h1>
                <div className={styles.amount}>₪{scholarship.amount.toLocaleString()}</div>
            </div>

            <div className={styles.details}>
                <div className={styles.section}>
                    <h2>פרטי המלגה</h2>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>ארגון מעניק:</span>
                            <span className={styles.value}>{scholarship.organization}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>סוג המלגה:</span>
                            <span className={styles.value}>{scholarship.type}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>רמה אקדמית:</span>
                            <span className={styles.value}>{scholarship.academicLevel}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>תחום לימוד:</span>
                            <span className={styles.value}>{scholarship.fieldOfStudy || 'כל התחומים'}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>מספר מקבלים:</span>
                            <span className={styles.value}>{scholarship.numberOfRecipients}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>מועד אחרון להגשה:</span>
                            <span className={styles.value}>{new Date(scholarship.deadline).toLocaleDateString('he-IL')}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2>תיאור</h2>
                    <p>{scholarship.description}</p>
                </div>

                {scholarship.requirements && (
                    <div className={styles.section}>
                        <h2>דרישות</h2>
                        <p>{scholarship.requirements}</p>
                    </div>
                )}

                {scholarship.additionalInfo && (
                    <div className={styles.section}>
                        <h2>מידע נוסף</h2>
                        <p>{scholarship.additionalInfo}</p>
                    </div>
                )}

                <div className={styles.section}>
                    <h2>יצירת קשר</h2>
                    <div className={styles.contactInfo}>
                        {scholarship.contactEmail && (
                            <div className={styles.contactItem}>
                                <span className={styles.label}>אימייל:</span>
                                <a href={`mailto:${scholarship.contactEmail}`} className={styles.value}>
                                    {scholarship.contactEmail}
                                </a>
                            </div>
                        )}
                        {scholarship.contactPhone && (
                            <div className={styles.contactItem}>
                                <span className={styles.label}>טלפון:</span>
                                <a href={`tel:${scholarship.contactPhone}`} className={styles.value}>
                                    {scholarship.contactPhone}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                {hasApplied ? (
                    <button className={styles.appliedButton} disabled>
                        כבר הגשת מועמדות למלגה זו
                    </button>
                ) : (
                    <button
                        className={styles.applyButton}
                        onClick={handleApply}
                        disabled={applying}
                    >
                        {applying ? 'שולח...' : 'הגש מועמדות'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ScholarshipDetails; 