"use client";

import { useState, useRef, useEffect, useContext } from 'react';
import VideoSection from '../components/VideoSection';
import { LanguageContext } from '../contexts/LanguageContext';
import { VideoContext } from '../contexts/VideoContext';
import { mediaFiles } from '../lib/translations';

const firstGifDuration = {
  en: 5700,
  es: 7400
};

const secondGifDuration = {
  en: 12900,
  es: 12900
};

export default function Home() {
  const { language } = useContext(LanguageContext);
  const { setShowOnlyFirstLetter, showBackgroundImage, setShowBackgroundImage } = useContext(VideoContext); // Para actualizar el contexto
  const [currentVideo, setCurrentVideo] = useState<string>(mediaFiles[language].firstVideo);
  const [mobileBackground, setMobileBackground] = useState<string>(mediaFiles[language].mobileBackground);
  const [isSecondVideoPermanent, setIsSecondVideoPermanent] = useState(false);
  const [isSecondGifPlaying, setIsSecondGifPlaying] = useState(false);
  const firstGifTimerRef = useRef<NodeJS.Timeout | null>(null);
  const secondGifTimerRef = useRef<NodeJS.Timeout | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Función para limpiar todos los temporizadores
  const clearAllTimers = () => {
    if (firstGifTimerRef.current) {
      clearTimeout(firstGifTimerRef.current);
      firstGifTimerRef.current = null;
    }
    if (secondGifTimerRef.current) {
      clearTimeout(secondGifTimerRef.current);
      secondGifTimerRef.current = null;
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Actualizar el video cuando cambie el idioma
  useEffect(() => {
    if (!isSecondVideoPermanent && !showBackgroundImage) {
      setCurrentVideo(mediaFiles[language].firstVideo);
    } else if (isSecondVideoPermanent && !showBackgroundImage) {
      setCurrentVideo(mediaFiles[language].secondVideo);
    }
  }, [language, isSecondVideoPermanent, showBackgroundImage]);

  // Actualizar el gif cuando cambie el idioma
  useEffect(() => {
    if (isMobile && !isSecondGifPlaying && !showBackgroundImage) {
      setMobileBackground(mediaFiles[language].mobileBackground);
    } else if (isMobile && isSecondGifPlaying && !showBackgroundImage) {
      setMobileBackground(mediaFiles[language].secondMobileBackground);
    }
  }, [language, showBackgroundImage, isMobile, isSecondGifPlaying]);

  // Manejar la transición de GIFs en dispositivos móviles
  useEffect(() => {
    // Limpiar temporizadores existentes al cambiar el idioma o al cambiar el estado
    clearAllTimers();

    if (isMobile && !showBackgroundImage && !isSecondGifPlaying) {
      // Cuando se carga el primer GIF, configurar un temporizador para cambiar al segundo
      firstGifTimerRef.current = setTimeout(() => {
        setIsSecondGifPlaying(true);
        // No es necesario establecer mobileBackground aquí porque ya lo hace el efecto anterior
      }, firstGifDuration[language]);
    }

    return clearAllTimers;
  }, [isMobile, showBackgroundImage, language, isSecondGifPlaying]);

  // Manejar el final del segundo GIF
  useEffect(() => {
    // Limpiar temporizadores existentes
    if (secondGifTimerRef.current) {
      clearTimeout(secondGifTimerRef.current);
      secondGifTimerRef.current = null;
    }

    if (isSecondGifPlaying && !showBackgroundImage) {
      secondGifTimerRef.current = setTimeout(() => {
        setShowBackgroundImage(true);
        setIsSecondGifPlaying(false);
      }, secondGifDuration[language]);
    }

    return () => {
      if (secondGifTimerRef.current) {
        clearTimeout(secondGifTimerRef.current);
        secondGifTimerRef.current = null;
      }
    };
  }, [isSecondGifPlaying, showBackgroundImage, setShowBackgroundImage, language]);


  // Actualizar showOnlyFirstLetter en el contexto
  useEffect(() => {
    const shouldShowOnlyFirstLetter = !((currentVideo === mediaFiles.es.secondVideo || currentVideo === mediaFiles.en.secondVideo) && !isSecondVideoPermanent);
    setShowOnlyFirstLetter(shouldShowOnlyFirstLetter);
    console.log('shouldShowOnlyFirstLetter', shouldShowOnlyFirstLetter)
  }, [currentVideo, isSecondVideoPermanent, setShowOnlyFirstLetter]);

  const handleVideoEnd = () => {
    if (currentVideo === mediaFiles.es.firstVideo || currentVideo === mediaFiles.en.firstVideo) {
      setCurrentVideo(mediaFiles[language].secondVideo);
      setIsSecondVideoPermanent(true);
    } else if (currentVideo === mediaFiles.es.secondVideo || currentVideo === mediaFiles.en.secondVideo) {
      setShowBackgroundImage(true);
      setIsSecondVideoPermanent(false);
    }
  };

  useEffect(() => {
    if (videoRef.current && !isMobile && !showBackgroundImage) {
      videoRef.current.play().catch((error) => {
        console.log('Error playing video automatically:', error);
      });
    }
  }, [currentVideo, isMobile, showBackgroundImage]);

  return (
    <VideoSection
      isMobile={isMobile}
      showBackgroundImage={showBackgroundImage}
      mobileBackground={mobileBackground}
      currentVideo={currentVideo}
      videoRef={videoRef}
      handleVideoEnd={handleVideoEnd}
    />
  );
}