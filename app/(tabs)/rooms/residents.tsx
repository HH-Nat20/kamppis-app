import React from "react";
import { View, Text } from "react-native";

import Container from "@/components/common/Container";

const Residents = () => {
  return (
    <Container>
      <View className="flex-1 justify-center items-center p-4 mt-4">
        <Text className="text-xl font-bold">Residents</Text>
        <Text className="text-gray-500">This is the residents screen.</Text>
      </View>
    </Container>
  );
};

export default Residents;
