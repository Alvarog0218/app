import ReturnsPage from '../../components/ReturnsPage';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de devoluciones - Bigdatia",
  description: "Asesoría tecnológica basada en IA y análisis de datos.",
};

export default function PoliticaDeDevoluciones() {
  return <ReturnsPage />;
}