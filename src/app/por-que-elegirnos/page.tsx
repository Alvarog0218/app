import WhyChooseUsPage from "@/components/WhyChooseUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "¿Por qué elegirnos? - Bigdatia",
  description: "Nuestro proceso está diseñado para garantizar la implementación efectiva de soluciones basadas en datos e inteligencia artificial.",
};

export default function PorqueElegirnos() {
  return <WhyChooseUsPage />;
}