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
  Home,
  ShoppingCart,
  User,
  Wallet,
  UserCog,
  Settings,
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
            {drawerItems.map((item, idx) => (
              <Pressable
                key={idx}
                onPress={() => {
                  if (item.href) {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: item.href as any }],
                    });
                    closeDrawer();
                  }
                }}
                className="gap-3 flex-row items-center hover:bg-background-50 p-2 rounded-md"
              >
                <Icon
                  as={item.icon}
                  size="lg"
                  className="text-typography-600"
                />
                <Text>{item.label}</Text>
              </Pressable>
            ))}
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
