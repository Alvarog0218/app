import { Metadata } from 'next';
import AboutPage from '../../components/AboutPage';

export const metadata: Metadata = {
  title: "Conócenos - Bigdatia",
  description: "Medimos y elevamos tus probabilidades de éxito con análisis inteligente y una visión estratégica, transformando objetivos en resultados concretos.",
};

export default function Conocenos() {
  return <AboutPage />;
}