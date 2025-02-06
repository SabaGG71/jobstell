// import Features from "./_components/Features";
import EnglishSection from "./_components/EnglishSection";
import FeaturesSection from "./_components/FeaturesSection";
import Header from "./_components/Header";
import Chatbot from "./_components/Chatbot";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      {/* <Features /> */}
      <FeaturesSection />
      <EnglishSection />
      <Chatbot />
    </>
  );
}
