import React, { createContext, useContext, useState } from "react";

type ProfileDrawerContextType = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const ProfileDrawerContext = createContext<ProfileDrawerContextType | null>(
  null
);

export const useProfileDrawer = () => {
  const context = useContext(ProfileDrawerContext);
  if (!context) {
    throw new Error(
      "useProfileDrawer must be used inside ProfileDrawerProvider"
    );
  }
  return context;
};

export const ProfileDrawerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProfileDrawerContext.Provider
      value={{
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
      }}
    >
      {children}
      {/* Drawer is rendered inside ProfileDrawerLayout.tsx */}
    </ProfileDrawerContext.Provider>
  );
};
