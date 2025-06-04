import { db } from '../firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function setupAdminUser(userId) {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        await setDoc(userRef, {
            ...(userDoc.exists() ? userDoc.data() : {}),
            role: 'admin',
            ...(userDoc.exists() ? {} : { createdAt: new Date() })
        }, { merge: true });

        return true;
    } catch (error) {
        console.error('Error setting up admin user:', error);
        return false;
    }
} 