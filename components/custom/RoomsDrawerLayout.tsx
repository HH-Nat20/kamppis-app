import React, { useLayoutEffect, useState } from "react";

import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Divider } from "@/components/ui/divider";
import { Icon, PhoneIcon, StarIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";

import {
  LogOut,
  User,
  UserCog,
  Settings,
  BriefcaseBusiness,
  Images,
  BedDouble,
  AlignJustify,
  Home,
  Plus,
} from "lucide-react-native";
import { useNavigation, router, RelativePathString } from "expo-router";
import { useUser } from "@/contexts/UserContext";
import { useProfileDrawer } from "@/contexts/ProfileDrawerContext";

import { ProfileStackNavItem } from "@/types/ProfileStackNavItem";

const drawerItems: ProfileStackNavItem[] = [
  {
    icon: Settings,
    label: "Flat Settings",
    href: "/rooms/flat" as RelativePathString,
  },
  {
    icon: User,
    label: "Residents",
    href: "/rooms/residents" as RelativePathString,
  },
];

const ProfileDrawerLayout = ({ children }: { children: React.ReactNode }) => {
  return <DrawerLayoutContent>{children}</DrawerLayoutContent>;
};

const DrawerLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, openDrawer, closeDrawer } = useProfileDrawer();
  const navigation = useNavigation();
  const { user } = useUser();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={openDrawer} className="mr-4">
          <Icon
            as={AlignJustify}
            size="xl"
            className="text-typography-900 dark:text-typography-100"
          />
        </Pressable>
      ),
    });
  }, [navigation, user]);

  const currentRoute = navigation.getState()?.routes.at(-1)?.name;

  const handleDrawerItemPress = (target: RelativePathString) => {
    closeDrawer();

    if (target === currentRoute) return;

    setTimeout(() => {
      router.push(target);
    }, 100);
  };

  return (
    <>
      {children}

      <Drawer isOpen={isOpen} onClose={closeDrawer}>
        <DrawerBackdrop />
        <DrawerContent className="w-[270px] md:w-[300px]">
          <DrawerHeader className="justify-center flex-col gap-2">
            <Icon
              as={Home}
              size="xl"
              className="text-typography-900 dark:text-typography-100"
            />
            <VStack className="justify-center items-center">
              <Pressable
                onPress={() => router.push("/rooms")}
                className="flex-row items-center gap-3 px-4 py-3 rounded-md hover:bg-background-50"
              >
                <Text className="text-base text-typography-900 dark:text-typography-100">
                  My Rooms
                </Text>
              </Pressable>
            </VStack>
          </DrawerHeader>

          <Divider className="my-4" />
          <DrawerBody contentContainerClassName="gap-2">
            {drawerItems.map((item, idx) => {
              const isActive = currentRoute === item.href;

              return (
                <Pressable
                  key={idx}
                  onPress={() => item.href && handleDrawerItemPress(item.href)}
                  className={`flex-row items-center gap-3 px-4 py-3 rounded-md ${
                    isActive ? "bg-background-100" : "hover:bg-background-50"
                  }`}
                >
                  <Icon
                    as={item.icon}
                    size="lg"
                    className="text-typography-900 dark:text-typography-100"
                  />
                  <Text
                    className={`text-base ${
                      isActive ? "font-semibold" : ""
                    } text-typography-900 dark:text-typography-100`}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
            <Divider />
            {user &&
              user.roomProfiles.map((room, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    closeDrawer();
                    router.push(`/rooms/${room.id}`);
                  }}
                  className="flex-row items-center gap-3 px-4 py-3 rounded-md hover:bg-background-50"
                >
                  <Icon
                    as={BedDouble}
                    size="lg"
                    className="text-typography-900 dark:text-typography-100"
                  />
                  <Text className="text-base text-typography-900 dark:text-typography-100">
                    {room.name ?? "Room " + (index + 1)}
                  </Text>
                </Pressable>
              ))}
            <Button
              variant="outline"
              action="secondary"
              className="w-full gap-2"
            >
              <ButtonText>Add Room</ButtonText>
              <ButtonIcon as={Plus} />
            </Button>
          </DrawerBody>

          <DrawerFooter>{/** nothing here ? */}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileDrawerLayout;
