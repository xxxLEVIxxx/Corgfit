import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { LogForm } from "@/components/LogForm";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { EXERCISE_DATA } from "./Context";
import { useExercises } from "./Context";

export default function Log() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const exerciseName = params.exerciseName as string;
  const exerciseId = parseInt(params.exerciseId as string);
  const { exercises, setExercises } = useExercises();

  // Get the current exercise
  const currentExercise = exercises.find((ex) => ex.id === exerciseId);

  const [HowToModalVisible, setHowToModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [maxSets, setMaxSets] = useState<number>(3);
  const [loggedSets, setLoggedSets] = useState<
    Array<{ setNumber: number; reps: number; weight: number }>
  >([]);
  const scrollRef = useRef<ScrollView>(null);

  // Get the exercise image from EXERCISE_DATA
  const exerciseImage = exerciseName
    ? EXERCISE_DATA[exerciseName][2]
    : require("@/assets/images/benchpress.png");

  // Scroll to the bottom of the modal when it is opened
  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  }, [modalVisible]);

  // Handle set data from LogForm
  const handleSetData = (reps: number, weight: number) => {
    console.log("handleSetData called with:", { reps, weight, currentSet });
    setLoggedSets((prev) => {
      // Update the current set if it exists, or add a new one
      const existingSetIndex = prev.findIndex(
        (set) => set.setNumber === currentSet
      );
      if (existingSetIndex >= 0) {
        const newSets = [...prev];
        newSets[existingSetIndex] = { setNumber: currentSet, reps, weight };
        console.log("Updated existing set:", newSets);
        return newSets;
      } else {
        const newSets = [...prev, { setNumber: currentSet, reps, weight }];
        console.log("Added new set:", newSets);
        return newSets;
      }
    });
  };

  // Log workout
  const handleLogWorkout = () => {
    console.log("Current logged sets:", loggedSets);
    console.log("Current set:", currentSet);
    console.log("Max sets:", maxSets);

    // Make sure the current set is logged before continuing
    const currentSetLogged = loggedSets.some(
      (set) => set.setNumber === currentSet
    );

    // If not logged yet, create a set with default values instead of calling handleSetData
    const updatedLoggedSets = currentSetLogged
      ? loggedSets
      : [...loggedSets, { setNumber: currentSet, reps: 4, weight: 40 }];

    // Update the exercise's logged status in the context
    setExercises((currentExercises) => {
      const updatedExercises = currentExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          console.log("Updating exercise:", exercise.name);
          console.log("With logged sets:", updatedLoggedSets);
          return {
            ...exercise,
            isLogged: true,
            logged: `${currentSet}/${maxSets} Sets Logged`,
            loggedSets: updatedLoggedSets,
          };
        }
        return exercise;
      });
      console.log("Updated exercises:", updatedExercises);
      return updatedExercises;
    });

    // Continue with set progression or return
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
          <Image source={exerciseImage} style={styles.image} />
          <View style={styles.row}>
            <Text style={styles.title}>{exerciseName || "Exercise"}</Text>
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

          <View style={styles.separator} />
          <LogForm
            currentSet={currentSet}
            onDelete={minusCurrentSet}
            updateMaxSets={setMaxSets}
            scrollRef={scrollRef}
            onSetLogged={handleSetData}
          />
          <Pressable style={styles.closeButton} onPress={() => router.back()}>
            <MaterialIcons name="close" size={24} color="black" />
          </Pressable>
        </View>
      </ScrollView>

      {/* this is a button that logs the workout */}
      <View style={styles.bottom}>
        <Pressable style={styles.log_button} onPress={handleLogWorkout}>
          <Text style={styles.log_button_text}>Log Workout</Text>
        </Pressable>
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
    backgroundColor: "green",
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  log_button_text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#212529",
    height: 80,
  },
});
