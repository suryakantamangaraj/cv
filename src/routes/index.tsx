import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeroSection, ProcessSection, TestimonialsSection } from "../components/HomeSections";
import { LoadingScreen } from "../components/LoadingScreen";
import { QuickActions } from "../components/QuickActions";
import { ScrollToTop } from "../components/ScrollToTop";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen />
      <Header />
      <main>
        <HeroSection />
        <ProcessSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <ScrollToTop />
      <QuickActions />
    </div>
  );
}
