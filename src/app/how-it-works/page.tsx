import type { Metadata } from 'next'
import HowItWorksPage from "@/components/HowItWorksPage";

export const metadata: Metadata = {
  title: "How it works? - Bigdatia",
  description: "Our process is designed to ensure the effective implementation of data-driven and artificial intelligence solutions.",
};

export default function ComoFunciona() {
  return <HowItWorksPage />;
}