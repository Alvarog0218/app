import TermsPage from '../../components/TermsPage';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones - Bigdatia",
  description: "Asesoría tecnológica basada en IA y análisis de datos.",
};

export default function TerminosYCondiciones() {
  return <TermsPage />;
}