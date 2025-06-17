"use client";

import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { termsContent } from '../lib/termsContent';

export default function TermsPage() {
  const { language } = useContext(LanguageContext);

  const returnsSection = termsContent[language].find(
    (section) => section.id === 'terminos'
  );

  if (!returnsSection) return null; // Por seguridad, en caso de que no exista

  return (
    <div className="flex w-[200vw] h-full">
      <section
        className="w-screen h-[calc(100vh-120px)] mt-[120px] flex items-start justify-center overflow-y-auto bg-black custom-scroll"
      >
        <div className="text-left text-white max-w-[700px] py-4 px-4">
          <h1
            className="uppercase text-xl font-bold mb-4 font-visby-extrabold"
            style={{ color: '#D5FC6B' }}
          >
            {returnsSection.title}
          </h1>
          <div className="prose prose-invert">
            {returnsSection.content}
          </div>
        </div>
      </section>
    </div>
  );
}