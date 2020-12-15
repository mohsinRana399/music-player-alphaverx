import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SocialIcon } from "react-native-elements";
import backImg from "../../../assets/bg4.jpg";
import { TouchableOpacity } from "react-native-gesture-handler";
import MiniPlayer from "../../components/miniPlayer";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/actions/auth.actions";
const image = backImg;
/**
 * @author
 * @function ProfileScreen
 **/
const ProfileScreen = (props) => {
  const [totalPlayTime, setTotalPLayTime] = React.useState("322");
  const [dailyPlayTime, setDailyPlayTime] = React.useState("40");
  const [weeklyPlayTime, setWeeklyPlayTime] = React.useState("110");
  const [monthlyPlayTime, setMonthlyPlayTime] = React.useState("204");
  const [name, setName] = React.useState("Julie");

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth);
  useEffect(() => {
    if (!authStatus.authenticated) {
      console.log("The navigation stack : ", props.navigation);
      console.log("gg");
    }
  }, [authStatus]);
  return (
    <ImageBackground source={image} style={styles.img}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            <TouchableOpacity
              onPress={() => {
                dispatch(signOut());
              }}
            >
              <MaterialCommunityIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image
                source={require("../../../assets/profile-pic.jpg")}
                style={styles.image}
                resizeMode="center"
              ></Image>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {name}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>
                {totalPlayTime}
              </Text>
              <Text style={[styles.text, styles.subText]}>Total play time</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {
                  borderColor: "#DFD8C8",
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}
            >
              <Text style={[styles.text, { fontSize: 24 }]}>
                {dailyPlayTime}
              </Text>
              <Text style={[styles.text, styles.subText]}>Daily playtime</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>
                {weeklyPlayTime}
              </Text>
              <Text style={[styles.text, styles.subText]}>Weekly playtime</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {
                  borderColor: "#DFD8C8",
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}
            >
              <Text style={[styles.text, { fontSize: 24 }]}>
                {monthlyPlayTime}
              </Text>
              <Text style={[styles.text, styles.subText]}>
                Monthly playtime
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginTop: 20,
              marginHorizontal: 20,
              width: "90%",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <SocialIcon type="twitter" />
            </TouchableOpacity>
            <TouchableOpacity>
              <SocialIcon type="facebook" />
            </TouchableOpacity>
            <TouchableOpacity>
              <SocialIcon type="instagram" />
            </TouchableOpacity>
            <TouchableOpacity>
              <SocialIcon type="google" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            title="Login"
            style={styles.btnstyle}
            onPress={() => props.navigation.navigate("Reset")}
          >
            <Text> Reset password </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  text: {
    color: "#FFF",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: "cover",
  },
  btnstyle: {
    backgroundColor: "#87ceeb",
    width: "90%",
    borderRadius: 30,
    alignItems: "center",
    padding: 15,
    margin: 10,
    alignSelf: "center",
  },
  img: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 10,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "400",
  },
  profileImage: {
    width: 200,
    resizeMode: "cover",
    backgroundColor: "red",
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },

  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
});
export default ProfileScreen;
