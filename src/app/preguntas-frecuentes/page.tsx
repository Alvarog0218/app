import FaqsPage from "@/components/FaqsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas frecuentes - Bigdatia",
  description: "BIGDATIA es un ecosistema de innovación y tecnología que utiliza inteligencia artificial y análisis de datos para optimizar la toma de decisiones en empresas, el sector deportivo, electoral y tecnológico. Conectamos estrategia y tecnología para transformar industrias y potenciar el crecimiento.",
};

export default function Faqs() {
  return <FaqsPage />;
}