import TermsPage from '../../components/TermsPage';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Bigdatia",
  description: "Technology consulting based on AI and data analysis.",
};

export default function TerminosYCondiciones() {
  return <TermsPage />;
}