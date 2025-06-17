import { VideoProvider } from '../contexts/VideoContext';
import LanguageProvider from '../contexts/LanguageContext';
import AppContent from './AppContent'; // Nuevo componente
import "./globals.css";

export const metadata = {
  title: "BigDatia",
  description: "Medimos y elevamos tus probabilidades de éxito con análisis inteligente y una visión estratégica, transformando objetivos en resultados concretos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-visby-regular antialiased">
        <LanguageProvider>
          <VideoProvider>
            <AppContent>{children}</AppContent>
          </VideoProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}