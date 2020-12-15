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
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import backImg from "../../../assets/bg4.jpg";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/actions/auth.actions";
import { ScrollView } from "react-native-gesture-handler";
// import { Button } from "react-native-paper";
// import { TextInput } from "react-native-paper";
const image = backImg;
/**
 * @author
 * @function SignUpPage
 **/
const SignUpPage = (props) => {
  const { container, textInput, btnstyle, tStyle, innercontainer } = styles;
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
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
  const registerUser = () => {
    const userData = { name, email, phone, password };
    if (password === confirmPass) {
      dispatch(signUp(userData));
    } else {
      alert("Passwords do not match");
    }
  };
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
              Register Now
            </Text>
          </View>
          <View style={innercontainer}>
            <View style={textInput}>
              <AntDesign name="user" size={24} color="black" />
              <TextInput
                placeholder="Name"
                placeholderTextColor="white"
                value={name}
                style={tStyle}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={textInput}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="white"
                value={email}
                keyboardType="email-address"
                style={tStyle}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={textInput}>
              <Feather name="smartphone" size={24} color="black" />
              <TextInput
                placeholder="phone"
                placeholderTextColor="white"
                value={phone}
                keyboardType="phone-pad"
                style={tStyle}
                onChangeText={(text) => setPhone(text)}
              />
            </View>
            <View style={textInput}>
              <AntDesign name="lock" size={24} color="black" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="white"
                value={password}
                secureTextEntry={true}
                style={tStyle}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View style={textInput}>
              <AntDesign name="lock" size={24} color="black" />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="white"
                value={confirmPass}
                secureTextEntry={true}
                style={tStyle}
                onChangeText={(text) => setConfirmPass(text)}
              />
            </View>

            <TouchableOpacity
              title="Register"
              style={btnstyle}
              onPress={registerUser}
            >
              <Text> Register </Text>
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
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Login");
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
                  Sign in
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
export default SignUpPage;
