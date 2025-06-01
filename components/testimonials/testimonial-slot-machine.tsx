"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "@heroui/avatar";
import { Icon } from "@iconify/react";

import { testimonials } from "@/data/testimonials";

export const TestimonialSlotMachine = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  const avatarColors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "default",
    "warning",
  ];
  const currentAvatarColor = avatarColors[currentIndex % avatarColors.length];

  return (
    <div className="flex justify-center max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 text-center sm:text-left"
          exit={{ y: -30, opacity: 0 }}
          initial={{ y: 30, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <Avatar
                isBordered
                className="text-lg sm:text-2xl w-8 h-8 sm:w-10 sm:h-10"
                color={currentAvatarColor as any}
                name={currentTestimonial.avatar}
                size="sm"
              />
            </div>

            <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: 1, rotate: 0 }}
                  initial={{ scale: 0, rotate: -180 }}
                  transition={{
                    delay: 0.2 + i * 0.1,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: 180,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" icon="noto:star" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-gray-700 italic">
              &quot;{currentTestimonial.comment}&quot; -{" "}
              <span className="font-medium">{currentTestimonial.name}</span>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
