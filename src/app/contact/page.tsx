import CtPage from '../../components/ContactPage';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Free Call - Bigdatia",
  description: "Get a call from one of our consultants.",
};


export default function ContactPage() {
  return <CtPage />;
}