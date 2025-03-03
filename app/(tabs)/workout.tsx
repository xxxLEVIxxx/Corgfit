import { StyleSheet, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TargetMuscle from '@/components/TargetMuscle';
import ExerciseList from '@/components/ExerciseList';

interface TargetMuscle {
  name: string;
  image: string;
}

interface Exercise {
  id: number;
  image: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export default function TabTwoScreen() {
  const router = useRouter();
  const [targetMuscles, setTargetMuscles] = useState<TargetMuscle[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Fetch target muscles and exercises from API
  useEffect(() => {
    setTargetMuscles([
      { name: "Chest", image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
      { name: "Back", image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
    ]);
    setExercises([
      { name: "Bench Press", sets: 3, reps: 10, weight: 100, id: 1, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
      { name: "Deadlift", sets: 3, reps: 10, weight: 100, id: 2, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
      { name: "Squat", sets: 3, reps: 10, weight: 100, id: 3, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
      { name: "Pull-ups", sets: 3, reps: 10, weight: 100, id: 4, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
      { name: "Push-ups", sets: 3, reps: 10, weight: 100, id: 5, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
      { name: "Curls", sets: 3, reps: 10, weight: 100, id: 6, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
      { name: "Dips", sets: 3, reps: 10, weight: 100, id: 7, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
    ]);
  }, []);
  
  // Handle navigation to workout details
  const handleStartWorkout = () => {
    router.push("/workout_details");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout Plan</Text>
      <TargetMuscle targetMuscles={targetMuscles} />
      <ExerciseList exercises={exercises} setExercises={setExercises} navigation={router} />
      
      {/* Summary Button (Moved to the Top Right) */}
      <View style={styles.summaryContainer}>
        <TouchableOpacity 
          style={[styles.addButton, styles.summaryButton]}
          onPress={() => router.push("/workout_summary")}
        >
          <Text style={styles.buttonText}>View Summary</Text>
        </TouchableOpacity>
      </View>

      {/* Start Workout Button - Navigates to workout_details */}
      <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
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
  summaryButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
