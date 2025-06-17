import CtPage from '../../components/ContactPage';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obtener una llamada gratuita - Bigdatia",
  description: "Recibe una llamada de uno de nuestros consultores.",
};

export default function ContactoPage() {
  return <CtPage />;
}