"use client";

import { useContext } from 'react';
import Image from 'next/image';
import { LanguageContext } from '../contexts/LanguageContext';
import { aboutContent } from '../lib/aboutContent';
import Link from 'next/link';

export default function AboutPage() {
  const { language } = useContext(LanguageContext);
  const currentSections = aboutContent[language];

  return (
    <div className="flex w-[300vw] h-full">
      {/* Sección Intro */}
      <section
        className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${currentSections.intro.backgroundImage})` }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative w-[200px] h-auto md:w-[300px] lg:w-[900px]">
            <Image
              src="/logo-2.webp" // Ruta de tu logo
              alt="Logo"
              width={900} // Ancho base
              height={0} // Altura automática
              style={{ height: 'auto' }}
              className="object-contain"
              priority
              quality={100}
            />
          </div>
          <p
            className="text-white text-3xl mt-[34px] w-[90%] md:w-[70%] lg:w-[800px]"
            style={{ lineHeight: '1.5' }}
          >
            {currentSections.intro.text}
          </p>
          <Link
            href={currentSections.cta.link}
            className="inline-block border font-bold border-[#CBE850] text-white bg-[transparent] rounded-[8px] mt-4 px-4 py-2 hover:bg-[#CBE850] hover:text-black transition-colors duration-200 cursor-pointer"
          >
            {currentSections.cta.label}
          </Link>
        </div>
      </section>
    </div>
  );
}