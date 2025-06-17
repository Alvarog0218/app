import { Metadata } from 'next';
import MisionVisionPage from '../../components/MisionVisionPage';

export const metadata: Metadata = {
  title: "Mission & Vision - Bigdatia",
  description: "We measure and increase your chances of success with intelligent analysis and a strategic vision, transforming objectives into concrete results.",
};

export default function MisionVision() {
  return <MisionVisionPage />;
}