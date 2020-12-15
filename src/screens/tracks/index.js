import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import backImg from "../../../assets/bg4.jpg";
import { StatusBar } from "expo-status-bar";
import { ListItem, Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MiniPlayer from "../../components/miniPlayer";
import { AntDesign } from "@expo/vector-icons";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
const image = backImg;
/**
 * @author
 * @function PlayLists
 **/
const allTracks = [
  {
    title: "Hamlet - Act I",
    author: "William Shakespeare",
    source: "Librivox",
    uri:
      "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "The Random song",
    author: "WHo the fuck knows",
    source: "ME!!",
    uri:
      "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act III",
    author: "William Shakespeare",
    source: "Librivox",
    uri:
      "http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act IV",
    author: "William Shakespeare",
    source: "Librivox",
    uri:
      "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
  {
    title: "Hamlet - Act V",
    author: "William Shakespeare",
    source: "Librivox",
    uri:
      "https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3",
    imageSource:
      "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
  },
];

/**
 * @author
 * @function Tracks
 **/
const Tracks = (props) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { container } = styles;
  const dispatch = useDispatch();
  var playlistName = "";
  const [track, setTrack] = useState(null);
  if (props.route.params) {
    playlistName = props.route.params.playlistName;
  }

  useEffect(() => {
    dispatch({ type: "TRACKS_TO_PLAY", payload: allTracks });
  }, []);

  const goFullScreen = () => {
    console.log("Calling fullScreen!");
    setIsFullscreen(!isFullscreen);
  };

  return (
    <View style={container}>
      <StatusBar style="auto" />
      <ImageBackground source={image} style={styles.image}>
        {!isFullscreen ? (
          <>
            <View style={styles.mainbar}>
              {playlistName ? (
                <Text
                  style={{
                    marginTop: "10%",
                    color: "white",
                    fontSize: 30,
                    fontWeight: "bold",
                    marginLeft: "30%",
                  }}
                >
                  {playlistName}
                </Text>
              ) : (
                <Text
                  style={{
                    marginTop: "10%",
                    color: "white",
                    fontSize: 30,
                    fontWeight: "bold",
                    marginLeft: "35%",
                  }}
                >
                  Tracks
                </Text>
              )}
            </View>
            <ScrollView style={styles.listStyle}>
              {allTracks.map((l, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setTrack(l);
                    dispatch({ type: "NOW_PLAYING", payload: i });
                    console.log("name = ", i);
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
                      <AntDesign name="playcircleo" size={24} color="white" />
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
                        {l.title}
                      </Text>
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 15,
                          fontStyle: "italic",
                        }}
                      >
                        {l.author}
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
          </>
        ) : (
          <></>
        )}
        <MiniPlayer fullScreen={goFullScreen} fs={isFullscreen} />
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
  mainbar: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
  },
  listStyle: {
    flex: 2,
    width: "90%",
    borderRadius: 25,
    paddingBottom: 10,
    margin: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});
export default Tracks;
