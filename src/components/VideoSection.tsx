import Image from 'next/image';
import { RefObject, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { mediaFiles } from '../lib/translations';

interface VideoSectionProps {
  isMobile: boolean;
  showBackgroundImage: boolean;
  mobileBackground: string;
  currentVideo: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  handleVideoEnd: () => void;
}

export default function VideoSection({
  isMobile,
  showBackgroundImage,
  mobileBackground,
  currentVideo,
  videoRef,
  handleVideoEnd,
}: VideoSectionProps) {
  const { language } = useContext(LanguageContext);
  const media = mediaFiles[language];

  return (
    <section className="w-screen h-screen relative flex items-center justify-center">
      {showBackgroundImage ? (
        <section
          className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${media.backgroundImage})` }}
        >{media.introText}</section>
      ) : isMobile ? (
        <Image
          src={mobileBackground}
          alt="Background GIF"
          fill
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          unoptimized
          quality={100}
        />
      ) : (
        <video
          ref={videoRef}
          src={currentVideo}
          autoPlay
          muted
          onEnded={handleVideoEnd}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      )}
    </section>
  );
}