import React, { useEffect } from 'react';

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'אודות | יורם שחר - מגשר מקצועי';
  }, []);

  return (
    <article className="max-w-2xl mx-auto p-6 text-right">
      <h1 className="text-3xl font-bold text-primary mb-6">אודות יורם שחר</h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        יורם שחר, אב ל-8 ילדים מירושלים, מגשר מקצועי עם ניסיון של למעלה מ-20 שנה.
        מתמחה בפתרון סכסוכים משפחתיים, זוגיים, עסקיים וירושות. בעל גישה אנושית,
        מקצועית ומקרבת, ומאמין שכל סכסוך ניתן לפתרון בדרכי שלום.
      </p>
      <p className="text-gray-700 leading-relaxed">
        הגישה שלי משלבת בין הבנה עמוקה של דינמיקות אנושיות, ניסיון מעשי רב,
        וכלים מקצועיים לפתרון קונפליקטים — תוך שמירה על כבוד הצדדים, סודיות מלאה
        וחיסכון משמעותי בזמן ובעלויות לעומת הליך משפטי.
      </p>
    </article>
  );
};

export default About;
