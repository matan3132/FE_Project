import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import styles from './SuccessPage.module.css';

const SuccessPage = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.container}>
            <Confetti
                width={windowDimensions.width}
                height={windowDimensions.height}
                numberOfPieces={200}
                recycle={false}
                colors={['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#98FB98']}
            />
            <div className={styles.content}>
                <h1 className={styles.title}>ההרשמה הושלמה בהצלחה! 🎉</h1>
                <p className={styles.message}>תודה שנרשמת למלגה. נציג שלנו יצור איתך קשר בקרוב.</p>
                <button
                    className={styles.button}
                    onClick={() => navigate('/scholarships')}
                >
                    חזרה למלגות
                </button>
            </div>
        </div>
    );
};

export default SuccessPage; 