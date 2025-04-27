import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Testimonial {
  name: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: ' דוד שלום',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'יורם עזר לנו בתקופה הקשה ביותר במשפחה שלנו. האדיבות והמקצועיות שלו עשו את כל ההבדל. הוא הצליח ליצור אווירה של אמון וכבוד הדדי, וזה מה שאפשר לנו להגיע להסכמות שהיו טובות לכולם. מומלץ בחום לכל מי שמחפש מגשר אמיתי.'
  },
  {
    name: ' שני גינזברג ',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    text: 'בזכות התיווך של יורם, מצאנו פתרון שכבד את כל המעורבים. הוא הביא איתו ניסיון רב, סבלנות אין-סופית, ויכולת הקשבה יוצאת דופן. מה שהכי הרשים אותי היה היכולת שלו להבין את הצרכים של כל צד ולמצוא את הדרך הנכונה לפתרון.'
  },
  {
    name: ' אור אברהם ',
    image: 'https://randomuser.me/api/portraits/men/10.jpg',
    text: 'יורם ליווה אותנו בתהליך גירושין מורכב. הוא הצליח לשמור על אווירה מכבדת ומקצועית לאורך כל הדרך. בזכות הגישה שלו, הצלחנו להגיע להסכמות שהיו טובות לשני הצדדים ולשמור על יחסים טובים למען הילדים.'
  },
  {
    name: 'אלונה דהן ',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
    text: 'כמנהל עסק משפחתי, פניתי ליורם לעזרה בסכסוך בין השותפים. הוא הצליח להביא אותנו להבנות חדשות ולשמור על היחסים המשפחתיים. הגישה המקצועית שלו וההבנה העמוקה בדינמיקות משפחתיות עזרו לנו לצאת מחוזקים מהמשבר.'
  }
];

const photos = [
  "/yoram1.jpg"
];

const articles = [
  {
    title: 'גישור ככלי לפתרון סכסוכים',
    content: 'גישור הוא תהליך יישוב סכסוכים בו צד שלישי ניטרלי מסייע לצדדים להגיע להסכמה משותפת. הגישור מאפשר דיאלוג פתוח, חוסך זמן וכסף, ומסייע לשמור על יחסים תקינים גם לאחר הסכסוך.'
  },
  {
    title: 'סכסוכי ירושה – איך מתמודדים?',
    content: 'סכסוכי ירושה נפוצים במשפחות רבות. גישור בתחום זה מסייע לצדדים להגיע להסכמות הוגנות, תוך שמירה על כבוד המשפחה ומניעת הליכים משפטיים ממושכים.'
  },
  {
    title: 'הדרך לשלום בין אנשים',
    content: 'סכסוכים בין אנשים יכולים להיגרם ממגוון סיבות. גישור מקצועי מסייע להבין את הצרכים של כל צד, לבנות אמון ולמצוא פתרון שמקובל על כולם.'
  }
];

function PolicyPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-right">
      <h2 className="text-2xl font-bold mb-4">מדיניות האתר ותקנון</h2>
      <p>כל הזכויות שמורות ליורם שחר. אין להעתיק, לשכפל או להשתמש בתכני האתר ללא אישור מראש. האתר פועל בהתאם לחוקי מדינת ישראל ומתחייב לשמור על פרטיות המשתמשים.</p>
    </div>
  );
}

function AccessibilityPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-right">
      <h2 className="text-2xl font-bold mb-4">הצהרת נגישות</h2>
      <p>האתר נבנה תוך הקפדה על עקרונות הנגישות לכלל האוכלוסייה. במידה ונתקלתם בבעיה, אנא פנו אלינו ונפעל לתקנה בהקדם.</p>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-right">
      <h2 className="text-2xl font-bold mb-4">אודות</h2>
      <p>יורם שחר, מגשר מקצועי עם ניסיון של למעלה מ-20 שנה, מתמחה בפתרון סכסוכים משפחתיים, עסקיים וירושה. בעל גישה אנושית, מקצועית ומקרבת, ומאמין שכל סכסוך ניתן לפתרון בדרכי שלום.</p>
    </div>
  );
}

function ArticlesPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-right">
      <h2 className="text-2xl font-bold mb-4">מאמרים</h2>
      {articles.map((article, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
}

const App: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [page, setPage] = useState<'home'|'policy'|'accessibility'|'about'|'articles'>('home');

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('תודה על פנייתך! נחזור אליך בהקדם.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('מצטערים, אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (page !== 'home') {
    if (page === 'policy') return <PolicyPage />;
    if (page === 'accessibility') return <AccessibilityPage />;
    if (page === 'about') return <AboutPage />;
    if (page === 'articles') return <ArticlesPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-green-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-20"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/handshake.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-right">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6"
              >
                יורם שחר, עוזר לאנשים למצוא שקט נפשי - ביחד
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto"
              >
                יורם שחר, אב ל-8 ילדים מירושלים, מגשר מקצועי עם ניסיון של למעלה מ-20 שנה, מתמחה בפתרון סכסוכים משפחתיים, זוגיים ועסקיים. הגישה הייחודית שלי משלבת הבנה עמוקה של דינמיקות משפחתיות עם כלים מעשיים לפתרון קונפליקטים.
                <br /><br />
                אני מאמין שכל סכסוך יכול להיפתר בדרכי שלום, וכי המפתח להצלחה טמון ביצירת תקשורת פתוחה וכנה בין הצדדים. בעבודתי אני משלב בין ניסיון מעשי רב, הכשרה מקצועית מעמיקה, ורגישות אנושית גבוהה.
                <br /><br />
                כדי להגיע לעמק השווה בין כולם
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                קבע פגישת ייעוץ חינם היום
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:w-1/2 flex flex-col items-center"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={photos[currentPhotoIndex]}
                  alt="יורם שחר"
                  className="w-full h-full object-cover"
                />
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                    >
                      <ChevronLeftIcon className="w-6 h-6 text-primary" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                    >
                      <ChevronRightIcon className="w-6 h-6 text-primary" />
                    </button>
                  </>
                )}
              </div>
              {photos.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentPhotoIndex ? 'bg-secondary' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDownIcon className="w-8 h-8 text-primary animate-bounce" />
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">מה אומרים עלי</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <img src="/yoram2.jpg" alt="יורם שחר" className="w-64 h-64 rounded-full shadow-lg object-cover border-4 border-white" />
          </div>
          <div className="md:w-1/2 w-full">
            <h2 className="text-3xl font-bold text-center md:text-right text-primary mb-12">צור קשר</h2>
            <div className="flex flex-col items-center mb-8">
              <a
                href="tel:+972505508499"
                className="bg-secondary text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-opacity-90 transition-all mb-4 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                התקשר עכשיו: 050-5508499
              </a>
              <p className="text-gray-600 text-center">או השאר פרטים ואחזור אליך בהקדם</p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">שם מלא</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">טלפון</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">אימייל</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">הודעה</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="bg-secondary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  שלח הודעה
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">יורם שחר</h3>
              <p className="mt-2">מגשר מקצועי</p>
            </div>
            <div className="text-center md:text-right">
              <a href="tel:+972505508499" className="hover:text-secondary transition-colors">
                <p>טלפון: 050-5508499</p>
              </a>
              <p>אימייל: contact@yoramshahar.com</p>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <button onClick={() => setPage('policy')} className="underline hover:text-secondary">מדיניות האתר</button>
              <button onClick={() => setPage('accessibility')} className="underline hover:text-secondary">נגישות</button>
              <button onClick={() => setPage('about')} className="underline hover:text-secondary">אודות</button>
              <button onClick={() => setPage('articles')} className="underline hover:text-secondary">מאמרים</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
