import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Slider,
  ActivityIndicator,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign, Entypo, Feather } from "react-native-vector-icons";
import sImg from "../../../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
/**
 * @author
 * @function MiniPlayer
 **/
const songImg = sImg;
const MiniPlayer = (props) => {
  const [playStatus, setPlayStatus] = React.useState(false);
  const [trackNumber, setTrackNumber] = React.useState(0);
  const [isBuffering, setIsBuffering] = React.useState(1.0);
  const [playbackInstance, setPlaybackInstance] = React.useState(null);
  const [loop, setLoop] = React.useState(false);
  const [shuffle, setShuffle] = React.useState(false);
  const [playlist, setPlaylist] = React.useState(null);
  const [songStart, setSongStart] = React.useState(0);
  const [songEnd, setSongEnd] = React.useState(0);
  const [songSeek, setSongSeek] = React.useState(0);
  const [songSeekStart, setSongSeekStart] = React.useState(0);
  const [songSeekEnd, setSongSeekEnd] = React.useState(0);
  const playlistFromstate = useSelector((state) => state.playlist);
  useEffect(() => {
    setPlaylist(playlistFromstate.completePlaylist);
    setTrackNumber(playlistFromstate.currentTrack);
    loadSelection(playlistFromstate.currentTrack);
  }, [playlistFromstate]);
  const loadSelection = async (index) => {
    var pi = playbackInstance;
    if (pi) {
      await pi.unloadAsync();
      console.log("initializing");
      loadAudio(index);
    } else {
      init(index);
    }
  };
  const init = async (index) => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: false,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: false,
      });

      loadAudio(index);
    } catch (e) {
      console.log(e);
    }
  };
  const loadAudio = async (ci) => {
    console.log("The track number when loading file = ", trackNumber);
    console.log("The ci number when loading file = ", ci);
    var currentIndex = ci;
    var isPlaying = playStatus;
    try {
      const pi = new Audio.Sound();
      const source = {
        uri: playlist[currentIndex].uri,
      };

      const status = {
        shouldPlay: isPlaying,
        volume: 1.0,
        shouldCorrectPitch: true,
      };

      pi.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await pi.loadAsync(source, status, false);

      await setPlaybackInstance(pi);
      console.log("pbs");
    } catch (e) {
      console.log(e);
    }
  };
  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  onPlaybackStatusUpdate = async (status) => {
    console.log("time = ", status.positionMillis);
    setSongStart(millisToMinutesAndSeconds(status.positionMillis));
    setSongSeek(status.positionMillis);
    setSongEnd(millisToMinutesAndSeconds(status.durationMillis));

    setSongSeekEnd(status.durationMillis);

    if (status.didJustFinish) {
      if (status.isLooping) {
        await playbackInstance.unloadAsync();
        loadAudio(trackNumber);
      } else {
        handleNextTrack(false);
      }
    }
    setIsBuffering(status.isBuffering);
  };
  handlePlayPause = async () => {
    var isPlaying = playStatus;
    var pi = playbackInstance;

    isPlaying ? await pi.pauseAsync() : await pi.playAsync();
    setPlayStatus(!playStatus);
  };

  handlePreviousTrack = async () => {
    var currentIndex = trackNumber;
    var pi = playbackInstance;
    if (pi) {
      await pi.unloadAsync();
      currentIndex < playlist.length - 1
        ? (currentIndex -= 1)
        : (currentIndex = 0);
      setTrackNumber(currentIndex);
      loadAudio(currentIndex);
    }
  };

  handleNextTrack = async (buttonPressed) => {
    var currentIndex = trackNumber;
    console.log({ loop, shuffle });
    var pi = playbackInstance;
    if (playbackInstance) {
      await pi.unloadAsync();
      currentIndex < playlist.length - 1
        ? (currentIndex += 1)
        : (currentIndex = 0);
      if (loop && !buttonPressed) {
        loadAudio(trackNumber);
      } else {
        if (shuffle) {
          const randomTrackNumber = Math.floor(
            Math.random() * Math.floor(playlist.length)
          );
          loadAudio(randomTrackNumber);
          setTrackNumber(randomTrackNumber);
          console.log("random index = ", randomTrackNumber);
        } else {
          loadAudio(currentIndex);
          setTrackNumber(currentIndex);
        }
      }
    }
  };

  const { container, container2 } = styles;
  const dispatch = useDispatch();
  return (
    <>
      {playlist && playbackInstance ? (
        <>
          {props.fs ? (
            <>
              <View style={container2}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    alignItems: "flex-start",
                    alignSelf: "flex-start",
                  }}
                  onPress={() => {
                    props.fullScreen();
                  }}
                >
                  <AntDesign
                    name="left"
                    size={24}
                    color="white"
                    style={{ alignItems: "flex-start" }}
                  />
                </TouchableOpacity>

                <Image
                  style={{ width: 180, height: 180, margin: 20 }}
                  source={{ uri: playlist[trackNumber]?.imageSource }}
                ></Image>

                <View style={styles.name_of_song_View}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "500",
                      alignSelf: "center",
                      color: "#FFF",
                      padding: "2%",
                    }}
                  >
                    {playlist[trackNumber]?.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#FFF",
                      alignSelf: "center",
                      marginBottom: 50,
                    }}
                  >
                    {playlist[trackNumber]?.author}
                  </Text>
                </View>

                {!songSeek ? (
                  <>
                    <View
                      style={{
                        height: "10%",
                        width: "100%",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 15,
                        marginTop: 100,
                      }}
                    >
                      <Text style={styles.slider_time}> 00:00 </Text>
                      <Slider
                        style={styles.slider_style}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#87ceeb"
                        maximumTrackTintColor="#87ceeb"
                        thumbTintColor="#87ceeb"
                        disabled={false}
                        onValueChange={(e) => {
                          console.log("changing");
                        }}
                        value={0}
                      />
                      <Text style={styles.slider_time}>00:00</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        height: "10%",
                        width: "100%",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 15,
                        marginTop: 100,
                      }}
                    >
                      <Text style={styles.slider_time}> {songStart} </Text>
                      <Slider
                        style={styles.slider_style}
                        minimumValue={0}
                        maximumValue={songSeekEnd}
                        minimumTrackTintColor="#87ceeb"
                        maximumTrackTintColor="#87ceeb"
                        thumbTintColor="#87ceeb"
                        onValueChange={(e) => {
                          console.log("changing");
                          playbackInstance.setPositionAsync(e);
                        }}
                        value={songSeek}
                      />
                      <Text style={styles.slider_time}>{songEnd}</Text>
                    </View>
                  </>
                )}

                <View style={styles.functions_view}>
                  <TouchableOpacity
                    onPress={() => {
                      setShuffle(!shuffle);
                    }}
                  >
                    {shuffle ? (
                      <MaterialCommunityIcons>
                        <MaterialCommunityIcons
                          name="shuffle-variant"
                          size={28}
                          color="#87ceeb"
                        />
                      </MaterialCommunityIcons>
                    ) : (
                      <MaterialCommunityIcons>
                        <MaterialCommunityIcons
                          name="shuffle-disabled"
                          size={28}
                          color="#87ceeb"
                        />
                      </MaterialCommunityIcons>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePreviousTrack}>
                    <Entypo
                      name="controller-fast-backward"
                      size={24}
                      color="#87ceeb"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePlayPause}>
                    {playStatus ? (
                      <>
                        <AntDesign
                          name="pausecircle"
                          size={50}
                          color="#87ceeb"
                        />
                      </>
                    ) : (
                      <>
                        <AntDesign name="play" size={50} color="#87ceeb" />
                      </>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleNextTrack(true)}>
                    <Entypo
                      name="controller-fast-forward"
                      size={24}
                      color="#87ceeb"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      playbackInstance.setIsLoopingAsync(!loop);
                      setLoop(!loop);
                    }}
                  >
                    {loop ? (
                      <MaterialCommunityIcons>
                        <MaterialCommunityIcons
                          name="repeat"
                          size={24}
                          color="#87ceeb"
                        />
                      </MaterialCommunityIcons>
                    ) : (
                      <MaterialCommunityIcons>
                        <MaterialCommunityIcons
                          name="repeat-off"
                          size={24}
                          color="#87ceeb"
                        />
                      </MaterialCommunityIcons>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={container}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                    }}
                    onPress={async () => {
                      console.log({ trackNumber });
                      props.fullScreen();
                    }}
                  >
                    <Image
                      style={styles.img}
                      source={{ uri: playlist[trackNumber]?.imageSource }}
                    ></Image>
                    <View style={styles.name_of_song_View}>
                      <Text style={styles.name_of_song_Text1}>
                        {playlist[trackNumber]?.title}
                      </Text>
                      <Text style={styles.name_of_song_Text2}>
                        {playlist[trackNumber]?.author}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {!songSeek ? (
                  <>
                    <View style={styles.slider_view}>
                      <Text style={styles.slider_time}> 00:00 </Text>
                      <Slider
                        style={styles.slider_style}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#87ceeb"
                        maximumTrackTintColor="#87ceeb"
                        thumbTintColor="#87ceeb"
                        disabled={false}
                        onValueChange={(e) => {
                          console.log("changing");
                        }}
                        value={0}
                      />
                      <Text style={styles.slider_time}>00:00</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.slider_view}>
                      <Text style={styles.slider_time}> {songStart} </Text>
                      <Slider
                        style={styles.slider_style}
                        minimumValue={0}
                        maximumValue={songSeekEnd}
                        minimumTrackTintColor="#87ceeb"
                        maximumTrackTintColor="#87ceeb"
                        thumbTintColor="#87ceeb"
                        onValueChange={(e) => {
                          console.log("changing");
                          playbackInstance.setPositionAsync(e);
                        }}
                        value={songSeek}
                      />
                      <Text style={styles.slider_time}>{songEnd}</Text>
                    </View>
                  </>
                )}

                <View style={styles.functions_view}>
                  <TouchableOpacity
                    onPress={() => {
                      setShuffle(!shuffle);
                    }}
                  >
                    {shuffle ? (
                      <MaterialCommunityIcons>
                        <MaterialCommunityIcons
                          name="shuffle-variant"
                          size={28}
                          color="#87ceeb"
                        />
                      </MaterialCommunityIcons>
                    ) : (
                      <MaterialCommunityIcons>
                        <MaterialCommunityIcons
                          name="shuffle-disabled"
                          size={28}
                          color="#87ceeb"
                        />
                      </MaterialCommunityIcons>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePreviousTrack}>
                    <Entypo
                      name="controller-fast-backward"
                      size={24}
                      color="#87ceeb"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePlayPause}>
                    {playStatus ? (
                      <>
                        <AntDesign
                          name="pausecircle"
                          size={50}
                          color="#87ceeb"
                        />
                      </>
                    ) : (
                      <>
                        <AntDesign name="play" size={50} color="#87ceeb" />
                      </>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleNextTrack(true)}>
                    <Entypo
                      name="controller-fast-forward"
                      size={24}
                      color="#87ceeb"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      playbackInstance.setIsLoopingAsync(!loop);
                      setLoop(!loop);
                    }}
                  >
                    {loop ? (
                      <MaterialCommunityIcons>
                        <MaterialCommunityIcons
                          name="repeat"
                          size={24}
                          color="#87ceeb"
                        />
                      </MaterialCommunityIcons>
                    ) : (
                      <MaterialCommunityIcons>
                        <MaterialCommunityIcons
                          name="repeat-off"
                          size={24}
                          color="#87ceeb"
                        />
                      </MaterialCommunityIcons>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </>
      ) : (
        <>
          <View style={container}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Image style={styles.img} source={sImg}></Image>
              <View style={styles.name_of_song_View}>
                <Text style={styles.name_of_song_Text1}>Song</Text>
                <Text style={styles.name_of_song_Text2}>Artist</Text>
              </View>
            </View>

            <View style={styles.slider_view}>
              <Text style={styles.slider_time}> 0:00 </Text>
              <Slider
                style={styles.slider_style}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#87ceeb"
                maximumTrackTintColor="#87ceeb"
                thumbTintColor="#87ceeb"
                onValueChange={(e) => {
                  console.log("changing");
                }}
                value={0}
              />
              <Text style={styles.slider_time}>0:00</Text>
            </View>

            <View style={styles.functions_view}>
              <TouchableOpacity>
                <Entypo name="shuffle" size={24} color="#87ceeb" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name="controller-fast-backward"
                  size={24}
                  color="#87ceeb"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="pausecircle" size={50} color="#87ceeb" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name="controller-fast-forward"
                  size={24}
                  color="#87ceeb"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="repeat" size={20} color="#87ceeb" />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 30,
    marginBottom: 10,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  now_playing_text: {
    fontSize: 19,
    color: "#FFF",
    padding: 5,
  },
  img: {
    width: 80,
    height: 80,
    margin: 20,
  },
  name_of_song_View: {
    // height: "15%",
    width: "100%",
    // justifyContent: "center",
    // alignSelf: "center",
    // margin: 10,
  },
  name_of_song_Text1: {
    fontSize: 19,
    fontWeight: "500",
    color: "#FFF",
  },
  name_of_song_Text2: {
    color: "#FFF",
    // marginTop: "2%",
  },
  slider_view: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  slider_style: {
    height: "170%",
    width: "60%",
  },
  slider_time: {
    fontSize: 15,
    color: "#FFF",
  },
  functions_view: {
    flexDirection: "row",
    justifyContent: "space-between",

    height: "10%",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 15,
    marginBottom: "10%",
    marginTop: "5%",
  },
});
export default MiniPlayer;
