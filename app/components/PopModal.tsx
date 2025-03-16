import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Icon, CloseIcon } from "@/components/ui/icon";
import React from "react";

export default function PopModal({
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <Center className="h-[300px]">
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              {title}
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text size="sm" className="text-typography-500">
              {description}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" action="secondary" onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button onPress={onSubmit}>
              <ButtonText>Confirm</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
