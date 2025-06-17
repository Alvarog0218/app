import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';

export default function AboutSection() {
  const { language } = useContext(LanguageContext);
  const aboutText = translations[language].terms_conditions;

  return (
    <section className="w-screen h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">{aboutText}</h1>
    </section>
  );
}