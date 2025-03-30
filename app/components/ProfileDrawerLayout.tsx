import React, { useLayoutEffect, useState } from "react";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
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
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";
import { useProfileDrawer } from "../contexts/ProfileDrawerContext";

import { getProfilePicture, getImageUrl } from "../helpers/helpers";

import { ProfileStackParamList } from "../navigation/ProfileStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

import { ProfileStackNavItem } from "../types/ProfileStackNavItem";

const drawerItems: ProfileStackNavItem[] = [
  { icon: User, label: "My Profile", href: "ProfileScreen" },
  {
    icon: UserCog,
    label: "Personal Info",
    href: "Personal Info",
  },
  {
    icon: Settings,
    label: "Match Preferences",
    href: "Match Preferences",
  },
  { icon: Images, label: "Photos", href: "Photos" },
  {
    icon: BriefcaseBusiness,
    label: "Privacy Settings",
    href: "Privacy Settings",
  },
];

const ProfileDrawerLayout = ({ children }: { children: React.ReactNode }) => {
  return <DrawerLayoutContent>{children}</DrawerLayoutContent>;
};

const DrawerLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, openDrawer, closeDrawer } = useProfileDrawer();
  const navigation =
    useNavigation<StackNavigationProp<ProfileStackParamList>>();
  const { user } = useUser();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={openDrawer} className="mr-4">
          <Avatar size="sm">
            <AvatarImage
              source={{
                uri: getImageUrl(getProfilePicture(user?.userProfile?.photos)),
              }}
            />
            <AvatarFallbackText>{user?.firstName.charAt(0)}</AvatarFallbackText>
          </Avatar>
        </Pressable>
      ),
    });
  }, [navigation, user]);

  const currentRoute = navigation.getState().routes.at(-1)?.name;

  const handleDrawerItemPress = (target: string) => {
    closeDrawer();

    if (target === currentRoute) return;

    setTimeout(() => {
      if (target === "ProfileScreen") {
        navigation.reset({
          index: 0,
          routes: [{ name: "ProfileScreen" }],
        });
      } else {
        navigation.reset({
          index: 1,
          routes: [
            { name: "ProfileScreen" },
            { name: target as keyof ProfileStackParamList },
          ],
        });
      }
    }, 100);
  };

  return (
    <>
      {children}

      <Drawer isOpen={isOpen} onClose={closeDrawer}>
        <DrawerBackdrop />
        <DrawerContent className="w-[270px] md:w-[300px]">
          <DrawerHeader className="justify-center flex-col gap-2">
            <Avatar size="2xl">
              <AvatarFallbackText>User's Avatar</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: getImageUrl(
                    getProfilePicture(user?.userProfile?.photos)
                  ),
                }}
              />
            </Avatar>
            <VStack className="justify-center items-center">
              <Text size="lg">{`${user?.firstName} ${user?.lastName}`}</Text>
              <Text size="sm" className="text-typography-600">
                {user?.email}
              </Text>
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
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              action="secondary"
              className="w-full gap-2"
            >
              <ButtonText>Logout</ButtonText>
              <ButtonIcon as={LogOut} />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileDrawerLayout;
