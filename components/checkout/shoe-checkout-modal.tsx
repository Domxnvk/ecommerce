"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  RadioGroup,
  Radio,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

import ShoeSvg from "@/components/shoe-customizer/shoe-svg";

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

interface ShoeCheckoutModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  shoeColors: ShoeColors;
  onOrderSuccess?: () => void;
}

export default function ShoeCheckoutModal({
  isOpen,
  onOpenChange,
  shoeColors,
  onOrderSuccess,
}: ShoeCheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState<"review" | "checkout">(
    "review",
  );
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");

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

  return (
    <Modal
      backdrop="blur"
      classNames={{
        backdrop: "bg-black/60",
        base: `md:rounded-2xl rounded-t-3xl rounded-b-none dark:bg-black bg-white mb-0 mt-auto mx-auto ${
          currentStep === "checkout"
            ? "h-[85vh] md:h-[80vh]"
            : "max-h-[85vh] md:max-h-[90vh]"
        }`,
        wrapper: "md:flex md:items-center md:justify-center items-end h-full",
        body: `px-6 pb-6 overflow-y-auto ${currentStep === "checkout" ? "flex-1" : ""}`,
        header: "px-6 pt-6 flex-shrink-0",
      }}
      isOpen={isOpen}
      scrollBehavior="inside"
      size="2xl"
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          setCurrentStep("review");
        }
      }}
    >
      <ModalContent
        className={currentStep === "checkout" ? "flex flex-col h-full" : ""}
      >
        {(onClose) => (
          <>
            <div className="md:hidden w-full flex justify-center pt-3 pb-1">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>

            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">
                {currentStep === "review" ? "Your Custom Shoe" : "Checkout"}
              </h2>
              {currentStep === "review" && (
                <p className="text-sm text-gray-500">
                  Review your design before checkout
                </p>
              )}
            </ModalHeader>
            <ModalBody>
              <AnimatePresence mode="wait">
                {currentStep === "review" ? (
                  <motion.div
                    key="review"
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                          <div className="w-full max-w-[200px] mx-auto">
                            <ShoeSvg
                              accentColor={shoeColors.accentColor}
                              backtabColor={shoeColors.backtabColor}
                              bodyColor="#000000"
                              bumperStripColor={shoeColors.bumperStripColor}
                              eyeletStripColor={shoeColors.eyeletStripColor}
                              lacesColor={shoeColors.lacesColor}
                              lowerSoleColor={shoeColors.lowerSoleColor}
                              quarterShaftColor={shoeColors.quarterShaftColor}
                              selectedZone={null}
                              upperSoleColor={shoeColors.upperSoleColor}
                              onZoneClick={() => {}}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">
                            Color Selection
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(
                              Object.entries(shoeColors) as [
                                ColorZone,
                                string,
                              ][]
                            ).map(([zone, color]) => (
                              <div
                                key={zone}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className="w-5 h-5 rounded border border-gray-300 dark:border-gray-600 flex-shrink-0"
                                  style={{ backgroundColor: color }}
                                />
                                <span className="text-sm">
                                  {getZoneLabel(zone)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-medium">
                              Total Price:
                            </span>
                            <span className="text-2xl font-bold text-orange-600">
                              $149.99
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Free shipping on orders over $100
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <Button
                            className="order-2 sm:order-1"
                            color="default"
                            variant="bordered"
                            onPress={onClose}
                          >
                            Continue Customizing
                          </Button>
                          <Button
                            className="bg-orange-500 text-white hover:bg-orange-600 order-1 sm:order-2"
                            startContent={
                              <iconify-icon
                                height="20"
                                icon="mdi:credit-card"
                                width="20"
                              />
                            }
                            onPress={() => setCurrentStep("checkout")}
                          >
                            Checkout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="checkout"
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                    exit={{ opacity: 0, x: 20 }}
                    initial={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <h3 className="text-base font-semibold mb-2">
                        Shipping Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Input
                          isRequired
                          label="First Name"
                          placeholder="John"
                          variant="bordered"
                        />
                        <Input
                          isRequired
                          label="Last Name"
                          placeholder="Doe"
                          variant="bordered"
                        />
                        <Input
                          isRequired
                          className="sm:col-span-2"
                          label="Email"
                          placeholder="john@example.com"
                          type="email"
                          variant="bordered"
                        />
                        <Input
                          isRequired
                          className="sm:col-span-2"
                          label="Address"
                          placeholder="123 Main St"
                          variant="bordered"
                        />
                        <Input
                          isRequired
                          label="City"
                          placeholder="New York"
                          variant="bordered"
                        />
                        <Select
                          isRequired
                          label="Country"
                          placeholder="Select country"
                          variant="bordered"
                        >
                          <SelectItem key="us">United States</SelectItem>
                          <SelectItem key="ca">Canada</SelectItem>
                          <SelectItem key="uk">United Kingdom</SelectItem>
                          <SelectItem key="au">Australia</SelectItem>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Payment Method
                      </h3>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                      >
                        <Radio value="credit-card">
                          <div className="flex items-center gap-2">
                            <iconify-icon icon="mdi:credit-card" width="20" />
                            Credit Card
                          </div>
                        </Radio>
                        <Radio value="paypal">
                          <div className="flex items-center gap-2">
                            <iconify-icon icon="mdi:paypal" width="20" />
                            PayPal
                          </div>
                        </Radio>
                        <Radio value="apple-pay">
                          <div className="flex items-center gap-2">
                            <iconify-icon icon="mdi:apple" width="20" />
                            Apple Pay
                          </div>
                        </Radio>
                      </RadioGroup>

                      {paymentMethod === "credit-card" && (
                        <div className="mt-3 space-y-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <Input
                            isRequired
                            label="Card Number"
                            placeholder="1234 5678 9012 3456"
                            variant="bordered"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              isRequired
                              label="Expiry Date"
                              placeholder="MM/YY"
                              variant="bordered"
                            />
                            <Input
                              isRequired
                              label="CVV"
                              placeholder="123"
                              variant="bordered"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Subtotal:</span>
                        <span className="text-sm">$149.99</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Shipping:</span>
                        <span className="text-sm">Free</span>
                      </div>
                      <div className="flex justify-between items-center font-semibold">
                        <span className="text-lg">Total:</span>
                        <span className="text-xl text-orange-600">$149.99</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="light"
                        onPress={() => setCurrentStep("review")}
                      >
                        Back
                      </Button>
                      <Button
                        className="bg-orange-500 text-white hover:bg-orange-600 flex-1"
                        onPress={() => {
                          onClose();
                          setCurrentStep("review");
                          onOrderSuccess?.();
                        }}
                      >
                        Place Order
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
