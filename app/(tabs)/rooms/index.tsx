import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

import { useRoomsDrawer } from "@/contexts/RoomsDrawerContext";
import RoomsDrawerLayout from "@/components/custom/RoomsDrawerLayout";

import Container from "@/components/common/Container";

const RoomsScreen: React.FC = () => {
  const { isOpen, closeDrawer } = useRoomsDrawer();

  return (
    <RoomsDrawerLayout>
      <Container>
        <Text>Rooms</Text>
      </Container>
    </RoomsDrawerLayout>
  );
};

export default RoomsScreen;
