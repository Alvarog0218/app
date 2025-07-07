"use client";

import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import Menu from '../components/Menu';
import NavigationButtons from '../components/NavigationButtons';
import { LanguageContext } from '../contexts/LanguageContext';
import { VideoContext } from '../contexts/VideoContext';

interface AppContentProps {
  children: React.ReactNode;
}

export default function AppContent({ children }: AppContentProps) {
  const { language } = useContext(LanguageContext);
  const { setShowOnlyFirstLetter } = useContext(VideoContext);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setCurrentSection(0);
    if (pathname !== '/') {
      setShowOnlyFirstLetter(false);
    }
  }, [pathname, setShowOnlyFirstLetter]);

  const handleMenuClick = (index: number) => {
    setCurrentSection(index);
    setIsMenuOpen(false);
  };

  const handleNext = () => {
    const maxSections = getSectionsForPage(pathname, language).length - 1;
    if (!isScrolling && currentSection < maxSections) {
      setIsScrolling(true);
      setCurrentSection((prev) => prev + 1);
      setTimeout(() => setIsScrolling(false), 800);
    }
  };

  const handlePrev = () => {
    if (!isScrolling && currentSection > 0) {
      setIsScrolling(true);
      setCurrentSection((prev) => prev - 1);
      setTimeout(() => setIsScrolling(false), 800);
    }
  };

  const getSectionsForPage = (path: string, lang: string): string[] => {
    const sectionMap: { [key: string]: string[] } = {
      '/': lang === 'es' ? ['inicio'] : ['home'],
      '/nosotros': lang === 'es' ? ['intro'] : ['intro'],
      '/about-us': lang === 'es' ? ['intro'] : ['intro'],
      '/terminos-y-condiciones': lang === 'es' ? ['terminos'] : ['terms'],
      '/terms-and-conditions': lang === 'es' ? ['terminos'] : ['terms'],
      '/politica-de-devoluciones': lang === 'es' ? ['devoluciones'] : ['returns'],
      '/refunds-policy': lang === 'es' ? ['devoluciones'] : ['returns'],
      '/servicios': lang === 'es' ? ['tecnologico', 'empresarial', 'electoral'] : ['technology', 'business', 'election'],
      '/services': lang === 'es' ? ['tecnologico', 'empresarial', 'electoral'] : ['technology', 'business', 'election'],
      '/how-it-works': lang === 'es' ? ['como_funciona'] : ['how_it_works'],
      '/como-funciona': lang === 'es' ? ['como_funciona'] : ['how_it_works'],
      '/preguntas-frecuentes': lang === 'es' ? ['faqs'] : ['faqs'],
      '/frequently-asked-questions': lang === 'es' ? ['faqs'] : ['faqs'],
      '/pagos': lang === 'es' ? ['payments'] : ['payments'],
      '/payments': lang === 'es' ? ['payments'] : ['payments'],
      '/por-que-elegirnos': lang === 'es' ? ['why_choose_us'] : ['why_choose_us'],
      '/why-choose-us': lang === 'es' ? ['why_choose_us'] : ['why_choose_us'],
      '/mission-vision': lang === 'es' ? ['mision', 'vision'] : ['mission', 'vision'],
      '/mision-y-vision': lang === 'es' ? ['mision', 'vision'] : ['mission', 'vision'],
    };
    return sectionMap[path] || ['inicio'];
  };

  const sections = getSectionsForPage(pathname, language);

  return (
    <div className="relative w-screen h-screen overflow-hidden custom-scroll">
      <div className="relative z-10 w-screen h-screen flex flex-col">
        <Header
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <Menu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          handleMenuClick={handleMenuClick}
        />
        <motion.div
          className="flex w-[300vw] flex-1"
          animate={{ x: `-${currentSection * 100}vw` }}
          transition={{ type: 'tween', duration: 0.8, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
        <NavigationButtons
          currentSection={currentSection}
          isScrolling={isScrolling}
          sections={sections}
          handleNext={handleNext}
          handlePrev={handlePrev}
          pathname={pathname}
        />
      </div>
    </div>
  );
}