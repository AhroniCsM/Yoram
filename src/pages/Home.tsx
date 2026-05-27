import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { testimonials, services, faqs, PHONE_DISPLAY, PHONE_TEL } from '../data';

const photos = ['/yoram1.jpg', '/yoram2.jpg', '/yoram3.jpg'];

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'יורם שחר - מגשר מקצועי | גישור משפחתי, זוגי ועסקי בירושלים';
  }, []);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    website: '', // honeypot — must stay empty
  });

  const nextPhoto = () => setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('תודה על פנייתך! נחזור אליך בהקדם.');
        setFormData({ name: '', phone: '', email: '', message: '', website: '' });
      } else if (response.status === 429) {
        alert('נשלחו יותר מדי פניות. אנא נסה שוב בעוד כשעה.');
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      alert('מצטערים, אירעה שגיאה בשליחת הטופס. אפשר להתקשר ישירות: ' + PHONE_DISPLAY);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                אב ל-8 ילדים מירושלים, מגשר מקצועי עם ניסיון של למעלה מ-20 שנה,
                מתמחה בפתרון סכסוכים משפחתיים, זוגיים ועסקיים. הגישה הייחודית שלי משלבת
                הבנה עמוקה של דינמיקות משפחתיות עם כלים מעשיים לפתרון קונפליקטים —
                כדי להגיע לעמק השווה בין כולם.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-secondary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all"
                onClick={scrollToContact}
              >
                קבע פגישת ייעוץ חינם
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
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      aria-label="תמונה קודמת"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                    >
                      <ChevronLeftIcon className="w-6 h-6 text-primary" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      aria-label="תמונה הבאה"
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
                      aria-label={`עבור לתמונה ${index + 1}`}
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
          aria-hidden="true"
        >
          <ArrowDownIcon className="w-8 h-8 text-primary animate-bounce" />
        </motion.div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white" aria-labelledby="services-heading">
        <div className="container mx-auto px-4">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
            תחומי הגישור
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            למעלה מ-20 שנות ניסיון בפתרון סכסוכים בשלוש זירות עיקריות
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-5xl mb-4" aria-hidden="true">{service.emoji}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50" aria-labelledby="testimonials-heading">
        <div className="container mx-auto px-4">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            מה אומרים עלי
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold ml-4"
                    aria-hidden="true"
                  >
                    {testimonial.initials}
                  </div>
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            שאלות נפוצות
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.question} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    className="w-full text-right p-4 bg-gray-50 hover:bg-gray-100 font-semibold text-primary flex justify-between items-center transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span aria-hidden="true" className="text-2xl text-secondary">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div id={`faq-panel-${idx}`} className="p-4 text-gray-700 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-50" aria-labelledby="contact-heading">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <img
              src="/yoram2.jpg"
              alt="יורם שחר"
              width={256}
              height={256}
              loading="lazy"
              decoding="async"
              className="w-64 h-64 rounded-full shadow-lg object-cover border-4 border-white"
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-center md:text-right text-primary mb-8">
              צור קשר
            </h2>
            <div className="flex flex-col items-center mb-8">
              <a
                href={`tel:${PHONE_TEL}`}
                className="bg-secondary text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-opacity-90 transition-all mb-4 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                התקשר עכשיו: {PHONE_DISPLAY}
              </a>
              <p className="text-gray-600 text-center">או השאר פרטים ואחזור אליך בהקדם</p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto" noValidate>
              {/* Honeypot — hidden from real users, bots fill it */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label>
                  אל תמלא שדה זה:
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">שם מלא</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">טלפון</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-gray-700 mb-2">אימייל</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-gray-700 mb-2">הודעה</label>
                  <textarea
                    id="message"
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
                  disabled={submitting}
                  className="bg-secondary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'שולח…' : 'שלח הודעה'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
