import type { Metadata } from 'next'
import PaymentsPage from "@/components/PaymentsPage";

export const metadata: Metadata = {
  title: "Payments - Bigdatia",
  description: "Technology consulting based on AI and data analysis.",
};

export default function Payments() {
  return <PaymentsPage />;
}
