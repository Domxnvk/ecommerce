"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";

import { ProductShowcaseCard } from "./product-showcase-card";

import { productShowcases } from "@/data/product-showcase";

export const ProductGallery = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalPages = isMobile ? productShowcases.length : 2;

  const getPageCards = (pageIndex: number) => {
    if (isMobile) {
      return [productShowcases[pageIndex]];
    } else {
      if (pageIndex === 0) {
        return productShowcases.slice(0, 3);
      } else {
        return productShowcases.slice(3, 6);
      }
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentCards = getPageCards(currentPage);

  return (
    <div className="relative">
      <Button
        isIconOnly
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 -translate-x-4"
        size="sm"
        variant="flat"
        onPress={prevPage}
      >
        <Icon className="w-5 h-5" icon="mdi:chevron-left" />
      </Button>

      <Button
        isIconOnly
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 translate-x-4"
        size="sm"
        variant="flat"
        onPress={nextPage}
      >
        <Icon className="w-5 h-5" icon="mdi:chevron-right" />
      </Button>

      <div className="overflow-visible px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            animate={{ x: 0, opacity: 1 }}
            className="flex gap-4 sm:gap-6 lg:gap-8"
            exit={{ x: -300, opacity: 0 }}
            initial={{ x: 300, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            {isMobile ? (
              <ProductShowcaseCard
                className="w-full min-w-0"
                index={0}
                product={currentCards[0]}
              />
            ) : currentPage === 0 ? (
              <>
                <ProductShowcaseCard
                  className="w-full min-w-0 md:w-1/4 lg:w-1/4"
                  index={0}
                  product={currentCards[0]}
                />
                <ProductShowcaseCard
                  className="w-full min-w-0 md:w-1/4 lg:w-1/4 hidden sm:block"
                  index={1}
                  product={currentCards[1]}
                />
                <ProductShowcaseCard
                  className="w-full min-w-0 md:w-1/2 lg:w-1/2 hidden lg:block"
                  index={2}
                  product={currentCards[2]}
                />
              </>
            ) : (
              <>
                <ProductShowcaseCard
                  className="w-full min-w-0 sm:w-1/2 lg:w-1/3"
                  index={0}
                  product={currentCards[0]}
                />
                <ProductShowcaseCard
                  className="w-full min-w-0 sm:w-1/2 lg:w-1/3 hidden sm:block"
                  index={1}
                  product={currentCards[1]}
                />
                <ProductShowcaseCard
                  className="w-full min-w-0 lg:w-1/3 hidden lg:block"
                  index={2}
                  product={currentCards[2]}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentPage ? "bg-orange-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </div>
  );
};
