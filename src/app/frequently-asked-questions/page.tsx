import FaqsPage from "@/components/FaqsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently asked questions - Bigdatia",
  description: "BIGDATIA is an innovation and technology ecosystem that uses artificial intelligence and data analysis to optimize decision-making in businesses, the sports sector, electoral processes, and technology. We connect strategy and technology to transform industries and drive growth.",
};

export default function Faqs() {
  return <FaqsPage />;
  }