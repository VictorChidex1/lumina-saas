import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100">
      <Navbar />
      <Hero onGetStarted={() => {}} />
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        (Features & Pricing sections will go here)
      </div>
    </div>
  );
}
