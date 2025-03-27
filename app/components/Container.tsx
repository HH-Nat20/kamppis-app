import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

import { VStack } from "@/components/ui/vstack";

import { Heading } from "@/components/ui/heading";

export default function Container({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <VStack className="flex-1 dark:bg-black bg-white" space="xl">
      {title && <Heading className="mb-2">{title}</Heading>}
      <ScrollView showsVerticalScrollIndicator={false}>
        {children}
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} />
      </ScrollView>
    </VStack>
  );
}
