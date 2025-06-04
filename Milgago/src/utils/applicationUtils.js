import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Creates a new scholarship application
 * @param {Object} applicationData - The application data
 * @param {string} applicationData.userId - The ID of the user applying
 * @param {string} applicationData.userEmail - The email of the user applying
 * @param {string} applicationData.fullName - The full name of the applicant
 * @param {string} applicationData.scholarshipId - The ID of the scholarship
 * @param {string} applicationData.scholarshipTitle - The title of the scholarship
 * @param {Object} [applicationData.additionalData] - Any additional data for the application
 * @returns {Promise<string>} The ID of the created application
 */
export const createScholarshipApplication = async (applicationData) => {
    try {
        const applicationRef = await addDoc(collection(db, 'scholarshipApplications'), {
            ...applicationData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            status: 'pending'
        });

        return applicationRef.id;
    } catch (error) {
        console.error('Error creating scholarship application:', error);
        throw error;
    }
};

/**
 * Validates the required fields for a scholarship application
 * @param {Object} applicationData - The application data to validate
 * @returns {Object} Object containing isValid boolean and error message if invalid
 */
export const validateApplicationData = (applicationData) => {
    const requiredFields = ['userId', 'userEmail', 'fullName', 'scholarshipId', 'scholarshipTitle'];

    for (const field of requiredFields) {
        if (!applicationData[field]) {
            return {
                isValid: false,
                error: `Missing required field: ${field}`
            };
        }
    }

    return { isValid: true };
}; 