import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import styles from './EditScholarshipModal.module.css';

const EditScholarshipModal = ({ isOpen, onClose, scholarship, onSuccess }) => {
    const initialFormState = {
        title: '', amount: '', deadline: '', description: '', requirements: '',
        organization: '', status: 'active', type: '', academicLevel: '',
        fieldOfStudy: '', numberOfRecipients: '', additionalInfo: '',
        contactEmail: '', contactPhone: ''
    };
    const [form, setForm] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (scholarship) {
            setForm({
                title: scholarship.title || '',
                amount: scholarship.amount || '',
                deadline: scholarship.deadline ? new Date(scholarship.deadline).toISOString().split('T')[0] : '',
                description: scholarship.description || '',
                requirements: scholarship.requirements || '',
                organization: scholarship.organization || '',
                status: scholarship.status || 'active',
                type: scholarship.type || '',
                academicLevel: scholarship.academicLevel || '',
                fieldOfStudy: scholarship.fieldOfStudy || '',
                numberOfRecipients: scholarship.numberOfRecipients || '',
                additionalInfo: scholarship.additionalInfo || '',
                contactEmail: scholarship.contactEmail || '',
                contactPhone: scholarship.contactPhone || ''
            });
        }
    }, [scholarship]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await updateDoc(doc(db, 'scholarships', scholarship.id), {
                ...form,
                amount: Number(form.amount),
                numberOfRecipients: Number(form.numberOfRecipients) || 1,
                deadline: form.deadline,
                updatedAt: new Date(),
            });
            setSuccess('המלגה עודכנה בהצלחה');
            onSuccess?.();
            onClose();
        } catch (err) {
            setError('שגיאה בעדכון המלגה');
        }
        setLoading(false);
    };

    if (!isOpen || !scholarship) return null;

    const formFields = [
        { name: 'title', label: 'שם המלגה', type: 'text', required: true },
        { name: 'amount', label: 'סכום', type: 'number', required: true },
        { name: 'deadline', label: 'מועד אחרון', type: 'date', required: true },
        { name: 'organization', label: 'ארגון מעניק', type: 'text', required: true },
        { name: 'type', label: 'סוג המלגה', type: 'text' },
        { name: 'academicLevel', label: 'רמת לימודים', type: 'text' },
        { name: 'fieldOfStudy', label: 'תחום לימוד', type: 'text' },
        { name: 'numberOfRecipients', label: 'מספר מקבלים', type: 'number', min: 1 },
        { name: 'description', label: 'תיאור', type: 'textarea', required: true },
        { name: 'requirements', label: 'דרישות', type: 'textarea' },
        { name: 'additionalInfo', label: 'מידע נוסף', type: 'textarea' },
        { name: 'contactEmail', label: 'אימייל ליצירת קשר', type: 'email' },
        { name: 'contactPhone', label: 'טלפון ליצירת קשר', type: 'tel' },
        {
            name: 'status', label: 'סטטוס', type: 'select', options: [
                { value: 'active', label: 'פעיל' },
                { value: 'inactive', label: 'לא פעיל' },
                { value: 'cancelled', label: 'בוטל' }
            ]
        }
    ];

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>עריכת מלגה</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {formFields.map(field => (
                        <div key={field.name} className={styles.formGroup}>
                            <label>{field.label}</label>
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    value={form[field.name]}
                                    onChange={e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                >
                                    {field.options.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={form[field.name]}
                                    onChange={e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                    required={field.required}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={form[field.name]}
                                    onChange={e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                    required={field.required}
                                    min={field.min}
                                />
                            )}
                        </div>
                    ))}
                    {error && <div className={styles.error}>{error}</div>}
                    {success && <div className={styles.success}>{success}</div>}
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? 'שומר...' : 'שמור שינויים'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditScholarshipModal; 