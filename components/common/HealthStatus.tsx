import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { ActivityIndicator } from "react-native";
import { MotiView } from "moti";
import { useEffect, useState } from "react";

export const HealthStatus = ({
  serverHealth,
  dbHealth,
}: {
  serverHealth: any;
  dbHealth: any;
}) => {
  const [showStatus, setShowStatus] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowStatus(false), 4000); // Visible for 4 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <VStack className="items-center gap-8 mt-4 min-h-[200px]">
      {/* Everything inside fades together */}
      <MotiView
        from={{ opacity: 1 }}
        animate={{ opacity: showStatus ? 1 : 0 }}
        transition={{ type: "timing", duration: 1000 }}
        style={{ minHeight: 200 }} // Force a minimum space even after fade
      >
        {/* Server Status */}
        <VStack className="items-center gap-2">
          <Text>Checking server status...</Text>
          {serverHealth.isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text
              className={
                serverHealth.data?.status === "ok"
                  ? "text-success-500"
                  : "text-error-500"
              }
            >
              {serverHealth.data?.status === "ok" ? "OK" : "FAILED"}
            </Text>
          )}
        </VStack>

        {/* DB Status */}
        <VStack className="items-center gap-2 mt-6">
          <Text>Checking DB status...</Text>
          {dbHealth.isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text
              className={
                dbHealth.data?.status === "ok"
                  ? "text-success-500"
                  : "text-error-500"
              }
            >
              {dbHealth.data?.status === "ok" ? "OK" : "FAILED"}
            </Text>
          )}
        </VStack>
      </MotiView>
    </VStack>
  );
};
