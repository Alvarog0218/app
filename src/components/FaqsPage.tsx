"use client";

import { useContext, useState } from 'react';
import Image from 'next/image';
import { LanguageContext } from '../contexts/LanguageContext';
import { faqsContent } from '../lib/faqsContent';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default function FaqsPage() {
  const { language } = useContext(LanguageContext);
  const currentSections = faqsContent[language];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex w-[300vw] h-full">
      <section
        className="w-screen min-h-screen flex justify-center pt-28"
        style={{ background: 'radial-gradient(circle at left center, rgb(94, 108, 56) -72%, rgb(19, 22, 28) 62%)' }}
      >
        <div className="flex flex-col w-[90%] border-t-1 border-white pt-8">
          <div className="text-white text-xl mt-[34px]" style={{ lineHeight: '1.5' }}>
            <div className="flex flex-col md:flex-row mt-24 gap-6">
              <div className="flex-1 flex flex-col items-start content-center">
                <h3 className="text-[2rem] md:text-4xl font-light text-[#d4fc6b] flex flex-col items-start text-left font-visby-heavy">
                  {currentSections.faqs.title}
                  <span className="flex">
                    <Image
                      src="/logo-2.webp"
                      alt="Logo"
                      width={150}
                      height={0}
                      style={{ height: 'auto' }}
                      className="object-contain w-[150px] md:w-[200px] mt-4 md:mt-2"
                      priority
                      quality={100}
                    />
                  </span>
                </h3>
                <p className="my-8">{currentSections.faqs.description}</p>
                <Link
                  href={currentSections.cta.link}
                  className="inline-block border font-bold border-[#CBE850] text-white bg-[transparent] rounded-[8px] mt-4 px-4 py-2 hover:bg-[#CBE850] hover:text-black transition-colors duration-200 cursor-pointer"
                >
                  {currentSections.cta.label}
                </Link>
              </div>
              <div className="flex-[2] flex flex-col gap-6">
                {currentSections.faqs.items.map((item, index) => (
                  <div
                    key={index}
                    className='w-full text-white border-b-2 border-white'
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex justify-between items-center py-4 text-left focus:outline-none cursor-pointer group"
                    >
                      <h4 className="text-lg font-semibold font-visby-bold">{item.question}</h4>
                      <span className="text-2xl transition-transform duration-300 group-hover:text-[#CBE850]">
                        {openIndex === index ? <FontAwesomeIcon icon={faAngleUp} className="w-4 h-4" /> : <FontAwesomeIcon icon={faAngleDown} className="w-4 h-4" />}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'
                        }`}
                    >
                      <p className="text-base pb-4">{item.answer}</p>
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