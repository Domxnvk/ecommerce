"use client";

import { motion } from "framer-motion";

import { TestimonialSlotMachine } from "./testimonial-slot-machine";

import { ProductGallery } from "@/components/showcase/product-gallery";

export const TestimonialsSection = () => {
  return (
    <section
      className="min-h-screen w-full flex items-center relative overflow-hidden pt-24 pb-24"
      id="gallery"
    >
      <div className="container mx-auto max-w-7xl px-6 flex flex-col justify-center my-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          transition={{
            duration: 1,
            ease: "easeOut",
            staggerChildren: 0.3,
          }}
          viewport={{ margin: "-50px" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6"
            initial={{ opacity: 0, y: -50, rotateY: 45 }}
            transition={{
              duration: 1.2,
              ease: "backOut",
              delay: 0.2,
            }}
            viewport={{}}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          >
            Discover SneakCraft Collections
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: "easeOut",
            }}
            viewport={{}}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
          >
            Explore our diverse range of custom sneaker styles and find your
            perfect design inspiration
          </motion.p>
        </motion.div>

        <ProductGallery />

        <div className="mt-16">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, x: -100, rotate: -5 }}
            transition={{
              duration: 0.8,
              ease: "backOut",
            }}
            viewport={{ margin: "-50px" }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          >
            <motion.h3
              className="text-2xl sm:text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0.8, skewX: 10 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: "backOut",
              }}
              viewport={{}}
              whileInView={{ opacity: 1, scale: 1, skewX: 0 }}
            >
              What Our Customers Say
            </motion.h3>
          </motion.div>

          <TestimonialSlotMachine />
        </div>
      </div>
    </section>
  );
};
