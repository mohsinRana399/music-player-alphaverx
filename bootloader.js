import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginPage from "./src/screens/loginPage";
import SignUpPage from "./src/screens/signUpPage";
import { MaterialIcons } from "@expo/vector-icons";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";
window.store = store;

export default function BootLoader() {
  const authStatus = useSelector((state) => state.auth);
  const [authenticated, setAuthenticated] = React.useState(false);
  useEffect(() => {
    if (authStatus.authenticated) {
      setAuthenticated(true);
    }
  }, [authStatus]);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Playlists" component={PlayLists} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Full Screen Player" component={FullScreenPlayer} />
        <Drawer.Screen name="Tracks" component={Tracks} />
        <Drawer.Screen name="Login" component={LoginPage} />
        <Drawer.Screen name="Reset" component={ResetPassword} />
        <Drawer.Screen name="Register" component={SignUpPage} />
      </Drawer.Navigator>
      {/* {authenticated ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Playlists") {
                iconName = focused ? "ios-list-box" : "ios-list";
              } else if (route.name === "Profile") {
                iconName = focused ? "ios-person" : "ios-person";
              } else if (route.name === "Tracks") {
                iconName = focused ? "ios-musical-note" : "ios-musical-note";
              } else if (route.name === "Full Screen Player") {
                iconName = focused ? "md-musical-notes" : "md-musical-notes";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          swipeEnabled={true}
          tabBarOptions={{
            activeTintColor: "#87ceeb",
            inactiveTintColor: "gray",
            scrollEnabled: true,
          }}
        >
          <Tab.Screen name="Playlists" component={PlayLists} />
          <Tab.Screen name="Tracks" component={Tracks} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Full Screen Player" component={FullScreenPlayer} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Reset Password" component={ResetPassword} />
          <Stack.Screen name="Register" component={SignUpPage} />
        </Stack.Navigator>
      )} */}
    </NavigationContainer>
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
