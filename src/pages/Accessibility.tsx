import React, { useEffect } from 'react';

const Accessibility: React.FC = () => {
  useEffect(() => {
    document.title = 'נגישות | יורם שחר - מגשר מקצועי';
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 text-right">
      <h1 className="text-2xl font-bold text-primary mb-4">הצהרת נגישות</h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        האתר נבנה תוך הקפדה על עקרונות הנגישות לכלל האוכלוסייה, לרבות תמיכה בקוראי
        מסך, ניווט באמצעות מקלדת, ניגודיות צבעים מספקת וגדלי טקסט קריאים.
      </p>
      <p className="text-gray-700 leading-relaxed">
        במידה ונתקלתם בבעיית נגישות, נשמח שתפנו אלינו ונפעל לתקנה בהקדם.
        ניתן לפנות בטלפון 050-5508499 או באמצעות טופס יצירת הקשר באתר.
      </p>
    </div>
  );
};

export default Accessibility;
