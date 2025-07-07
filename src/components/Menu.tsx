import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  handleMenuClick: (index: number) => void;
}

const menuVariants = {
  hidden: { x: '100vw', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'tween', duration: 0.5, ease: 'easeInOut' },
  },
  exit: {
    x: '100vw',
    opacity: 0,
    transition: { type: 'tween', duration: 0.5, ease: 'easeInOut' },
  },
};

const submenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export default function Menu({ isMenuOpen, setIsMenuOpen, handleMenuClick }: MenuProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language].secondaryMenu;
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const menuItems = [
    {
      label: t.home,
      hasSubmenu: false,
      submenu: [],
      path: '/',
    },
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
    //{
      //label: t.payments,
      //hasSubmenu: false,
      //path: language === 'es' ? '/pagos' : '/payments',
    //},
  ];

  const toggleSubmenu = (index: number) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-30"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-[#D4FC69] hover:text-white focus:outline-none cursor-pointer"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="text-[#D4FC69] text-2xl md:text-3xl space-y-8 text-center">
            {menuItems.map((item, index) => (
              <li key={item.label}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <FontAwesomeIcon icon={faAngleDown} className="w-4 h-4 ml-2 relative top-1" />
                    </button>
                    <AnimatePresence>
                      {openSubmenu === index && (
                        <motion.ul
                          className="text-[#D4FC69] text-xl md:text-2xl space-y-4 mt-4"
                          variants={submenuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          {(item.submenu ?? []).map((subItem) => (
                            <li key={subItem.label}>
                              <Link
                                href={subItem.path}
                                onClick={() => {
                                  handleMenuClick(index);
                                  setIsMenuOpen(false);
                                }}
                                className="hover:text-white transition-colors cursor-pointer"
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.path ?? '#'}
                    onClick={() => {
                      handleMenuClick(index);
                      setIsMenuOpen(false);
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}