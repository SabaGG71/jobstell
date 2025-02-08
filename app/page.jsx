import EnglishSection from "./_components/EnglishSection";
import FeaturesSection from "./_components/FeaturesSection";
import Header from "./_components/Header";
import Chatbot from "./_components/Chatbot";
import Hero from "./_components/Hero";
import HrSection from "./_components/HrSection";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeaturesSection />
      <EnglishSection />
      <HrSection />
      <Chatbot />
    </>
  );
}
