import React, {useState, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Pressable } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

import styles from "../ui/styles";
import dao from "../ajax/dao";

import { User } from "../types/User";

import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DetailsParamList } from "../navigation/SwipeStackNavigator";

type DetailsScreenRouteProp = RouteProp<DetailsParamList, "DetailsScreen">;
type NavigationProp = StackNavigationProp<DetailsParamList, "DetailsScreen">;

type DetailsScreenProps = {
  route: DetailsScreenRouteProp;
};

export default function DetailsScreen({ route }: DetailsScreenProps) {
  const navigation = useNavigation<NavigationProp>();
  const { userId } = route.params;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
      dao.getUserProfile(userId).then((user) => {
      setUser(user);
      });
  }, [userId]);

  return (
    <View style={styles.container}>
 
      <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Entypo name="arrow-left" size={24} color="white" />
      </Pressable>

      <Text style={styles.text}>Details come here for user {user?.firstName}</Text>

      <StatusBar style="auto" />
    </View>
  );
}
