import React from "react";
import { StyleSheet, FlatList, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// This will come from your DB later
const allExercises = [
  { id: '1', name: 'Bench Press', category: 'Chest' },
  { id: '2', name: 'Deadlift', category: 'Back' },
  { id: '3', name: 'Squats', category: 'Legs' },
  // ... more exercises
];

export default function ExerciseSelector() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleSelectExercise = (exercise) => {
    // Here you'll add the exercise to your workout
    // For now, just go back
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
          keyExtractor={(item) => item.id}
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
  // ... similar styles to workout_details.tsx
}); 