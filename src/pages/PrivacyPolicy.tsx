import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Printer,
  Download,
  Shield,
  Mail,
  ArrowRight,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "data-collection", title: "2. Data We Collect" },
    { id: "data-usage", title: "3. How We Use Your Data" },
    { id: "data-security", title: "4. Data Security" },
    { id: "legal-rights", title: "5. Your Legal Rights" },
    { id: "contact", title: "6. Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 100; // Offset for navbar
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 flex flex-col">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-indigo-950 dark:bg-black">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/privacy-hero.png"
              alt="Privacy Policy Background"
              className="w-full h-full object-cover opacity-50 dark:opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-950/80 to-indigo-950 dark:from-black/80 dark:via-black/80 dark:to-black"></div>
          </div>

          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-900/20 dark:bg-indigo-900/40 blur-3xl"></div>
            <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-800/20 dark:bg-indigo-800/30 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-800 text-indigo-300 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Legal
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-white">
                Privacy{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Policy
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 mb-10 leading-relaxed max-w-2xl mx-auto">
                Transparency and trust are core to Novluma. Here's how we handle
                your data.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Table of Contents (Desktop Sticky) */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4 pl-4 border-l-2 border-transparent">
                  On this page
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors border-l-2 ${
                        activeSection === section.id
                          ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-900/10"
                          : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 mb-4">
                    Need the raw file?
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 border-gray-200 dark:border-gray-700"
                    onClick={handlePrint}
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-grow max-w-3xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Last Updated
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {new Date().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handlePrint}
                  variant="ghost"
                  className="gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Printer className="w-4 h-4" />
                  Print Policy
                </Button>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none space-y-16">
                <section id="introduction" className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900 dark:text-white group">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm text-indigo-600 dark:text-indigo-400">
                      1
                    </span>
                    Introduction
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Welcome to Novluma. We respect your privacy and are
                    committed to protecting your personal data. This privacy
                    policy will inform you as to how we look after your personal
                    data when you visit our website (regardless of where you
                    visit it from) and tell you about your privacy rights and
                    how the law protects you.
                  </p>
                </section>

                <section id="data-collection" className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm text-indigo-600 dark:text-indigo-400">
                      2
                    </span>
                    Data We Collect
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    We may collect, use, store and transfer different kinds of
                    personal data about you which we have grouped together
                    follows:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Identity Data",
                        desc: "First name, last name, username",
                      },
                      {
                        title: "Contact Data",
                        desc: "Email, telephone, address",
                      },
                      {
                        title: "Technical Data",
                        desc: "IP address, browser, time zone",
                      },
                      { title: "Usage Data", desc: "How you use our website" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                      >
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="data-usage" className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm text-indigo-600 dark:text-indigo-400">
                      3
                    </span>
                    How We Use Your Data
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    We will only use your personal data when the law allows us
                    to. Most commonly, we will use your personal data in the
                    following circumstances:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "To perform the contract we are about to enter into with you.",
                      "Where it is necessary for our legitimate interests (or those of a third party).",
                      "Where we need to comply with a legal or regulatory obligation.",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                      >
                        <ArrowRight className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="data-security" className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm text-indigo-600 dark:text-indigo-400">
                      4
                    </span>
                    Data Security
                  </h2>
                  <div className="bg-indigo-50 dark:bg-indigo-900/10 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                    <div className="flex items-start gap-4">
                      <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 dark:text-gray-300 italic">
                        "We have put in place appropriate security measures to
                        prevent your personal data from being accidentally lost,
                        used or accessed in an unauthorized way."
                      </p>
                    </div>
                  </div>
                </section>

                <section id="legal-rights" className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm text-indigo-600 dark:text-indigo-400">
                      5
                    </span>
                    Your Legal Rights
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    Under certain circumstances, you have rights under data
                    protection laws in relation to your personal data:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Request access",
                      "Request correction",
                      "Request erasure",
                      "Object to processing",
                      "Request restriction",
                      "Request transfer",
                      "Withdraw consent",
                    ].map((right, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-800"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        {right}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="contact" className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-sm text-indigo-600 dark:text-indigo-400">
                      6
                    </span>
                    Contact Us
                  </h2>

                  <div className="bg-gray-900 text-white rounded-2xl p-8 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Shield className="w-32 h-32" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 relative z-10">
                      Data Protection Officer
                    </h3>
                    <p className="text-gray-300 mb-8 relative z-10 max-w-lg">
                      For specific questions regarding your personal data or to
                      exercise your rights, please contact our dedicated DPO
                      team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                      <a
                        href="mailto:privacy@lumina.ai"
                        className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                        Email DPO
                      </a>
                      <button className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-gray-700">
                        View Compliance Certs
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
