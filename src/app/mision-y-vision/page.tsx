import { Metadata } from 'next';
import MisionVisionPage from '../../components/MisionVisionPage';

export const metadata: Metadata = {
  title: "Misión & Visión - Bigdatia",
  description: "Medimos y elevamos tus probabilidades de éxito con análisis inteligente y una visión estratégica, transformando objetivos en resultados concretos.",
};

export default function MisionVision() {
  return <MisionVisionPage />;
}