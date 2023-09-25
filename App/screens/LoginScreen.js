import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const data = [
  {
    label: "Donor",
    value: "1",
  },
  {
    label: "NGO",
    value: "2",
  },
  {
    label: "Delivery Person",
    value: "3",
  },
];

export default function LoginScreen() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userTypeError, setUserTypeError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };



  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "orange" }]}>
          User Type:
        </Text>
      );
    }
    return null;
  };

  const navigation = useNavigation();
  return (
    <View style={styles.outermostCont}>
      <SafeAreaView className="flex ">
        <View style={styles.backArrowView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backbutton}
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.imgCont}>
          <Image
            source={require("../assets/images/login.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.innerCont}>
        <View className="form space-y-2">
          <Text style={styles.attributeName}>Email Address</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Email"
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
            }}
          />
          <Text style={styles.errorText}>{emailError}</Text>

          <Text style={styles.attributeName}>Password</Text>
          <TextInput
            style={styles.inputBox}
            secureTextEntry
            placeholder="Enter Password"
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
            }}
          />
          <Text style={styles.errorText}>{passwordError}</Text>
          <TouchableOpacity style={styles.forgotCont}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.container}>
              {renderLabel()}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "orange" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "    Select login type" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <Ionicons name="person" size={20} color="black" />
                )}
              />
            </View>
            <Text style={styles.errorText}>{userTypeError}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              let isValid = true;
              if (!validateEmail() || !validatePassword()) {
                isValid = false;
              }
              if (value == null) {
                setUserTypeError("Please select a user type");
                isValid = false;
              } else {
                setUserTypeError("");
              }

              if (isValid) {
                // Proceed with sign-up logic
              } else {
                Alert.alert(
                  "Error",
                  "Please fill in all the fields correctly."
                );
              }
            }}
          >
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.or}>Or</Text>
        <View style={styles.bottomCont}>
          <TouchableOpacity style={styles.bottomInnerCont}>
            <Image
              source={require("../assets/icons/google.png")}
              style={styles.img}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomInnerCont}>
            <Image
              source={require("../assets/icons/apple.png")}
              style={styles.img}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomInnerCont}>
            <Image
              source={require("../assets/icons/facebook.png")}
              style={styles.img}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.lastCont}>
          <Text style={styles.textBlock}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signup}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outermostCont: {
    flex: 1,
    backgroundColor: themeColors.bg,
    marginTop: 10,
  },
  backArrowView: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  imgCont: {
    flexDirection: "row",
    justifyContent: "center",
  },
  backbutton: {
    backgroundColor: "orange",
    padding: 8,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: 25,
  },
  innerCont: {
    flex: 1,
    backgroundColor: "white",
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  attributeName: {
    color: "black",
    fontWeight: "400",
    marginLeft: 15,
  },
  inputBox: {
    padding: 16,
    backgroundColor: "#F3F4F6",
    color: "#4A5568",
    borderRadius: 16,
    marginBottom: 16,
  },
  forgotCont: {
    display: "flex",
    alignItems: "flex-end",
  },
  forgotText: {
    color: "black",
    marginBottom: 20,
  },
  loginButton: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "orange",
    borderRadius: 12,
  },
  login: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  or: {
    fontSize: 20,
    color: "#4a5568",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
  },
  bottomCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  bottomInnerCont: {
    padding: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
  },
  img: {
    width: 40,
    height: 40,
  },
  lastCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  textBlock: {
    color: "#718096",
    fontWeight: "600",
  },
  signup: {
    fontWeight: "600",
    color: "orange",
  },
  errorText: {
    color: "red",
    marginLeft: 15,
  },
});
