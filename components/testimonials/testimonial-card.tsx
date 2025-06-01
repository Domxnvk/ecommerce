"use client";

import { Card } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

import { Testimonial } from "@/types/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export const TestimonialCard = ({
  testimonial,
  index,
}: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
        <div className="flex items-start gap-4 mb-4">
          <Avatar
            isBordered
            className="text-3xl"
            color="warning"
            name={testimonial.avatar}
            size="lg"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.location}</p>
          </div>
        </div>

        <div className="flex gap-1 mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Icon key={i} className="w-5 h-5 text-yellow-400" icon="mdi:star" />
          ))}
        </div>

        <p className="text-gray-700 text-sm leading-relaxed italic">
          &quot;{testimonial.comment}&quot;
        </p>
      </Card>
    </motion.div>
  );
};
