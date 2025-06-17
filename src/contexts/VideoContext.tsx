"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface VideoContextType {
  showOnlyFirstLetter: boolean;
  setShowOnlyFirstLetter: (value: boolean) => void;
  showBackgroundImage: boolean;
  setShowBackgroundImage: (value: boolean) => void;
}

export const VideoContext = createContext<VideoContextType>({
  showOnlyFirstLetter: true,
  setShowOnlyFirstLetter: () => {},
  showBackgroundImage: true,
  setShowBackgroundImage: () => {},
});

export function VideoProvider({ children }: { children: ReactNode }) {
  const [showOnlyFirstLetter, setShowOnlyFirstLetter] = useState(true);
  const [showBackgroundImage, setShowBackgroundImage] = useState(true);

  // Leer el valor desde localStorage cuando el componente se monte
  useEffect(() => {
    const storedValue = localStorage.getItem("showBackgroundImage");
    setShowBackgroundImage(storedValue === "true");
  }, []);

  // Guardar el valor en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("showBackgroundImage", String(showBackgroundImage));
  }, [showBackgroundImage]);

  return (
    <VideoContext.Provider
      value={{
        showOnlyFirstLetter,
        setShowOnlyFirstLetter,
        showBackgroundImage,
        setShowBackgroundImage,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}
