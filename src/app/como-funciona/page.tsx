import HowItWorksPage from "@/components/HowItWorksPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "¿Cómo Funciona? - Bigdatia",
  description: "Nuestro proceso está diseñado para garantizar la implementación efectiva de soluciones basadas en datos e inteligencia artificial.",
};

export default function ComoFunciona() {
  return <HowItWorksPage />;
}