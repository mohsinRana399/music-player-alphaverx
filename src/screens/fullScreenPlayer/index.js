import React, { useCallback, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";

const Dev_Height = Dimensions.get("window").height;
const Dev_Width = Dimensions.get("window").width;
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign, Entypo, Feather } from "react-native-vector-icons";
import Slider from "@react-native-community/slider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProgressCircle from "react-native-progress-circle";
import backImg from "../../../assets/bg4.jpg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
const image = backImg;
import { Audio } from "expo-av";

import sImg from "../../../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
/**
 * @author
 * @function FullScreenPlayer
 **/
const FullScreenPlayer = (props) => {
  const [songName, setSongName] = React.useState("Let Me Down Slowly");
  const [singer, setSinger] = React.useState("Alex Benjamin");
  const [playStatus, setPlayStatus] = React.useState(false);
  const [trackNumber, setTrackNumber] = React.useState(0);
  const [isBuffering, setIsBuffering] = React.useState(1.0);
  const [playbackInstance, setPlaybackInstance] = React.useState(null);
  const [loop, setLoop] = React.useState(false);
  const [songStart, setSongStart] = React.useState(0);
  const [songEnd, setSongEnd] = React.useState(0);
  const [songSeek, setSongSeek] = React.useState(0);
  const [songSeekStart, setSongSeekStart] = React.useState(0);
  const [songSeekEnd, setSongSeekEnd] = React.useState(0);
  const [shuffle, setShuffle] = React.useState(false);
  const [playlist, setPlaylist] = React.useState(null);
  const dispatch = useDispatch();
  const audioBookPlaylist = [
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
  // AN ERROR LIES BELOW
  const playlistFromstate = useSelector((state) => state.playlist);
  useEffect(() => {
    console.log("inside uef");
    setPlaylist(playlistFromstate.completePlaylist);
    setTrackNumber(playlistFromstate.currentTrack);
    loadSelection(playlistFromstate.currentTrack);
  }, [playlistFromstate]);
  useEffect(() => {
    if (props.route.params) {
      dispatch({
        type: "NOW_PLAYING",
        pauload: props.route.params.trackToPLay,
      });
    }
  }, []);
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
  onPlaybackStatusUpdate = (status) => {
    // console.log({
    //   finish: status.didJustFinish,
    //   valueOFLoop: status.isLooping,
    // });
    console.log("time = ", status.positionMillis);
    setSongStart(millisToMinutesAndSeconds(status.positionMillis));
    setSongSeek(status.positionMillis);
    setSongEnd(millisToMinutesAndSeconds(status.durationMillis));

    setSongSeekEnd(status.durationMillis);
    if (status.didJustFinish) {
      if (status.isLooping) {
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
      currentIndex < audioBookPlaylist.length - 1
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
      currentIndex < audioBookPlaylist.length - 1
        ? (currentIndex += 1)
        : (currentIndex = 0);
      if (loop && !buttonPressed) {
        loadAudio(trackNumber);
      } else {
        if (shuffle) {
          const randomTrackNumber = Math.floor(
            Math.random() * Math.floor(audioBookPlaylist.length)
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
  const { container } = styles;
  return (
    <ImageBackground source={image} style={styles.img}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.contanier}>
        <View style={styles.mainbar}>
          <Text style={styles.now_playing_text}> Now Playing </Text>
          <Text>.</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  contanier: {
    height: Dev_Height,
    width: Dev_Width,
  },
  mainbar: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
  },
  now_playing_text: {
    fontSize: 19,
    alignItems: "center",
    alignSelf: "center",
    marginLeft: "30%",
    color: "#FFF",
  },
  music_logo_view: {
    height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image_view: {
    height: "100%",
    width: "50%",
    borderRadius: 10,
  },
  name_of_song_View: {
    height: "15%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  name_of_song_Text1: {
    fontSize: 19,
    fontWeight: "500",
    color: "#FFF",
  },
  name_of_song_Text2: {
    color: "#FFF",
    marginTop: "4%",
  },
  slider_view: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  slider_style: {
    height: "70%",
    width: "60%",
  },
  slider_time: {
    fontSize: 15,
    marginLeft: "6%",
    color: "#FFF",
  },
  functions_view: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    marginLeft: "15%",
  },
  recently_played_view: {
    height: "25%",
    width: "100%",
  },
  recently_played_text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#808080",
    marginLeft: "5%",
    marginTop: "6%",
  },
  recently_played_list: {
    backgroundColor: "#FFE3E3",
    height: "50%",
    width: "90%",
    borderRadius: 10,
    marginLeft: "5%",
    marginTop: "5%",
    alignItems: "center",
    flexDirection: "row",
  },
  recently_played_image: {
    height: "80%",
    width: "20%",
    borderRadius: 10,
  },
  recently_played_list_text: {
    height: "100%",
    width: "60%",
    justifyContent: "center",
  },
  recently_played_list_text1: {
    fontSize: 15,
    marginLeft: "8%",
  },
  recently_played_list_text2: {
    fontSize: 16,
    color: "#808080",
    marginLeft: "8%",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
export default FullScreenPlayer;
