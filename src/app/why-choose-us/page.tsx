import type { Metadata } from 'next'
import WhyChooseUsPage from "@/components/WhyChooseUsPage";

export const metadata: Metadata = {
  title: "Why choose us? - Bigdatia",
  description: "Our process is designed to ensure the effective implementation of data-driven and artificial intelligence solutions.",
};

export default function PorqueElegirnos() {
  return <WhyChooseUsPage />;
}