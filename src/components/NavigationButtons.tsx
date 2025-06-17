"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';
import { useRouter } from 'next/navigation';

interface NavigationButtonsProps {
  currentSection: number;
  isScrolling: boolean;
  sections: string[];
  handleNext: () => void;
  handlePrev: () => void;
  pathname: string;
}

export default function NavigationButtons({
  currentSection,
  isScrolling,
  sections,
  handleNext,
  handlePrev,
  pathname,
}: NavigationButtonsProps) {
  const { language } = useContext(LanguageContext);
  const router = useRouter();
  const [pageLoadCount, setPageLoadCount] = useState(0);

  useEffect(() => {
    // Incrementar el contador cuando la página se carga
    setPageLoadCount(prev => prev + 1);
  }, [pathname]);

  const handleBack = () => {
    // Si es la primera página cargada o estamos en el home, ir al home
    if (pageLoadCount <= 1 || pathname === '/') {
      router.push('/');
    } else {
      router.back();
    }
  };

  const btnT = translations[language].buttons;

  const isFirstSectionOrSingle = currentSection === 0 || sections.length <= 1;
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return null;
  }

  if (sections.length <= 1) {
    return (
      <>
        <div className="fixed inset-y-0 left-0 right-0 flex justify-between items-center px-4 z-20 pointer-events-none">
          <div className="w-16"></div>
          <div className="w-16"></div>
        </div>
        <button 
          onClick={handleBack}
          className="fixed bottom-4 left-4 bg-transparent text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:bg-white hover:text-black transition pointer-events-auto z-30"
        >
          {btnT.back}
        </button>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-y-0 left-0 right-0 flex justify-between items-center px-4 z-20 pointer-events-none">
        <button
          onClick={handlePrev}
          className={`text-white text-[58px] shadow-lg transition pointer-events-auto ${
            currentSection === 0 || isScrolling
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:text-[#D4FC69] cursor-pointer'
          }`}
          disabled={currentSection === 0 || isScrolling}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>

        <button
          onClick={handleNext}
          className={`text-white text-[58px] shadow-lg transition pointer-events-auto ${
            currentSection === sections.length - 1 || isScrolling
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:text-[#D4FC69] cursor-pointer'
          }`}
          disabled={currentSection === sections.length - 1 || isScrolling}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>

      {isFirstSectionOrSingle ? (
        <button
          onClick={handleBack}
          className="fixed bottom-4 left-4 bg-transparent text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:bg-white hover:text-black transition pointer-events-auto z-30"
        >
          {btnT.back}
        </button>
      ) : (
        <button
          onClick={handlePrev}
          className="fixed bottom-4 left-4 bg-transparent text-white text-lg font-semibold py-2 px-4 rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:bg-white hover:text-black transition pointer-events-auto z-30"
        >
          {btnT.back}
        </button>
      )}
    </>
  );
}