import BusinessUnitsPage from "@/components/BusinessUnitsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unidades de negocio - Bigdatia",
  description: "Asesoría tecnológica basada en IA y análisis de datos.",
};

export default function UnidadesDeNegocio() {
  return <BusinessUnitsPage />;
}