"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

import { Feature } from "@/types/features";

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: Feature | null;
}

export const FeatureModal = ({
  isOpen,
  onClose,
  feature,
}: FeatureModalProps) => {
  if (!feature) return null;

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      placement="center"
      size="2xl"
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  More Details
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {feature.details}
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-orange-500 hover:bg-orange-600"
                color="primary"
                onPress={onClose}
              >
                Got it
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
