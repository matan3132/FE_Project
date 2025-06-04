import { setupAdminUser } from 'file:///' + process.cwd().replace(/\\/g, '/') + '/src/utils/adminSetup.mjs';

const userId = 'DBk3Q5OpgnX1cdr0ymtSUEOnhmx2';

async function setAdmin() {
    try {
        const success = await setupAdminUser(userId);
        console.log(success ? 'User successfully set as admin' : 'Failed to set user as admin');
    } catch (error) {
        console.error('Error:', error);
    }
}

setAdmin(); 