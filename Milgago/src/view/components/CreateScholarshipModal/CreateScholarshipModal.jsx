import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import styles from './CreateScholarshipModal.module.css';

const CreateScholarshipModal = ({ isOpen, onClose, onSuccess }) => {
    const initialFormState = {
        title: '', amount: '', deadline: '', description: '', requirements: '',
        organization: '', type: '', academicLevel: '', fieldOfStudy: '',
        numberOfRecipients: '', additionalInfo: '', contactEmail: '', contactPhone: ''
    };
    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!formData.title || !formData.amount || !formData.deadline || !formData.description) {
                throw new Error('יש למלא את כל השדות החובה');
            }

            await addDoc(collection(db, 'scholarships'), {
                ...formData,
                amount: Number(formData.amount),
                numberOfRecipients: Number(formData.numberOfRecipients) || 1,
                createdAt: new Date(),
                status: 'active'
            });

            setFormData(initialFormState);
            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err.message || 'שגיאה ביצירת המלגה');
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    const formFields = [
        { name: 'title', label: 'שם המלגה *', type: 'text', required: true },
        { name: 'amount', label: 'סכום המלגה (₪) *', type: 'number', required: true, min: 0 },
        { name: 'deadline', label: 'מועד אחרון להגשה *', type: 'date', required: true },
        { name: 'organization', label: 'ארגון מעניק *', type: 'text', required: true },
        {
            name: 'type', label: 'סוג המלגה *', type: 'select', required: true, options: [
                { value: '', label: 'בחר סוג מלגה' },
                { value: 'excellence', label: 'מלגת הצטיינות' },
                { value: 'social', label: 'מלגת מעורבות חברתית' },
                { value: 'need', label: 'מלגת קיום' },
                { value: 'research', label: 'מלגת מחקר' },
                { value: 'other', label: 'אחר' }
            ]
        },
        {
            name: 'academicLevel', label: 'רמה אקדמית *', type: 'select', required: true, options: [
                { value: '', label: 'בחר רמה אקדמית' },
                { value: 'bachelor', label: 'תואר ראשון' },
                { value: 'master', label: 'תואר שני' },
                { value: 'phd', label: 'תואר שלישי' },
                { value: 'all', label: 'כל הרמות' }
            ]
        },
        { name: 'fieldOfStudy', label: 'תחום לימוד', type: 'text', placeholder: 'השאר ריק אם פתוח לכל התחומים' },
        { name: 'numberOfRecipients', label: 'מספר מקבלים', type: 'number', min: 1, placeholder: 'ברירת מחדל: 1' },
        { name: 'description', label: 'תיאור המלגה *', type: 'textarea', required: true },
        { name: 'requirements', label: 'דרישות', type: 'textarea' },
        { name: 'additionalInfo', label: 'מידע נוסף', type: 'textarea' },
        { name: 'contactEmail', label: 'אימייל ליצירת קשר', type: 'email' },
        { name: 'contactPhone', label: 'טלפון ליצירת קשר', type: 'tel' }
    ];

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>יצירת מלגה חדשה</h2>
                <form onSubmit={handleSubmit}>
                    {formFields.map(field => (
                        <div key={field.name} className={styles.formGroup}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {field.type === 'select' ? (
                                <select
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                    required={field.required}
                                >
                                    {field.options.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                    required={field.required}
                                    placeholder={field.placeholder}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                    required={field.required}
                                    min={field.min}
                                    placeholder={field.placeholder}
                                />
                            )}
                        </div>
                    ))}
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? 'שומר...' : 'צור מלגה'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateScholarshipModal; 