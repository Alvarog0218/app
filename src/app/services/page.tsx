import BusinessUnitsPage from "@/components/BusinessUnitsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Units - Bigdatia",
  description: "Technology consulting based on AI and data analysis.",
};


export default function UnidadesDeNegocio() {
  return <BusinessUnitsPage />;
}