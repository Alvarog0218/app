"use client";

import { useContext } from 'react';
import Image from 'next/image';
import { LanguageContext } from '../contexts/LanguageContext';
import { businessUnitContent } from '../lib/businessUnitContent';
import Link from 'next/link';

export default function BusinessUnitsPage() {
  const { language } = useContext(LanguageContext);
  const currentSections = businessUnitContent[language];

  return (
    <div className="flex w-[300vw] h-full">
      {/* Sección Intro */}
      <section
        className="w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{ background: 'linear-gradient(90deg, rgba(94,108,56,1) 0%, rgba(21,16,10,1) 53%)' }}
      >
        <div className="flex flex-col items-center text-center max-lg:pt-28">
          <div className="relative w-[200px] h-auto md:w-[300px] lg:w-[900px] flex flex-col lg:flex-row items-center lg:items-start justify-center">
            <Image
              src="/logo-2.webp" // Ruta de tu logo
              alt="Logo"
              width={400} // Ancho base
              height={0} // Altura automática
              style={{ height: 'auto' }}
              className="object-contain"
              priority
              quality={100}
            />
            <h3 className='font-visby-heavy lg:text-7xl md:text-5xl sm:text-4xl text-3xl font-bold text-[#d4fc6b] ml-3 lg:mt-2'>{currentSections.tecnologico.title}</h3>
          </div>
          <div
            className="text-white text-2xl md:text-3xl mt-24 w-[90%] md:w-[70%] lg:w-[900px]"
            style={{ lineHeight: '1.5' }}
          >
            <div className="bg-gradient-to-r from-[#42492b] to-[#161310] p-6 rounded-lg text-left"
              style={{ boxShadow: '4px 4px 8px 2px #00000082' }}>
              {currentSections.tecnologico.text}
            </div>
            <Link
              href={currentSections.cta.link}
              className="inline-block border border-[#CBE850] text-[#CBE850] bg-[transparent] rounded-[8px] mt-4 px-4 py-2 hover:bg-[#CBE850] hover:text-black transition-colors duration-200 cursor-pointer"
            >
              {currentSections.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Sección Misión */}
      <section
        className="w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{ background: 'radial-gradient(circle at left center, rgba(94,108,56,1) 10%, rgba(0,0,0,1) 62%)' }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative w-[200px] h-auto md:w-[300px] lg:w-[900px] flex flex-col lg:flex-row items-center lg:items-start justify-center">
            <Image
              src="/logo-2.webp" // Ruta de tu logo
              alt="Logo"
              width={400} // Ancho base
              height={0} // Altura automática
              style={{ height: 'auto' }}
              className="object-contain"
              priority
              quality={100}
            />
            <h3 className='font-visby-heavy lg:text-7xl md:text-5xl sm:text-4xl text-3xl font-bold text-[#d4fc6b] ml-3 lg:mt-2'>{currentSections.empresarial.title}</h3>
          </div>
          <div
            className="text-white text-2xl md:text-3xl mt-24 w-[90%] md:w-[70%] lg:w-[900px]"
            style={{ lineHeight: '1.5' }}
          >
            <div className="bg-gradient-to-r from-[#42492b] to-[#161310] p-6 rounded-lg text-left"
              style={{ boxShadow: '4px 4px 8px 2px #00000082' }}>
              {currentSections.empresarial.text}
            </div>
            <Link
              href={currentSections.cta.link}
              className="inline-block border border-[#CBE850] text-[#CBE850] bg-[transparent] rounded-[8px] mt-4 px-4 py-2 hover:bg-[#CBE850] hover:text-black transition-colors duration-200 cursor-pointer"
            >
              {currentSections.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Sección Visión */}
      <section
        className="w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat pt-26 md:pt-0"
        style={{ background: 'linear-gradient(90deg, rgba(94,108,56,1) 0%, rgba(21,16,10,1) 53%)' }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative w-[200px] h-auto md:w-[300px] lg:w-[900px] flex flex-col lg:flex-row items-center lg:items-start justify-center">
            <Image
              src="/logo-2.webp" // Ruta de tu logo
              alt="Logo"
              width={400} // Ancho base
              height={0} // Altura automática
              style={{ height: 'auto' }}
              className="object-contain"
              priority
              quality={100}
            />
            <h3 className='font-visby-heavy lg:text-7xl md:text-5xl sm:text-4xl text-3xl font-bold text-[#d4fc6b] ml-3 lg:mt-2'>{currentSections.electoral.title}</h3>
          </div>
          <div
            className="text-white text-2xl md:text-3xl mt-24 w-[90%] md:w-[70%] lg:w-[900px]"
            style={{ lineHeight: '1.5' }}
          >
            <div className="bg-gradient-to-r from-[#42492b] to-[#161310] p-6 rounded-lg text-left"
              style={{ boxShadow: '4px 4px 8px 2px #00000082' }}>
              {currentSections.electoral.text}
            </div>
            <Link
              href={currentSections.cta.link}
              className="inline-block border border-[#CBE850] text-[#CBE850] bg-[transparent] rounded-[8px] mt-4 px-4 py-2 hover:bg-[#CBE850] hover:text-black transition-colors duration-200 cursor-pointer"
            >
              {currentSections.cta.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}