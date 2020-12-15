import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./src/screens/loginPage";
import SignUpPage from "./src/screens/signUpPage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ResetPassword from "./src/screens/resetPassword";
import ProfileScreen from "./src/screens/profileScreen";
import FullScreenPlayer from "./src/screens/fullScreenPlayer";
import PlayLists from "./src/screens/playlists";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tracks from "./src/screens/tracks";
import { Provider, useSelector } from "react-redux";
import store from "./src/redux/store";
import BootLoader from "./bootloader";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
window.store = store;
// const authStatus = useSelector((state) => state.auth);
// const [authenticated, setAuthenticated] = React.useState(false);
// useEffect(() => {
//   if (authStatus.authenticated) {
//     setAuthenticated(true);
//   }
// }, [authStatus]);

export default function App() {
  return (
    <Provider store={store}>
      <BootLoader />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
