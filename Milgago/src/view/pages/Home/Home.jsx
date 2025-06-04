import styles from "./Home.module.css";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaStar, FaUserGraduate, FaMagic, FaRegListAlt } from "react-icons/fa";
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

const features = [
  { icon: FaUserGraduate, title: "מאגר מלגות ענק", desc: "מאות מלגות ממוסדות ועמותות בכל הארץ, לכל תחום ולכל סטודנט." },
  { icon: FaMagic, title: "התאמה חכמה", desc: "מנוע התאמה מתקדם שמציג רק את המלגות שבאמת מתאימות לך." },
  { icon: FaRegListAlt, title: "הגשה פשוטה ומהירה", desc: "מילוי פרופיל קצר, קבלת תוצאות מיידית והגשה בלחיצת כפתור." }
];

const steps = [
  { icon: FaUserGraduate, label: "צור פרופיל" },
  { icon: FaMagic, label: "קבל התאמות" },
  { icon: FaRegListAlt, label: "הגש מועמדות" }
];

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const nextTestimonial = () => setTestimonialIdx((testimonialIdx + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroTextBox}>
          <h1 className={styles.heroTitle}>MilgaGo - הדרך החכמה למלגה שלך</h1>
          <p className={styles.heroSubtitle}>
            האתר שלנו נבנה במיוחד כדי לעזור לסטודנטים למצוא את המלגות המתאימות להם ביותר, בקלות ובמהירות.<br />
            בעזרת מנוע התאמה חכם, תוכל לקבל רשימה מותאמת אישית של מלגות, לחסוך זמן יקר ולמקסם את הסיכוי שלך לקבל תמיכה כלכלית.<br />
            כל שעליך לעשות הוא למלא פרופיל קצר, והמערכת תאתר עבורך את כל ההזדמנויות הרלוונטיות.<br />
            תן לנו לעזור לך להתמקד בלימודים – ואנחנו נדאג לשאר!
          </p>
          <button
            className={styles.bigPrimaryBtn}
            onClick={() => window.location.href = '/scholarships'}
          >
            מעבר לכל המלגות ב-מילגה-גו
          </button>
        </div>
        <div className={styles.heroImageBox}>
          {/* SVG Illustration */}
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="110" cy="170" rx="90" ry="10" fill="#e0f2fe" />
            <rect x="60" y="60" width="100" height="60" rx="12" fill="#2563eb" />
            <rect x="80" y="80" width="60" height="20" rx="6" fill="#fff" />
            <rect x="100" y="110" width="20" height="10" rx="3" fill="#fff" />
            <path d="M110 60 L110 40 M110 40 L100 50 M110 40 L120 50" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
            <circle cx="110" cy="35" r="5" fill="#facc15" />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.featuresSection}>
        {features.map((f, i) => (
          <div className={styles.featureCard} key={i}>
            <f.icon className={styles.featureIcon} />
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <hr className={styles.divider} />

      <h2 className={styles.bigSectionTitle}>איך זה עובד?</h2>
      <div className={styles.stepsRow}>
        {steps.map((s, i) => (
          <>
            <div className={styles.step} key={s.label}>
              <div className={styles.circle}>{i + 1}</div>
              <span className={styles.stepIcon}>{<s.icon />}</span>
              <p>{s.label}</p>
            </div>
            {i < steps.length - 1 && <FaArrowLeft className={styles.arrow} key={i + 'arrow'} />}
          </>
        ))}
      </div>

      <hr className={styles.divider} />

      {/* Testimonials */}
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
