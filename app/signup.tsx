import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  useFonts,
  PermanentMarker_400Regular,
} from "@expo-google-fonts/permanent-marker";
import { useRouter } from "expo-router";

export default function SignUp() {
  const [fontsLoaded] = useFonts({ PermanentMarker_400Regular });
  const router = useRouter();

  // form data
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [confirm, setConfirm] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // error messages
  const [passwdError, setPasswdError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [serverError, setServerError] = useState("");

  // corgi flip‑book animation
  const [index, setIndex] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const [reverseAnimation, setReverseAnimation] = useState(false);
  const [isAnyPasswordFieldFocused, setIsAnyPasswordFieldFocused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const images = [
    require("../assets/images/corgi-1.png"),
    require("../assets/images/corgi-2.png"),
    require("../assets/images/corgi-3.png"),
    require("../assets/images/corgi-4.png"),
  ];

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one capital letter";
    }
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handleEmailFocus = () => {
    // reverse corgi if leaving password
    setIsAnyPasswordFieldFocused(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setReverseAnimation(true);
    setStartAnimation(false);
  };

  const handlePasswordFocus = () => {
    if (!isAnyPasswordFieldFocused) {
      setIsAnyPasswordFieldFocused(true);
      setStartAnimation(true);
      setReverseAnimation(false);
      setIndex(0);
    }
  };

  const handlePasswordBlur = () => {
    // small delay so any other focus can set the flag first
    setTimeout(() => {
      if (!isAnyPasswordFieldFocused) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setReverseAnimation(true);
        setStartAnimation(false);
      }
    }, 50);
  };

  useEffect(() => {
    if (startAnimation && index < images.length - 1) {
      timeoutRef.current = setTimeout(() => setIndex(i => i + 1), 80);
    } else if (startAnimation && index === images.length - 1) {
      setStartAnimation(false);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [startAnimation, index]);

  useEffect(() => {
    if (reverseAnimation && index > 0) {
      timeoutRef.current = setTimeout(() => setIndex(i => i - 1), 80);
    } else if (reverseAnimation && index === 0) {
      setReverseAnimation(false);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [reverseAnimation, index]);

  const handlePasswordChange = (text: string) => {
    setPasswd(text);
    setPasswdError(validatePassword(text));
    // clear downstream errors
    setConfirmError("");
    setServerError("");
  };

  const handleConfirmChange = (text: string) => {
    setConfirm(text);
    setConfirmError("");
    setServerError("");
  };

  const handleSignUp = async () => {
    // reset all errors and block double‑taps
    setPasswdError("");
    setConfirmError("");
    setServerError("");
    setLoading(true);

    // client‑side checks
    const pwdErr = validatePassword(passwd);
    if (pwdErr) {
      setPasswdError(pwdErr);
      setLoading(false);
      return;
    }
    if (passwd !== confirm) {
      setConfirmError("Passwords do not match! Please re‑enter.");
      setLoading(false);
      return;
    }

    // server call
    try {
      const res = await fetch("http://192.168.0.141:8095/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: passwd }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message || "Signup failed. Please try again.");
        setLoading(false);
        return;
      }

      // all good → navigate
      setLoading(false);
      router.replace({ pathname: "/survey", params: { email } });
    } catch (err) {
      console.error("Signup error:", err);
      setServerError("Network error. Please try again.");
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <FontAwesome name="close" size={24} color="#fff" />
      </TouchableOpacity>

      <Image source={images[index]} style={styles.logo} />
      <Text style={styles.title}>CORGFIT</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        onFocus={handleEmailFocus}
        placeholderTextColor="#888"
      />

      {/* password */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          value={passwd}
          onChangeText={handlePasswordChange}
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(v => !v)}
        >
          <FontAwesome
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      {/* confirm */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm your password"
          style={styles.passwordInput}
          value={confirm}
          onChangeText={handleConfirmChange}
          placeholderTextColor="#888"
          secureTextEntry={!showConfirmPassword}
          onFocus={handlePasswordFocus}
          onBlur={handlePasswordBlur}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(v => !v)}
        >
          <FontAwesome
            name={showConfirmPassword ? "eye" : "eye-slash"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.loginButtonText}>Sign up</Text>
        }
      </TouchableOpacity>

      {/* single error line */}
      {(passwdError || confirmError || serverError) && (
        <Text style={styles.errorText}>
          {passwdError || confirmError || serverError}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#1C1F24",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 80,
    right: 20,
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
    fontFamily: "PermanentMarker_400Regular",
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  passwordContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    height: "100%",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#CC749C",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
  },
});
