import React, { useEffect } from 'react';
import { articles } from '../data';

const Articles: React.FC = () => {
  useEffect(() => {
    document.title = 'מאמרים | יורם שחר - מגשר מקצועי';
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 text-right">
      <h1 className="text-3xl font-bold text-primary mb-8">מאמרים בנושא גישור</h1>
      {articles.map((article) => (
        <article key={article.title} className="mb-10 pb-8 border-b border-gray-200 last:border-b-0">
          <h2 className="text-xl font-semibold text-primary mb-3">{article.title}</h2>
          <p className="text-gray-700 leading-relaxed">{article.content}</p>
        </article>
      ))}
    </div>
  );
};

export default Articles;
