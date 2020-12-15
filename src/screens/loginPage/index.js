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
import { signIn } from "../../redux/actions/auth.actions";
import { ScrollView } from "react-native-gesture-handler";
const image = backImg;

/**
 * @author
 * @function LoginPage
 **/
const LoginPage = (props) => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth);
  useEffect(() => {
    if (email !== "") {
      if (authStatus.authenticated) {
        props.navigation.navigate("Playlists");
      } else {
        alert("" + authStatus.error);
      }
    }
  }, [authStatus]);
  const loginUser = () => {
    console.log({ email }, { password });
    const data = { email, password };
    dispatch(signIn(data));
  };
  const { container, textInput, btnstyle, tStyle, innercontainer } = styles;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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
              Welcome
            </Text>
          </View>
          <View style={innercontainer}>
            <View style={textInput}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
              <TouchableOpacity style={{ width: "100%" }}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="white"
                  value={email}
                  keyboardType="email-address"
                  style={tStyle}
                  onChangeText={(text) => setEmail(text)}
                />
              </TouchableOpacity>
            </View>
            <View style={textInput}>
              <AntDesign name="lock" size={24} color="black" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry={true}
                value={password}
                style={tStyle}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Reset Password");
              }}
              style={{
                flexDirection: "row-reverse",
                // padding: 3,
                alignItems: "center",
                width: "90%",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "#87ceeb",
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              title="Login"
              style={btnstyle}
              onPress={loginUser}
            >
              <Text> Login </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                padding: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Register");
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#87ceeb",
                    paddingLeft: 5,
                  }}
                >
                  Register now
                </Text>
              </TouchableOpacity>
            </View>
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
export default LoginPage;
