import React from 'react';
import styles from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/milgago-logo.png';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <img src={logo} alt="MilgaGo Logo" className={styles.logo} />
            <div className={styles.emoji}>🦄</div>
            <h1 className={styles.title}>404 - הדף לא נמצא!</h1>
            <p className={styles.text}>נראה שהגעת למקום שלא קיים...<br />
                אולי היוניקורן שלנו אכל את הדף הזה 🦄✨</p>
            <button className={styles.homeBtn} onClick={() => navigate('/')}>חזרה לדף הבית</button>
        </div>
    );
} 