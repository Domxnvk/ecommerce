"use client";

import { Card } from "@heroui/card";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import { Feature } from "@/types/features";

interface FeatureCardProps {
  feature: Feature;
  index: number;
  onOpenModal: () => void;
}

export const FeatureCard = ({
  feature,
  index,
  onOpenModal,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotateX: 45,
        filter: "blur(5px)",
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: "backOut",
      }}
      viewport={{ margin: "-50px" }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
      }}
    >
      <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm relative">
        <button
          aria-label="More information"
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          onClick={onOpenModal}
        >
          <Icon className="w-5 h-5 text-gray-600" icon="mdi:plus" />
        </button>

        <div className="pr-10">
          <div className="text-3xl mb-4">{feature.icon}</div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};
