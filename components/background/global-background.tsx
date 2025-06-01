"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingDot {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export const GlobalBackground = () => {
  const [dots, setDots] = useState<FloatingDot[]>([]);
  const [circlePositions, setCirclePositions] = useState([
    { x: 20, y: 30 },
    { x: 80, y: 70 },
  ]);

  useEffect(() => {
    const generateDots = () => {
      const newDots: FloatingDot[] = [];

      for (let i = 0; i < 20; i++) {
        newDots.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2,
        });
      }
      setDots(newDots);
    };

    generateDots();

    const interval = setInterval(() => {
      generateDots();
    }, 15000);

    const circleInterval = setInterval(() => {
      setCirclePositions([
        { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
        { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
      ]);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(circleInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -20, 0],
            x: [0, Math.random() * 40 - 20, 0],
          }}
          className="absolute rounded-full bg-black/20"
          initial={{ opacity: 0, scale: 0 }}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}

      <motion.div
        animate={{ opacity: 1 }}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            x: ["10%", "80%", "10%"],
            y: ["20%", "70%", "20%"],
          }}
          className="absolute w-32 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent"
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
        <motion.div
          animate={{
            rotate: [0, -180, -360],
            x: ["90%", "10%", "90%"],
            y: ["80%", "30%", "80%"],
          }}
          className="absolute w-24 h-px bg-gradient-to-r from-transparent via-black/40 to-transparent"
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      </motion.div>

      <motion.div
        key={`circle1-${circlePositions[0].x}-${circlePositions[0].y}`}
        animate={{
          opacity: [0, 0.3, 0.3, 0],
          scale: [0, 1, 1, 0],
          rotate: [0, 180, 360],
        }}
        className="absolute w-20 h-20 rounded-full border-2 border-black/20"
        initial={{ opacity: 0, scale: 0 }}
        style={{
          left: `${circlePositions[0].x}%`,
          top: `${circlePositions[0].y}%`,
        }}
        transition={{
          duration: 8,
          times: [0, 0.1, 0.9, 1],
          ease: "easeInOut",
        }}
      />

      <motion.div
        key={`circle2-${circlePositions[1].x}-${circlePositions[1].y}`}
        animate={{
          opacity: [0, 0.4, 0.4, 0],
          scale: [0, 1, 1, 0],
          rotate: [0, -180, -360],
        }}
        className="absolute w-16 h-16 rounded-full border-2 border-black/30"
        initial={{ opacity: 0, scale: 0 }}
        style={{
          left: `${circlePositions[1].x}%`,
          top: `${circlePositions[1].y}%`,
        }}
        transition={{
          duration: 8,
          times: [0, 0.1, 0.9, 1],
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <motion.div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 6) * 50, 0],
              y: [0, Math.sin((i * Math.PI) / 6) * 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            className="absolute w-1 h-1 bg-black rounded-full"
            style={{
              left: `${20 + Math.cos((i * Math.PI) / 6) * 30}%`,
              top: `${20 + Math.sin((i * Math.PI) / 6) * 30}%`,
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};
