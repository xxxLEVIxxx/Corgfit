import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { useState, useEffect } from "react";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TargetMuscle from "@/components/TargetMuscle";
import ExerciseList from "@/components/ExerciseList";

import { useExercises } from "../Context";
import { useFonts, RobotoSlab_700Bold } from "@expo-google-fonts/roboto-slab";

interface TargetMuscle {
  name: string;
  image: string;
}

// interface Exercise {
//   id: number;
//   image: string;
//   name: string;
//   sets: number;
//   reps: number;
//   weight: number;
// }

export default function TabTwoScreen() {
  const router = useRouter();
  const [targetMuscles, setTargetMuscles] = useState<TargetMuscle[]>([]);
  const { exercises, setExercises } = useExercises();

  // Load fonts
  const [fontsLoaded] = useFonts({
    RobotoSlab_700Bold,
  });
  // Handle navigation to workout details
  const handleStartWorkout = () => {
    router.push("/workout_details");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout Plan</Text>
      <TargetMuscle />
      <ExerciseList />

      {/* <View style={styles.summaryContainer}>
        <TouchableOpacity 
          style={[styles.addButton, styles.summaryButton]}
          onPress={() => router.push("/workout_summary")}
        >
          <Text style={styles.buttonText}>View Summary</Text>
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212529",
    padding: 35,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    fontFamily: "RobotoSlab_700Bold",
  },
  startButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 150,
    marginTop: 30,
  },
  summaryContainer: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
