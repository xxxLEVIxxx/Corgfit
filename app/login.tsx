import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  useFonts,
  PermanentMarker_400Regular,
} from "@expo-google-fonts/permanent-marker";
import { useRouter, useNavigation } from "expo-router";

export default function Login() {
  const [fontsLoaded] = useFonts({ PermanentMarker_400Regular });

  const [passwd, setPasswd] = useState("");
  const [email, setEmail] = useState("");
  const [index, setIndex] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const [reverseAnimation, setReverseAnimation] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const router = useRouter();

  const handleLogIn = () => {
    // check log in here
    router.replace("/dashboard");
  };

  const handleFocus = () => {
    setStartAnimation(true);
    setReverseAnimation(false);
    setIndex(0);
  };

  const handleBlur = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setReverseAnimation(true);
    setStartAnimation(false);
  };

  useEffect(() => {
    if (startAnimation && index < images.length - 1) {
      timeoutRef.current = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, 80);
    } else if (startAnimation && index === images.length - 1) {
      setStartAnimation(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [startAnimation, index]);

  useEffect(() => {
    if (reverseAnimation && index > 0) {
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => prev - 1);
      }, 80);
    } else if (reverseAnimation && index === 0) {
      setReverseAnimation(false);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [reverseAnimation, index]);

  const images = [
    require("../assets/images/corgi-1.png"),
    require("../assets/images/corgi-2.png"),
    require("../assets/images/corgi-3.png"),
    require("../assets/images/corgi-4.png"),
  ];

  return (
    <View style={styles.container}>
      
      <Image source={images[index]} style={styles.logo} />
      {fontsLoaded? (<Text style={styles.title}> CORGFIT</Text>) : (<ActivityIndicator size="large" color="#0000ff"/>)}

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={passwd}
        onChangeText={setPasswd}
        placeholderTextColor="#888"
        secureTextEntry
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogIn}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <FontAwesome name="google" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1F24",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    color: "#fff",
    fontSize: 40,
    marginBottom: 30,
    paddingHorizontal: 10,
    fontFamily: "PermanentMarker_400Regular",
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#CC749C",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: "row",
  },
  signupText: {
    color: "#fff",
  },
  signupLink: {
    color: "#CC8533",
    fontWeight: "700",
    marginLeft: 5,
  },
});
