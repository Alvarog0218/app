"use client";

import { useContext } from 'react';
import Image from 'next/image';
import { LanguageContext } from '../contexts/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);

  const languages = [
    { code: 'es', name: 'Español', flag: '/flags/es.png' },
    { code: 'en', name: 'English', flag: '/flags/en.png' },
  ];

  return (
    <div className="relative inline-block">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
        className="appearance-none bg-transparent text-white py-2 pl-10 pr-8 focus:outline-none cursor-pointer"
      >
        {languages.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            className="bg-gray-800 text-white" // Fondo oscuro y texto blanco para las opciones
          >
            {lang.name}
          </option>
        ))}
      </select>
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <Image
          src={languages.find((lang) => lang.code === language)?.flag || '/flags/es.png'}
          alt={`${language} flag`}
          width={20}
          height={20}
          className="" // Sin bordes redondeados
        />
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <FontAwesomeIcon icon={faAngleDown} className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}