import type { Metadata } from 'next';
import PaymentsPage from "@/components/PaymentsPage";

export const metadata: Metadata = {
  title: "Pagos - Bigdatia",
  description: "Asesoría tecnológica basada en IA y análisis de datos.",
};

export default function Pagos() {
  return <PaymentsPage />;
}