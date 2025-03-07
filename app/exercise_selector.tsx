import React from "react";
import { StyleSheet, FlatList, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useExercises } from "./Context";

// This will come from your DB later
const allExercises = [
  { id: 11, name: 'Bench Press', category: 'Chest', sets: 3, weight: 100, reps: 10, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
  { id: 12, name: 'Deadlift', category: 'Back', sets: 3, weight: 100, reps: 10, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
  { id: 13, name: 'Squats', category: 'Legs',  sets: 3, weight: 100, reps: 10, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" },
  // ... more exercises
];

export default function ExerciseSelector() {

  const { exercises, setExercises } = useExercises();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleSelectExercise = (exercise) => {
    // Here you'll add the exercise to your workout
    // For now, just go back
    setExercises(() => [...exercises, exercise]);
    router.back();
  };

  return (
    <Modal isVisible={true} onBackdropPress={() => router.back()} style={styles.modal}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText style={styles.headerTitle}>Select Exercise</ThemedText>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
        </ThemedView>

        <FlatList
          data={allExercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectExercise(item)}>
              <ThemedView style={styles.exerciseItem}>
                <ThemedText style={styles.exerciseName}>{item.name}</ThemedText>
                <ThemedText style={styles.categoryText}>{item.category}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          )}
        />
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  rootView: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  exerciseName: {
    color: 'white',
    fontSize: 16,
    
  },
  exerciseItem: {
    margin: 10,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    
    borderRadius: 10,
    
    paddingVertical: 15,
  },
  categoryText: {
    fontSize: 14,
    opacity: 0.6,
    paddingTop: 10,
  }

  // ... similar styles to workout_details.tsx
}); 