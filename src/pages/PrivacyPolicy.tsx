import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/30 selection:text-indigo-900 dark:selection:text-indigo-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-12">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  1. Introduction
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Welcome to Lumina. We respect your privacy and are committed
                  to protecting your personal data. This privacy policy will
                  inform you as to how we look after your personal data when you
                  visit our website (regardless of where you visit it from) and
                  tell you about your privacy rights and how the law protects
                  you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  2. Data We Collect
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  We may collect, use, store and transfer different kinds of
                  personal data about you which we have grouped together
                  follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>
                    <strong>Identity Data</strong> includes first name, maiden
                    name, last name, username or similar identifier.
                  </li>
                  <li>
                    <strong>Contact Data</strong> includes billing address,
                    delivery address, email address and telephone numbers.
                  </li>
                  <li>
                    <strong>Technical Data</strong> includes internet protocol
                    (IP) address, your login data, browser type and version,
                    time zone setting and location, browser plug-in types and
                    versions, operating system and platform and other technology
                    on the devices you use to access this website.
                  </li>
                  <li>
                    <strong>Usage Data</strong> includes information about how
                    you use our website, products and services.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  3. How We Use Your Data
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  We will only use your personal data when the law allows us to.
                  Most commonly, we will use your personal data in the following
                  circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>
                    Where we need to perform the contract we are about to enter
                    into or have entered into with you.
                  </li>
                  <li>
                    Where it is necessary for our legitimate interests (or those
                    of a third party) and your interests and fundamental rights
                    do not override those interests.
                  </li>
                  <li>
                    Where we need to comply with a legal or regulatory
                    obligation.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  4. Data Security
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We have put in place appropriate security measures to prevent
                  your personal data from being accidentally lost, used or
                  accessed in an unauthorized way, altered or disclosed. In
                  addition, we limit access to your personal data to those
                  employees, agents, contractors and other third parties who
                  have a business need to know.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  5. Your Legal Rights
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Under certain circumstances, you have rights under data
                  protection laws in relation to your personal data, including
                  the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Request access to your personal data.</li>
                  <li>Request correction of your personal data.</li>
                  <li>Request erasure of your personal data.</li>
                  <li>Object to processing of your personal data.</li>
                  <li>Request restriction of processing your personal data.</li>
                  <li>Request transfer of your personal data.</li>
                  <li>Right to withdraw consent.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  6. Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you have any questions about this privacy policy or our
                  privacy practices, please contact us at:{" "}
                  <a
                    href="mailto:privacy@lumina.ai"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    privacy@lumina.ai
                  </a>
                  .
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
