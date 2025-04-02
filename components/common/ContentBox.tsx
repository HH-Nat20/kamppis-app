import React from "react";

import { View } from "react-native";

import styles from "../../assets/styles/styles";

export default function ContentBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View style={styles.contentBox}>{children}</View>;
}
