import ReturnsPage from '../../components/ReturnsPage';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns Policy - Bigdatia",
  description: "Technology consulting based on AI and data analysis.",
};

export default function ReturnsPolicy() {
  return <ReturnsPage />;
}