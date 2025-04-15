import React from "react";

import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Command } from "lucide-react-native";

function Likes() {
  return (
    <HStack space="xs" className="p-1 ml-3">
      <Avatar size="xs" className="bg-gray-500 rounded">
        <Icon as={Command} className="text-typography-0" />
      </Avatar>
      <Avatar size="xs" className="bg-gray-500 rounded">
        <AvatarFallbackText>N</AvatarFallbackText>
      </Avatar>
    </HStack>
  );
}

export default Likes;
