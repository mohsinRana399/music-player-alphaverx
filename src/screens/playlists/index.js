import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import backImg from "../../../assets/bg4.jpg";
import { StatusBar } from "expo-status-bar";
import { ListItem, Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MiniPlayer from "../../components/miniPlayer";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
const image = backImg;
/**
 * @author
 * @function PlayLists
 **/
const list = [
  {
    name: "Pumping Iron",
  },
  {
    name: "Drive Time",
  },
  ,
  {
    name: "Rap",
  },
  ,
  {
    name: "Alone TIme",
  },
  ,
  {
    name: "Chris Jackson",
  },
];
const PlayLists = (props) => {
  const { container } = styles;
  const a = useSelector((state) => state.auth);
  useEffect(() => {
    console.log({ a });
  }, [a]);
  return (
    <View style={container}>
      <StatusBar style="auto" />
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.mainbar}>
          <Text
            style={{
              marginTop: "10%",
              color: "white",
              fontSize: 30,
              fontWeight: "bold",
              marginLeft: "35%",
            }}
          >
            Playlists
          </Text>
        </View>

        <ScrollView style={styles.listStyle}>
          {list.map((l, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                console.log("name = ", l.name);
                props.navigation.navigate("Tracks", {
                  itemId: i,
                  playlistName: l.name,
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "center",
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: "2%",
                    padding: 10,
                    margin: "5%",
                  }}
                >
                  <MaterialCommunityIcons
                    name="playlist-music-outline"
                    size={24}
                    color="white"
                  />
                </View>
                <View
                  style={{
                    marginTop: "7%",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {l.name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "80%",
                  alignSelf: "center",
                  borderBottomColor: "grey",
                  borderBottomWidth: 1,
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <MiniPlayer />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  listStyle: {
    flex: 2,
    width: "90%",
    borderRadius: 25,
    paddingBottom: 10,
    margin: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  mainbar: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
  },
});
export default PlayLists;
