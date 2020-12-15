import React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * @author
 * @function SplashScreen
 **/
const SplashScreen = (props) => {
  const { container } = styles;
  return (
    <View style={container}>
      <Text>SplashScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SplashScreen;
