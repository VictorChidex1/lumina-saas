import { BarChart2, Zap, Shield, Users, Globe, Headphones } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const features = [
  {
    title: "Advanced Analytics",
    description:
      "Gain deep insights into your audience with our AI-powered analytics dashboard. Track growth, engagement, and sentiment in real-time.",
    icon: BarChart2,
  },
  {
    title: "Smart Automation",
    description:
      "Automate your workflow with intelligent scheduling and content distribution. Let AI handle the repetitive tasks while you focus on strategy.",
    icon: Zap,
  },
  {
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and security protocols ensure your data is always safe. SOC 2 Type II compliant infrastructure.",
    icon: Shield,
  },
  {
    title: "Team Collaboration",
    description:
      "Seamlessly collaborate with your team. Assign roles, manage permissions, and streamline your content approval process.",
    icon: Users,
  },
  {
    title: "Global Reach",
    description:
      "Optimize your content for global audiences with AI-powered translation and localization tools. Reach users in their native language.",
    icon: Globe,
  },
  {
    title: "24/7 Expert Support",
    description:
      "Our dedicated support team is available around the clock to help you succeed. Get priority access to our experts.",
    icon: Headphones,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to scale
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful tools designed to help you grow your digital presence and
            engage your audience like never before.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <motion.div
                whileHover={{
                  y: -5,
                  rotateX: 5,
                  rotateY: 5,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                style={{ perspective: 1000 }}
                className="h-full"
              >
                <Card className="h-full border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300"
                    >
                      <feature.icon size={24} />
                    </motion.div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
