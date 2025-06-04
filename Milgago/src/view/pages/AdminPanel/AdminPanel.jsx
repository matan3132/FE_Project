import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, where, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import CreateScholarshipModal from '../../components/CreateScholarshipModal/CreateScholarshipModal';
import EditScholarshipModal from '../../components/EditScholarshipModal/EditScholarshipModal';
import styles from "./AdminPanel.module.css";

const AdminPanel = () => {
  const [scholarships, setScholarships] = useState([]);
  const [userApplications, setUserApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0
  });
  const { userRole, currentUser } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editScholarship, setEditScholarship] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);

  const fetchData = async () => {
    try {
      if (userRole === 'admin') {
        const scholarshipsRef = collection(db, "scholarships");
        const q = query(scholarshipsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const scholarshipsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setScholarships(scholarshipsData);

        setStats({
          total: scholarshipsData.length,
          active: scholarshipsData.filter(sch => sch.status === "active").length
        });
      }

      if (auth.currentUser) {
        try {
          const userApplicationsRef = collection(db, "scholarshipApplications");
          const userQuery = query(
            userApplicationsRef,
            where("userId", "==", auth.currentUser.uid),
            orderBy("createdAt", "desc")
          );
          const userSnapshot = await getDocs(userQuery);

          const userApplicationsData = userSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setUserApplications(userApplicationsData);
        } catch (userErr) {
          setUserApplications([]);
        }
      }

      const usersSnapshot = await getDocs(collection(db, 'users'));
      setTotalUsers(usersSnapshot.size);
      const applicationsSnapshot = await getDocs(collection(db, 'scholarshipApplications'));
      setTotalApplications(applicationsSnapshot.size);

      setLoading(false);
    } catch (err) {
      if (err.message.includes("requires an index")) {
        setError("ממתין ליצירת אינדקס במסד הנתונים. אנא נסה שוב בעוד מספר דקות.");
      } else {
        setError("שגיאה בטעינת הנתונים: " + err.message);
      }
      setLoading(false);
    }
  };

  const refreshData = () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [userRole]);

  const handleStatusChange = async (scholarshipId, newStatus) => {
    try {
      const scholarshipRef = doc(db, 'scholarships', scholarshipId);
      await updateDoc(scholarshipRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      const updatedScholarships = scholarships.map(sch =>
        sch.id === scholarshipId ? { ...sch, status: newStatus } : sch
      );
      setScholarships(updatedScholarships);
      setStats({
        total: updatedScholarships.length,
        active: updatedScholarships.filter(sch => sch.status === 'active').length
      });
    } catch (err) {
      setError('שגיאה בעדכון הסטטוס');
    }
  };

  const handleDeleteScholarship = async (scholarshipId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק מלגה זו?')) {
      try {
        await deleteDoc(doc(db, 'scholarships', scholarshipId));
        refreshData();
      } catch (err) {
        setError('שגיאה במחיקת המלגה');
      }
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'active':
        return 'פעיל';
      case 'inactive':
        return 'לא פעיל';
      case 'cancelled':
        return 'בוטל';
      default:
        return status;
    }
  };

  const handleViewApplicants = async (scholarship) => {
    setSelectedScholarship(scholarship);
    setLoadingApplicants(true);
    setIsApplicantsModalOpen(true);
    try {
      const applicationsQuery = query(
        collection(db, "scholarshipApplications"),
        where("scholarshipId", "==", scholarship.id)
      );
      const querySnapshot = await getDocs(applicationsQuery);
      const applicantsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplicants(applicantsData);
    } catch (err) {
      setApplicants([]);
    }
    setLoadingApplicants(false);
  };

  const handleEditScholarship = (scholarship) => {
    setEditScholarship(scholarship);
    setIsEditModalOpen(true);
  };

  const ApplicantsModal = ({ isOpen, onClose, scholarship, applicants, loading }) => {
    if (!isOpen || !scholarship) return null;
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h2>מועמדים למלגה: {scholarship.title}</h2>
            <button className={styles.closeButton} onClick={onClose}>×</button>
          </div>
          <div className={styles.modalContent}>
            {loading ? (
              <p>טוען...</p>
            ) : applicants.length > 0 ? (
              <div className={styles.applicantsList}>
                {applicants.map(applicant => (
                  <div key={applicant.id} className={styles.applicantCard}>
                    <h3>{applicant.fullName}</h3>
                    <p>אימייל: {applicant.email}</p>
                    <p>מוסד: {applicant.institute}</p>
                    <p>תחום לימוד: {applicant.field}</p>
                    <p>תאריך הגשה: {new Date(applicant.createdAt.toDate()).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>אין מועמדים למלגה זו</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className={styles.loading}>טוען...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.adminPanel}>
      <div className={styles.header}>
        <h1>פאנל ניהול</h1>
        <button className={styles.createButton} onClick={() => setIsCreateModalOpen(true)}>
          צור מלגה חדשה
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>מלגות</h3>
          <p>סה"כ: {stats.total}</p>
          <p>פעילות: {stats.active}</p>
        </div>
        <div className={styles.statCard}>
          <h3>משתמשים</h3>
          <p>סה"כ: {totalUsers}</p>
        </div>
        <div className={styles.statCard}>
          <h3>הגשות</h3>
          <p>סה"כ: {totalApplications}</p>
        </div>
      </div>

      <div className={styles.scholarshipsList}>
        <h2>מלגות</h2>
        {scholarships.map(scholarship => (
          <div key={scholarship.id} className={styles.scholarshipCard}>
            <div className={styles.scholarshipHeader}>
              <h3>{scholarship.title}</h3>
              <span className={`${styles.status} ${styles[scholarship.status]}`}>
                {getStatusDisplay(scholarship.status)}
              </span>
            </div>
            <div className={styles.scholarshipDetails}>
              <p>סכום: ₪{scholarship.amount}</p>
              <p>מועד אחרון: {new Date(scholarship.deadline).toLocaleDateString()}</p>
              <p>מספר מקבלים: {scholarship.numberOfRecipients}</p>
            </div>
            <div className={styles.scholarshipActions}>
              <button onClick={() => handleViewApplicants(scholarship)}>
                צפה במועמדים
              </button>
              <button onClick={() => handleEditScholarship(scholarship)}>
                ערוך
              </button>
              <button onClick={() => handleDeleteScholarship(scholarship.id)}>
                מחק
              </button>
              <select
                value={scholarship.status}
                onChange={(e) => handleStatusChange(scholarship.id, e.target.value)}
              >
                <option value="active">פעיל</option>
                <option value="inactive">לא פעיל</option>
                <option value="cancelled">בוטל</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <CreateScholarshipModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={refreshData}
      />

      <EditScholarshipModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={refreshData}
        scholarship={editScholarship}
      />

      <ApplicantsModal
        isOpen={isApplicantsModalOpen}
        onClose={() => setIsApplicantsModalOpen(false)}
        scholarship={selectedScholarship}
        applicants={applicants}
        loading={loadingApplicants}
      />
    </div>
  );
};

export default AdminPanel;
