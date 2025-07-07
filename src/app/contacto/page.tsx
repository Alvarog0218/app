import { redirect } from 'next/navigation';
import { Metadata } from "next";

// El metadata sigue siendo útil para los motores de búsqueda
export const metadata: Metadata = {
  title: "Contacto por WhatsApp - Bigdatia",
  description: "Chatea con nosotros directamente en WhatsApp.",
};

export default function ContactoPage() {
  // Reemplaza el número con tu número de WhatsApp
  // incluyendo el código de país (57 para Colombia), sin espacios ni símbolos
  redirect('https://wa.me/573150638446');

  // No es necesario retornar nada, la redirección interrumpe la renderización.
}