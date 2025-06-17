import { Metadata } from 'next';
import AboutPage from '../../components/AboutPage';

export const metadata: Metadata = {
  title: "About Us - Bigdatia",
  description: "We measure and increase your chances of success with intelligent analysis and a strategic vision, transforming objectives into concrete results.",
};

export default function AboutUs() {
  return <AboutPage />;
}