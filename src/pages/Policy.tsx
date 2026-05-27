import React, { useEffect } from 'react';

const Policy: React.FC = () => {
  useEffect(() => {
    document.title = 'מדיניות האתר | יורם שחר - מגשר מקצועי';
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 text-right">
      <h1 className="text-2xl font-bold text-primary mb-4">מדיניות האתר ותקנון</h1>
      <p className="text-gray-700 leading-relaxed">
        כל הזכויות שמורות ליורם שחר. אין להעתיק, לשכפל או להשתמש בתכני האתר ללא אישור מראש.
        האתר פועל בהתאם לחוקי מדינת ישראל ומתחייב לשמור על פרטיות המשתמשים.
        פרטים שנמסרים בטופס יצירת הקשר משמשים אך ורק להחזרת פנייה ולא יועברו לצד שלישי.
      </p>
    </div>
  );
};

export default Policy;
