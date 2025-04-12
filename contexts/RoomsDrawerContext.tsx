import React, { createContext, useContext, useState } from "react";

type RoomsDrawerContextType = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const RoomsDrawerContext = createContext<RoomsDrawerContextType | null>(null);

export const useRoomsDrawer = () => {
  const context = useContext(RoomsDrawerContext);
  if (!context) {
    throw new Error("useRoomsDrawer must be used inside RoomsDrawerProvider");
  }
  return context;
};

export const RoomsDrawerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RoomsDrawerContext.Provider
      value={{
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
      }}
    >
      {children}
      {/* Drawer is rendered inside RoomsDrawerLayout.tsx */}
    </RoomsDrawerContext.Provider>
  );
};
