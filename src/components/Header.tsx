"use client";

import Image from 'next/image';
import Link from 'next/link';
import LanguageSelector from './LanguageSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';
import { VideoContext } from '@/contexts/VideoContext';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const { showOnlyFirstLetter } = useContext(VideoContext);
  const { language } = useContext(LanguageContext);
  const t = translations[language].secondaryMenu;
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null); // Estado para submenús

  const menuItems = [
    {
      label: t.nosotros,
      hasSubmenu: true,
      submenu: [
        {
          label: t.aboutUs,
          path: language === 'es' ? '/nosotros' : '/about-us',
        },
        {
          label: t.misionVision,
          path: language === 'es' ? '/mision-y-vision' : '/mission-vision',
        },
        {
          label: t.howItWorks,
          path: language === 'es' ? '/como-funciona' : '/how-it-works',
        },
        {
          label: t.whyChooseUs,
          path: language === 'es' ? '/por-que-elegirnos' : '/why-choose-us',
        },
        {
          label: t.faqs,
          path: language === 'es' ? '/preguntas-frecuentes' : '/frequently-asked-questions',
        },
      ],
    },
    {
      label: t.businessUnits,
      hasSubmenu: false,
      submenu: [],
      path: language === 'es' ? '/servicios' : '/services',
    },
    ///{
      ///label: t.payments,
      ///hasSubmenu: false,
      ///path: language === 'es' ? '/pagos' : '/payments',
    ///},
  ];

  // Función para alternar submenús
  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <header className="absolute top-0 left-0 w-full flex justify-between items-center p-4 z-20">
      <Link href="/" passHref>
        <div
          className={`relative transition-all duration-500 ${
            showOnlyFirstLetter ? 'w-12 max-[340px]:w-9 max-md:w-9 overflow-hidden' : 'w-48 max-[340px]:w-30 max-md:w-35'
          }`}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={192}
            height={64}
            priority
            className="logo w-48 max-[340px]:w-30 max-md:w-35"
          />
        </div>
      </Link>
      <div className="relative flex items-center space-x-4">
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <div key={item.label} className="relative group">
              <div
                className="flex items-center space-x-1 text-white cursor-pointer hover:text-gray-300"
                onClick={() => item.hasSubmenu && toggleSubmenu(item.label)} // Manejar clic para submenús
              >
                {item.path ? (
                  <Link href={item.path}>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {item.hasSubmenu && (
                  <FontAwesomeIcon icon={faAngleDown} className="w-4 h-4" />
                )}
              </div>
              {item.hasSubmenu && (
                <div
                  className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg transition-all duration-200 ${
                    openSubmenu === item.label ? 'opacity-100 visible' : 'opacity-0 invisible'
                  } md:group-hover:opacity-100 md:group-hover:visible`} // Corregida la condición
                >
                  {item.submenu?.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.path ?? '#'}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setOpenSubmenu(null)} // Cerrar submenú al seleccionar
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <LanguageSelector />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none cursor-pointer"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
}