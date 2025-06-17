"use client";

import { createContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageContextProps {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: 'es',
  setLanguage: () => {},
});

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<'es' | 'en'>('es');
  const pathname = usePathname();
  const router = useRouter();

  const getInitialLanguage = (): 'es' | 'en' => {
    if (typeof window === 'undefined') return 'es';
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'es' || savedLanguage === 'en') {
      return savedLanguage;
    }
    const browserLanguage = navigator.language || navigator.languages?.[0] || 'es';
    if (browserLanguage.startsWith('en')) {
      return 'en';
    }
    return 'es';
  };

  useEffect(() => {
    const initialLanguage = getInitialLanguage();
    setLanguageState(initialLanguage);
  }, []);

  const setLanguage = (lang: 'es' | 'en') => {
    setLanguageState(lang);

    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      if (pathname === '/') {
        return;
      }

      const routeMap: { [key: string]: string } = {
        '/nosotros': '/about-us',
        '/about-us': '/nosotros',
        '/terminos-y-condiciones': '/terms-and-conditions',
        '/terms-and-conditions': '/terminos-y-condiciones',
        '/politica-de-devoluciones': '/refunds-policy',
        '/refunds-policy': '/politica-de-devoluciones',
        '/servicios': '/services',
        '/services': '/servicios',
        '/how-it-works': '/como-funciona',
        '/como-funciona': '/how-it-works',
        '/preguntas-frecuentes': '/frequently-asked-questions',
        '/frequently-asked-questions': '/preguntas-frecuentes',
        '/pagos': '/payments',
        '/payments': '/pagos',
        '/por-que-elegirnos': '/why-choose-us',
        '/why-choose-us': '/por-que-elegirnos',
        '/mision-y-vision': '/mission-vision',
        '/mission-vision': '/mision-y-vision',
      };

      const newPath = routeMap[pathname] || pathname;
      router.push(newPath);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}