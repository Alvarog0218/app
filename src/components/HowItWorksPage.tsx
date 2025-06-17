"use client";

import { useContext } from 'react';
import Image from 'next/image';
import { LanguageContext } from '../contexts/LanguageContext';
import { howItWorksContent } from '../lib/howItWorksContent';
import Link from 'next/link';

export default function HowItWorksPage() {
  const { language } = useContext(LanguageContext);
  const currentSections = howItWorksContent[language];

  return (
    <div className="flex w-[300vw] h-full">
      {/* Sección Intro */}
      <section
        className="w-screen min-h-screen flex justify-center pt-28"
        style={{ background: 'radial-gradient(circle at left center, rgb(94, 108, 56) -72%, rgb(19, 22, 28) 62%)' }}
      >
        <div className="flex flex-col w-[90%] border-t-1 border-white pt-8">
          <div className="relative flex flex-col md:flex-row items-center">
            <h3
              className="text-[2rem] md:text-5xl font-light text-[#d4fc6b] flex flex-col md:flex-row items-center text-center md:text-left font-visby-medium"
            >
              {currentSections.como_funciona.title}
              <span className="flex items-center md:flex-row -mt-5 md:-mt-0">
                <Image
                  src="/logo-2.webp"
                  alt="Logo"
                  width={150}
                  height={0}
                  style={{ height: 'auto' }}
                  className="object-contain w-[150px] md:w-[200px] mt-4 md:mt-2 md:ml-4"
                  priority
                  quality={100}
                />
                <span className="mt-2 md:mt-0 md:ml-2">{currentSections.como_funciona.sufix_title}</span>
              </span>
            </h3>
          </div>
          <div
            className="text-white text-xl mt-[34px]"
            style={{ lineHeight: '1.5' }}
          >
            <p>{currentSections.como_funciona.description}</p>
            {/* Nuevo div con dos columnas */}
            <div className="flex flex-col md:flex-row mt-24 gap-6">
              {/* Columna izquierda (más pequeña) */}


              <div className="flex-1 flex flex-col items-center content-center">
                <Image
                  src="/how_it_works.png" // Cambia esto por la ruta de tu imagen
                  alt="Example"
                  width={229}
                  height={200}
                  className="object-contain"
                />
                <Link
                  href={currentSections.cta.link}
                  className="inline-block border font-bold border-[#CBE850] text-white bg-[transparent] rounded-[8px] mt-4 px-4 py-2 hover:bg-[#CBE850] hover:text-black transition-colors duration-200 cursor-pointer"
                >
                  {currentSections.cta.label}
                </Link>
              </div>
              {/* Columna derecha (más grande) */}
              <div className="flex-[2] flex flex-col gap-6">
                {/* Lista de filas */}
                {currentSections.como_funciona.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 group hover:cursor-pointer mb-4"
                  >
                    <div className="w-[64px] h-[64px] flex-shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="text-white text-lg font-semibold transition-colors duration-200">
                        {item.question}
                      </h4>
                      <p className="text-white text-base mt-3">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}