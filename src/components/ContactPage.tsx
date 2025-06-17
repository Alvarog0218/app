"use client";

import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { termsContent } from '../lib/termsContent';
import ContactForm from './ContactForm';

export default function ContactPage() {
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
        <div className="text-left text-white w-[900px] py-4 px-4">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}