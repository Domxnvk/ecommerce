"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { FeatureCard } from "./feature-card";
import { FeatureModal } from "./feature-modal";

import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { features } from "@/data/features";

export const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedFeature(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
  };

  return (
    <>
      <section
        className="min-h-screen w-full flex items-center relative overflow-hidden pt-24 pb-24"
        id="features-section"
      >
        <div className="container mx-auto max-w-7xl px-6 flex flex-col justify-center my-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              duration: 0.8,
              ease: "backOut",
              staggerChildren: 0.2,
            }}
            viewport={{ margin: "-100px" }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.5, rotateX: -45 }}
              transition={{
                duration: 1,
                ease: "backOut",
                delay: 0.2,
              }}
              viewport={{}}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            >
              Why Choose SneakCraft?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: "easeOut",
              }}
              viewport={{}}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Experience the future of custom sneaker design with our
              cutting-edge platform
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
                onOpenModal={() => openModal(index)}
              />
            ))}
          </div>
        </div>

        <FeatureModal
          feature={selectedFeature !== null ? features[selectedFeature] : null}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </section>

      <TestimonialsSection />
    </>
  );
};
