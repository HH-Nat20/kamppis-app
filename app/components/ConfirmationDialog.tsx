import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

type ConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description = "This action cannot be undone. Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmationDialogProps) => (
  <AlertDialog isOpen={isOpen} onClose={onClose} size="md">
    <AlertDialogBackdrop />
    <AlertDialogContent>
      <AlertDialogHeader>
        <Heading className="text-typography-950 font-semibold" size="md">
          {title}
        </Heading>
      </AlertDialogHeader>
      <AlertDialogBody className="mt-3 mb-4">
        <Text size="sm">{description}</Text>
      </AlertDialogBody>
      <AlertDialogFooter>
        <Button
          variant="outline"
          action="secondary"
          onPress={onClose}
          size="sm"
        >
          <ButtonText>{cancelText}</ButtonText>
        </Button>
        <Button
          size="sm"
          onPress={() => {
            onConfirm();
            onClose();
          }}
        >
          <ButtonText>{confirmText}</ButtonText>
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default ConfirmationDialog;
