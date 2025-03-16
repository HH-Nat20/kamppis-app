import React from "react";

import { Button, ButtonIcon } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icon";

import { colorSet } from "../ui/colors";

export default function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <Button
      style={{ backgroundColor: colorSet.green }}
      size="lg"
      className="rounded-full p-3.5 absolute bottom-5 right-5"
      onPress={onPress}
    >
      <ButtonIcon
        style={{ color: colorSet.white, fontWeight: "bold", fontSize: 24 }}
        as={CheckIcon}
      />
    </Button>
  );
}
