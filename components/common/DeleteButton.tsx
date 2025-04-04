import React from "react";

import { Button, ButtonIcon } from "@/components/ui/button";
import { TrashIcon } from "@/components/ui/icon";

import { colorSet } from "@/assets/styles/colors";

export default function DeleteButton({ onPress }: { onPress: () => void }) {
  return (
    <Button
      size="lg"
      style={{ backgroundColor: colorSet.red }}
      className="rounded-full p-3.5"
      onPress={onPress}
    >
      <ButtonIcon style={{ color: colorSet.white }} as={TrashIcon} />
    </Button>
  );
}
