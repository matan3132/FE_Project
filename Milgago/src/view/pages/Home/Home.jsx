import styles from "./Home.module.css";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import logo from "../../../assets/milgago-logo.png";

const testimonials = [
  {
    text: "מצאתי מלגה מושלמת תוך שבוע! המערכת ממש קלה לשימוש וחסכה לי המון זמן.",
    author: "שיר, אוניברסיטת בן-גוריון",
    avatar: logo,
    rating: 5
  },
  {
    text: "לא האמנתי שאמצא מלגה שמתאימה בדיוק לפרופיל שלי. ממליץ לכל סטודנט!",
    author: "דניאל, הטכניון",
    avatar: logo,
    rating: 4
  },
  {
    text: "המערכת עזרה לי להבין אילו מלגות רלוונטיות אליי. השירות פשוט מעולה.",
    author: "נועה, אוניברסיטת תל אביב",
    avatar: logo,
    rating: 5
  }
];

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const nextTestimonial = () => setTestimonialIdx((testimonialIdx + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length);

  return (
    <div className={styles.container}>
      <div className={styles.articleBox}>
        <h1 className={styles.heroTitle}>MilgaGo - הדרך החכמה למלגה שלך</h1>
        <p className={styles.heroSubtitle}>
          האתר שלנו נבנה במיוחד כדי לעזור לסטודנטים למצוא את המלגות המתאימות להם ביותר, בקלות ובמהירות. <br />
          בעזרת מנוע התאמה חכם, תוכל לקבל רשימה מותאמת אישית של מלגות, לחסוך זמן יקר ולמקסם את הסיכוי שלך לקבל תמיכה כלכלית. <br />
          כל שעליך לעשות הוא למלא פרופיל קצר, והמערכת תאתר עבורך את כל ההזדמנויות הרלוונטיות. <br />
          תן לנו לעזור לך להתמקד בלימודים – ואנחנו נדאג לשאר!
        </p>
      </div>

      <button
        className={styles.bigPrimaryBtn}
        onClick={() => window.location.href = '/scholarships'}
        style={{ margin: '2rem auto 1.5rem auto', display: 'block' }}
      >
        מעבר לכל המלגות ב-מילגה-גו
      </button>

      <hr className={styles.divider} />

      <h2 className={styles.bigSectionTitle}>איך זה עובד?</h2>
      <div className={styles.stepsRow}>
        <div className={styles.step}>
          <div className={styles.circle}>1</div>
          <p>צור פרופיל</p>
        </div>
        <FaArrowLeft className={styles.arrow} />
        <div className={styles.step}>
          <div className={styles.circle}>2</div>
          <p>קבל התאמות</p>
        </div>
        <FaArrowLeft className={styles.arrow} />
        <div className={styles.step}>
          <div className={styles.circle}>3</div>
          <p>הגש מועמדות</p>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.testimonialSlider}>
        <button className={styles.sliderArrow} onClick={prevTestimonial} aria-label="המלצה קודמת">
          <FaArrowRight className={styles.arrow} />
        </button>
        <div className={styles.testimonialContent}>
          <img
            src={testimonials[testimonialIdx].avatar}
            alt={testimonials[testimonialIdx].author}
            className={styles.testimonialAvatar}
          />
          <div className={styles.stars}>
            {[...Array(testimonials[testimonialIdx].rating)].map((_, i) => (
              <FaStar key={i} className={styles.star} />
            ))}
          </div>
          <p className={styles.testimonialText}>&quot;{testimonials[testimonialIdx].text}&quot;</p>
          <p className={styles.testimonialAuthor}>{testimonials[testimonialIdx].author}</p>
          <div className={styles.dots}>
            {testimonials.map((_, idx) => (
              <span
                key={idx}
                className={testimonialIdx === idx ? styles.activeDot : styles.dot}
                onClick={() => setTestimonialIdx(idx)}
                aria-label={`מעבר להמלצה ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        <button className={styles.sliderArrow} onClick={nextTestimonial} aria-label="המלצה הבאה">
          <FaArrowLeft className={styles.arrow} />
        </button>
      </div>
    </div>
  );
}
