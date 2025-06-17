"use client";

import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { aboutContent } from '../lib/aboutContent';

export default function MisionVisionPage() {
  const { language } = useContext(LanguageContext);
  const currentSections = aboutContent[language];

  return (
    <div className="flex w-[300vw] h-full">
      {/* Sección Misión */}
      <section
        className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${currentSections.mision.backgroundImage})` }}
      >
        <div className="text-center text-white">
          <h1
            className="uppercase text-7xl md:text-9xl xl:text-[200px] font-bold mb-4 font-visby-heavy"
            style={{ color: '#D5FC6B' }}
          >
            {language === 'es' ? 'Misión' : 'Mission'}
          </h1>
          <p className="text-white text-3xl max-w-2xl">
            {currentSections.mision.text}
          </p>
        </div>
      </section>

      {/* Sección Visión */}
      <section
        className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${currentSections.vision.backgroundImage})` }}
      >
        <div className="text-center text-white">
          <h1
            className="uppercase text-7xl md:text-9xl xl:text-[200px] font-bold mb-4 font-visby-heavy"
            style={{ color: '#D5FC6B' }}
          >
            {language === 'es' ? 'Visión' : 'Vision'}
          </h1>
          <p className="text-white text-3xl max-w-2xl">
            {currentSections.vision.text}
          </p>
        </div>
      </section>
    </div>
  );
}