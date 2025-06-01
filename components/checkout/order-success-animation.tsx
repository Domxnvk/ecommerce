"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderSuccessAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function OrderSuccessAnimation({
  isVisible,
  onComplete,
}: OrderSuccessAnimationProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (isVisible) {
      const newSparkles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 2,
      }));

      setSparkles(newSparkles);

      const timer = setTimeout(() => {
        onComplete?.();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          />

          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              className="absolute"
              initial={{ scale: 0, opacity: 0 }}
              style={{
                left: sparkle.x,
                top: sparkle.y,
              }}
              transition={{
                duration: 2,
                delay: sparkle.delay,
                ease: "easeOut",
              }}
            >
              <iconify-icon
                class="text-orange-400"
                height={sparkle.size}
                icon="mdi:star-four-points"
                width={sparkle.size}
              />
            </motion.div>
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [0, 1.2, 1] }}
              className="relative"
              initial={{ scale: 0 }}
              transition={{ duration: 0.6, times: [0, 0.7, 1] }}
            >
              <motion.div
                animate={{
                  scale: [0.8, 2, 3],
                  opacity: [0, 0.5, 0],
                }}
                className="absolute inset-0 -z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                  repeat: 1,
                  repeatDelay: 0.5,
                }}
              >
                <div className="w-96 h-96 bg-orange-400 rounded-full blur-3xl" />
              </motion.div>

              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  repeat: 2,
                  repeatType: "reverse",
                }}
              >
                <iconify-icon
                  class="text-orange-500 drop-shadow-2xl"
                  height="150"
                  icon="mdi:check-circle"
                  width="150"
                />
              </motion.div>

              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  className="absolute"
                  style={{
                    width: "200px",
                    height: "200px",
                    top: "50%",
                    left: "50%",
                    marginTop: "-100px",
                    marginLeft: "-100px",
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="absolute"
                    style={{
                      top: 0,
                      left: "50%",
                      marginLeft: "-15px",
                    }}
                  >
                    <iconify-icon
                      class="text-yellow-400"
                      height="30"
                      icon="mdi:sparkles"
                      width="30"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-1/3"
              initial={{ y: 50, opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center">
                Order Placed!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center mt-2">
                Your custom shoe is on its way
              </p>
            </motion.div>
          </div>

          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                animate={{
                  x: (Math.random() - 0.5) * 800,
                  y: (Math.random() - 0.5) * 600,
                  rotate: Math.random() * 720,
                  opacity: [1, 1, 0],
                }}
                className="absolute top-1/2 left-1/2"
                initial={{ x: 0, y: 0 }}
                transition={{
                  duration: 2,
                  delay: 0.5 + Math.random() * 0.3,
                  ease: "easeOut",
                }}
              >
                <div
                  className={`w-3 h-8 ${
                    [
                      "bg-orange-400",
                      "bg-yellow-400",
                      "bg-pink-400",
                      "bg-blue-400",
                    ][i % 4]
                  } rounded-sm`}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
