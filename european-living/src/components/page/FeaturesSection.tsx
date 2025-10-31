// src/components/page/FeaturesSection.tsx
import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";
import { features } from "../../data/features";
import { useNavigate } from "react-router-dom";

export default function FeaturesSection() {
  const navigate = useNavigate();

  return (
    <section
      id="tips"
      // Slightly darker neutral tone for visual separation
      className="py-16 bg-[var(--brand-bg-alt)]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-[var(--brand-dark)]">
          Travel Tips & Essentials
        </h2>
        <p className="text-center text-[var(--brand-dark)]/70 max-w-2xl mx-auto mb-12">
          Helpful guides, how-tos, and quick reads to travel smarter.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => navigate(`/articles/${feature.id}`)}
                className="cursor-pointer"
              >
                <Card className="bg-[var(--brand-light)] border border-[var(--border)] hover:border-[var(--brand-primary)] transition-all duration-300 rounded-2xl shadow-md hover:shadow-xl">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Icon className="w-10 h-10 text-[var(--brand-primary)] mb-4" />
                    <h3 className="text-lg font-semibold text-[var(--brand-dark)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--brand-dark)]/70">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
