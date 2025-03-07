import { color } from "highcharts";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { LogForm } from "@/components/LogForm";
import { CloseButton } from "react-bootstrap";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Log() {
  const router = useRouter();
  const [HowToModalVisible, setHowToModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [maxSets, setMaxSets] = useState<number>(3);
  const scrollRef = useRef<ScrollView>(null);

  // Scroll to the bottom of the modal when it is opened
  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  }, [modalVisible]);

  // Log workout
  const handleLogWorkout = () => {
    // Log workout
    if (currentSet < maxSets) {
      setCurrentSet(currentSet + 1);
    } else {
      setCurrentSet(1);
      router.back();
    }
  };

  const minusCurrentSet = () => {
    setCurrentSet(currentSet - 1);
  };

  // Add a small delay to ensure the new content is rendered before scrolling
  const handleAddSet = () => {
    if (currentSet < maxSets) {
      // Add a small delay to ensure the new content is rendered before scrolling
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.modal}
    >
      {/* this is a scroll view that contains the modal content */}
      <ScrollView
        style={styles.scroll}
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }} // Add padding for bottom button
      >
        <View style={styles.modal}>
          <Image
            source={require("@/assets/images/benchpress.png")}
            style={styles.image}
          ></Image>
          <View style={styles.row}>
            <Text style={styles.title}>Bench Press</Text>
            <Pressable
              style={styles.howto}
              onPress={() => router.push("/HowToModal")}
            >
              <MaterialIcons name="play-arrow" size={24} color="white" />
              <Text style={styles.text}>How To</Text>
            </Pressable>
          </View>
          <View style={styles.highlight}>
            <View style={styles.sideHighlight} />
            <Text style={styles.highlightText}>
              Enter reps and weight to log your first set.
            </Text>
          </View>

          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <LogForm
            currentSet={currentSet}
            onDelete={minusCurrentSet}
            updateMaxSets={setMaxSets}
            scrollRef={scrollRef}
          />
          <Pressable style={styles.closeButton} onPress={() => router.back()}>
            <MaterialIcons name="close" size={24} color="black" />
          </Pressable>
        </View>
      </ScrollView>

      {/* this is a button that logs the workout */}
      <View style={styles.bottom}>
        <View style={styles.log_button}>
          <Button
            title="Log Workout"
            color={"white"}
            onPress={handleLogWorkout}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
  tile: {
    backgroundColor: "grey", // Background color
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    height: 80,
  },
  tile_heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212529",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2, // Adds spacing between text and hexagon
  },
  image: {
    width: "100%",
    resizeMode: "cover", // This will ensure the image covers the space
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  howto: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    width: 100,
    height: 40,
    borderRadius: 8,
  },
  scroll: {
    backgroundColor: "#212529",
    paddingTop: 60,
  },
  text: {
    color: "white",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  highlight: {
    flexDirection: "row",
    backgroundColor: "#343A40", // Light yellow background
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  sideHighlight: {
    width: 5, // Thin yellow bar on the left
    height: "100%",
    backgroundColor: "orange", // Slightly darker yellow
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  highlightText: {
    flex: 1,
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  log_button: {
    position: "absolute",
    bottom: 20,
    height: 40,
    width: 180,
    textAlign: "center",
    backgroundColor: "green",
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#212529",
    height: 80,
  },
});
