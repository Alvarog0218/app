"use client";

import { useContext } from 'react';
import Image from 'next/image';
import { LanguageContext } from '../contexts/LanguageContext';
import { whyChooseUsContent } from '../lib/whyChooseUsContent';
import Link from 'next/link';

export default function WhyChooseUsPage() {
  const { language } = useContext(LanguageContext);

  const currentSections = whyChooseUsContent[language];

  return (
    <div className="flex w-[300vw] h-full">
      {/* Sección Intro */}
      <section
        className="w-screen min-h-screen flex justify-center pt-28"
        style={{ background: '#13161C' }}
      >
        <div className="flex flex-col w-[90%] border-t-1 border-white pt-8">
          <div className="relative flex flex-col md:flex-row items-center justify-center pt-2 md:pt-24">
            <h3
              className="text-[2rem] md:text-5xl font-extrabold text-[#d4fc6b] flex flex-col md:flex-row items-center text-center font-visby-heavy"
            >
              {currentSections.why_choose_us.title}
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
                <span className="mt-2 md:mt-0 md:ml-2">{currentSections.why_choose_us.sufix_title}</span>
              </span>
            </h3>
          </div>
          <div
            className="text-white text-xl my-0 md:my-[34px]"
            style={{ lineHeight: '1.5' }}
          >
            {/* Nuevo div con dos columnas */}
            <div
              style={{
                background: 'linear-gradient(90deg, rgba(19,22,28,0.2) 0%, rgba(94,108,56,0.2) 100%)',
              }}
              className="flex flex-col md:flex-row mt-10 lg:mt-24 border border-solid rounded-lg border-[#CBE850] p-10 lg:py-20 lg:px-20">
              {currentSections.why_choose_us.items.map((item, index) => (
                <div key={index} className={`flex-1 flex flex-col items-center content-center px-10 md:px-12 ${index === 1 ? 'md:border-x md:border-x-[#CBE850]' : ''}`}>
                  <div
                    className="flex flex-col items-center gap-4 mb-4"
                  >
                    {item.icon}
                    <h4 className="text-white text-lg font-semibold transition-colors duration-200 text-center">
                      {item.title}
                    </h4>
                    <p className="text-white text-base text-center">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex justify-center'>
              <Link
                href={currentSections.cta.link}
                className="inline-block border border-[#CBE850] text-[#CBE850] bg-[transparent] rounded-[8px] mt-4 px-4 py-2 hover:bg-[#CBE850] hover:text-black transition-colors duration-200 cursor-pointer"
              >
                {currentSections.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}