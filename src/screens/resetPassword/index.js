import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import backImg from "../../../assets/bg4.jpg";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/actions/auth.actions";
import { ScrollView } from "react-native-gesture-handler";
// import { Button } from "react-native-paper";
// import { TextInput } from "react-native-paper";
const image = backImg;
/**
 * @author
 * @function ResetPassword
 **/
const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  useEffect(() => {
    if (email !== "") {
      if (authState.resetRequest) {
        alert("A reset link has been sent to the provided email address");
      } else {
        alert(authState.error);
      }
    }
  }, [authState]);
  const sendResetPasswordLink = () => {
    dispatch(resetPassword(email));
  };

  const { container, textInput, btnstyle, tStyle, innercontainer } = styles;
  const [email, setEmail] = React.useState("");
  return (
    <View style={container}>
      <StatusBar style="auto" />
      <ImageBackground source={image} style={styles.image}>
        <ScrollView>
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
                marginTop: 150,
                alignSelf: "center",
              }}
            >
              Reset password
            </Text>
          </View>
          <View style={innercontainer}>
            <View style={textInput}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
              <TextInput
                placeholder="Your email"
                placeholderTextColor="white"
                value={email}
                style={tStyle}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <TouchableOpacity
              title="Login"
              style={btnstyle}
              onPress={sendResetPasswordLink}
            >
              <Text> Reset </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  innercontainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    marginTop: 30,
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  textInput: {
    borderRadius: 30,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    margin: 10,
    width: "90%",
  },
  btnstyle: {
    backgroundColor: "#87ceeb",
    width: "90%",
    borderRadius: 30,
    alignItems: "center",
    padding: 15,
    margin: 10,
  },
  tStyle: {
    marginLeft: 10,
    width: "90%",
    color: "white",
  },
});
export default ResetPassword;
