"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

interface FloatingDot {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export const SneakerHero = () => {
  const [dots, setDots] = useState<FloatingDot[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const router = useRouter();

  const words = ["Create.", "Design.", "Build.", "Craft.", "Express."];

  const wordEffects = [
    { scale: [1, 1.1, 1], color: "text-orange-500", duration: 2 },
    { rotateX: [0, 5, -5, 0], color: "text-orange-500", duration: 2.5 },
    { y: [0, -10, 0], color: "text-orange-500", duration: 2 },
    { scale: [1, 0.9, 1.1, 1], color: "text-orange-500", duration: 3 },
    { rotate: [0, 3, -3, 0], color: "text-orange-500", duration: 2.5 },
  ];

  useEffect(() => {
    const generateDots = () => {
      const newDots: FloatingDot[] = [];

      for (let i = 0; i < 15; i++) {
        newDots.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 2,
          duration: Math.random() * 3 + 2,
        });
      }
      setDots(newDots);
    };

    generateDots();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: 1,
            rotate: [0, 5, -5, 0],
            y: [0, -20, 0],
          }}
          className="relative"
          initial={{ scale: 0, rotate: -45 }}
          transition={{
            scale: { duration: 1.5, ease: "backOut" },
            rotate: { duration: 8, repeat: Infinity, repeatType: "loop" },
            y: { duration: 4, repeat: Infinity, repeatType: "loop" },
          }}
        >
          <motion.div
            className="relative"
            transition={{ type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Image
              priority
              alt="Custom Sneaker Design"
              className="drop-shadow-2xl w-64 h-48 sm:w-80 sm:h-60 md:w-96 md:h-72 lg:w-[500px] lg:h-[375px] xl:w-[600px] xl:h-[450px] 2xl:w-[700px] 2xl:h-[525px] object-contain"
              height={525}
              src="/retro-sneaker.png"
              width={700}
            />
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            className="absolute inset-0 bg-black rounded-full blur-3xl opacity-5"
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 2xl:h-36 mb-2 flex items-center justify-center">
            {words.map((word, index) => {
              const effect = wordEffects[index];
              const isActive = index === currentWordIndex;

              return (
                <motion.h1
                  key={word}
                  animate={
                    isActive
                      ? {
                          opacity: 1,
                          rotateX: 0,
                          scale: effect.scale || 1,
                          rotate: effect.rotate || 0,
                          y: effect.y || 0,
                        }
                      : {
                          opacity: 0,
                          rotateX: -90,
                        }
                  }
                  className={`absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black ${effect.color}`}
                  initial={{ opacity: 0, rotateX: -90 }}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  transition={{
                    opacity: { duration: 0.3 },
                    rotateX: { duration: 0.5, ease: "backOut" },
                    ...(isActive && {
                      scale: {
                        duration: effect.duration,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: 0.5,
                      },
                      rotate: {
                        duration: effect.duration,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: 0.5,
                      },
                      y: {
                        duration: effect.duration,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: 0.5,
                      },
                    }),
                  }}
                >
                  {word}
                </motion.h1>
              );
            })}
          </div>

          <motion.p
            animate={{ opacity: 1 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-600 mb-6 max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4"
            initial={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Step into your style with our premium custom sneaker designer.
            Choose colors, materials, and patterns to create shoes that are
            uniquely yours.
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <Button
              className="bg-orange-500 text-white hover:bg-orange-600 text-lg xl:text-xl px-8 py-6 xl:px-10 xl:py-8 font-semibold"
              color="primary"
              radius="full"
              size="lg"
              onPress={() => {
                router.push("/create");
              }}
            >
              Start Designing
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
