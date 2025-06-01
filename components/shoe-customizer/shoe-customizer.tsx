"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Accordion,
  AccordionItem,
  Slider,
  useDisclosure,
} from "@heroui/react";
import { motion } from "framer-motion";

import ShoeSvg from "./shoe-svg";
import { ColorPicker } from "./color-picker";

import ShoeCheckoutModal from "@/components/checkout/shoe-checkout-modal";
import OrderSuccessAnimation from "@/components/checkout/order-success-animation";

const PlusIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
    </svg>
  );
};

const CloseIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      role="presentation"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        fill="currentColor"
      />
    </svg>
  );
};

type ColorZone =
  | "upperSoleColor"
  | "lowerSoleColor"
  | "accentColor"
  | "lacesColor"
  | "backtabColor"
  | "bumperStripColor"
  | "eyeletStripColor"
  | "quarterShaftColor";

interface ShoeColors {
  upperSoleColor: string;
  lowerSoleColor: string;
  accentColor: string;
  lacesColor: string;
  backtabColor: string;
  bumperStripColor: string;
  eyeletStripColor: string;
  quarterShaftColor: string;
}

export default function ShoeCustomizer() {
  const router = useRouter();
  const [shoeColors, setShoeColors] = useState<ShoeColors>({
    upperSoleColor: "#ffffff",
    lowerSoleColor: "#ffffff",
    accentColor: "#000000",
    lacesColor: "#ffffff",
    backtabColor: "#ffffff",
    bumperStripColor: "#ffffff",
    eyeletStripColor: "#ffffff",
    quarterShaftColor: "#ffffff",
  });

  const [selectedZone, setSelectedZone] = useState<ColorZone>("upperSoleColor");
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [rotation, setRotation] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showBlankPage, setShowBlankPage] = useState(false);

  const updateColor = (part: keyof ShoeColors, color: string) => {
    setShoeColors((prev) => ({
      ...prev,
      [part]: color,
    }));
  };

  const getZoneLabel = (zone: ColorZone): string => {
    const labels = {
      upperSoleColor: "Upper Sole",
      lowerSoleColor: "Lower Sole",
      accentColor: "Accents & Details",
      lacesColor: "Shoelaces",
      backtabColor: "Backtab",
      bumperStripColor: "Bumper Strip",
      eyeletStripColor: "Eyelet Strip",
      quarterShaftColor: "Quarter/Shaft",
    };

    return labels[zone];
  };

  const resetColors = () => {
    setShoeColors({
      upperSoleColor: "#ffffff",
      lowerSoleColor: "#ffffff",
      accentColor: "#000000",
      lacesColor: "#ffffff",
      backtabColor: "#ffffff",
      bumperStripColor: "#ffffff",
      eyeletStripColor: "#ffffff",
      quarterShaftColor: "#ffffff",
    });
  };

  if (showBlankPage) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <OrderSuccessAnimation
          isVisible={showOrderSuccess}
          onComplete={() => {
            setShowOrderSuccess(false);
            router.push("/");
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          animate={{ scale: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6"
          initial={{ scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Customize Your Shoe
        </motion.h1>
      </motion.div>

      <div className="w-full flex-1 flex flex-col lg:flex-row min-h-0">
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-3/5 flex items-center justify-center p-6 lg:h-full lg:flex-shrink-0"
          initial={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-full max-w-lg aspect-square flex items-center justify-center relative overflow-visible">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center">
              <div
                style={{
                  transform: `perspective(1000px) rotateY(${rotation}deg)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.3s ease",
                }}
              >
                <ShoeSvg
                  accentColor={shoeColors.accentColor}
                  backtabColor={shoeColors.backtabColor}
                  bodyColor="#000000"
                  bumperStripColor={shoeColors.bumperStripColor}
                  eyeletStripColor={shoeColors.eyeletStripColor}
                  lacesColor={shoeColors.lacesColor}
                  lowerSoleColor={shoeColors.lowerSoleColor}
                  quarterShaftColor={shoeColors.quarterShaftColor}
                  selectedZone={
                    expandedKeys.has("colors") ? selectedZone : null
                  }
                  upperSoleColor={shoeColors.upperSoleColor}
                  onZoneClick={setSelectedZone}
                />
              </div>
            </div>

            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 left-4 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                className="w-2 h-2 bg-orange-500 rounded-full"
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-sm font-medium">Live Preview</span>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 px-4 pb-4 flex justify-center z-20"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Slider
                hideValue
                aria-label="Rotate shoe view"
                className="max-w-md w-full"
                color="foreground"
                maxValue={45}
                minValue={-45}
                size="sm"
                step={1}
                value={rotation}
                onChange={(value) => setRotation(value as number)}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-2/5 lg:h-full flex items-start justify-center p-6 lg:pt-0 lg:overflow-hidden lg:flex-shrink-0"
          initial={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-full max-w-sm flex flex-col lg:h-full">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Accordion
                motionProps={{
                  variants: {
                    enter: {
                      y: 0,
                      opacity: 1,
                      height: "auto",
                      transition: {
                        height: {
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          duration: 1,
                        },
                        opacity: {
                          easings: "ease",
                          duration: 1,
                        },
                      },
                    },
                    exit: {
                      y: 0,
                      opacity: 0,
                      height: 0,
                      transition: {
                        height: {
                          easings: "ease",
                          duration: 0.25,
                        },
                        opacity: {
                          easings: "ease",
                          duration: 0.2,
                        },
                      },
                    },
                  },
                }}
                selectedKeys={expandedKeys}
                onSelectionChange={(keys) => {
                  const newKeys = keys as Set<string>;

                  setExpandedKeys(newKeys);

                  if (expandedKeys.size === 0 && newKeys.size > 0) {
                    setVisibleKeys(newKeys);
                  } else if (expandedKeys.size > 0 && newKeys.size === 0) {
                    setTimeout(() => {
                      setVisibleKeys(new Set());
                    }, 300);
                  } else {
                    setVisibleKeys(newKeys);
                  }
                }}
              >
                {[
                  visibleKeys.size === 0 || visibleKeys.has("colors") ? (
                    <AccordionItem
                      key="colors"
                      aria-label="Color Customization"
                      indicator={({ isOpen }) =>
                        isOpen ? <CloseIcon /> : <PlusIcon />
                      }
                      startContent={
                        <iconify-icon
                          height="24"
                          icon="mdi:palette"
                          width="24"
                        />
                      }
                      subtitle="Choose colors for different shoe parts"
                      title="Color Customization"
                    >
                      <div className="space-y-5 max-w-full overflow-hidden">
                        <div>
                          <ColorPicker
                            color={shoeColors[selectedZone]}
                            label={getZoneLabel(selectedZone)}
                            onChange={(color) =>
                              updateColor(selectedZone, color)
                            }
                          />
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                            Quick Select Zone
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {(Object.keys(shoeColors) as Array<ColorZone>).map(
                              (zone) => (
                                <button
                                  key={zone}
                                  className={`text-xs px-3 py-2 rounded-md border-2 transition-all ${
                                    selectedZone === zone
                                      ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white text-white dark:text-gray-900 font-medium"
                                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  }`}
                                  onClick={() => setSelectedZone(zone)}
                                >
                                  {getZoneLabel(zone)}
                                </button>
                              ),
                            )}
                          </div>

                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 flex items-center gap-1">
                            <span>💡</span>
                            <span>
                              Click on any part of the shoe to select and
                              customize it
                            </span>
                          </p>
                        </div>

                        <div>
                          <Button
                            className="w-full"
                            size="md"
                            variant="bordered"
                            onClick={resetColors}
                          >
                            Reset Colors
                          </Button>
                        </div>
                      </div>
                    </AccordionItem>
                  ) : null,
                  visibleKeys.size === 0 || visibleKeys.has("materials") ? (
                    <AccordionItem
                      key="materials"
                      aria-label="Materials"
                      indicator={({ isOpen }) =>
                        isOpen ? <CloseIcon /> : <PlusIcon />
                      }
                      startContent={
                        <iconify-icon
                          height="24"
                          icon="mdi:texture"
                          width="24"
                        />
                      }
                      subtitle="Select material textures and finishes"
                      title="Materials"
                    >
                      <div className="py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Material options coming soon. Choose from leather,
                          suede, mesh, and more.
                        </p>
                      </div>
                    </AccordionItem>
                  ) : null,
                  visibleKeys.size === 0 || visibleKeys.has("patterns") ? (
                    <AccordionItem
                      key="patterns"
                      aria-label="Patterns"
                      indicator={({ isOpen }) =>
                        isOpen ? <CloseIcon /> : <PlusIcon />
                      }
                      startContent={
                        <iconify-icon
                          height="24"
                          icon="mdi:dots-grid"
                          width="24"
                        />
                      }
                      subtitle="Add unique patterns and graphics"
                      title="Patterns & Designs"
                    >
                      <div className="py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Pattern options coming soon. Add stripes, logos, and
                          custom designs.
                        </p>
                      </div>
                    </AccordionItem>
                  ) : null,
                ].filter(Boolean)}
              </Accordion>
            </motion.div>

            {visibleKeys.size === 0 && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mt-auto pt-8 pb-4"
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Button
                  className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                  size="lg"
                  startContent={
                    <iconify-icon height="20" icon="mdi:cart-plus" width="20" />
                  }
                  variant="bordered"
                  onPress={onOpen}
                >
                  Add to Cart
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <ShoeCheckoutModal
        isOpen={isOpen}
        shoeColors={shoeColors}
        onOpenChange={onOpenChange}
        onOrderSuccess={() => {
          setShowBlankPage(true);
          setShowOrderSuccess(true);
        }}
      />
    </div>
  );
}
