import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import WorkoutSummaryExerciseItem from "@/components/WorkoutSummaryExerciseItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WorkoutSummary() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const router = useRouter();
  
  // Mock data for the workout summary
  const workoutData = {
    date: "Jan 1, 1970",
    muscleGroup: "Back",
    calories: "107 kcal",
    prs: 1,
    exercises: [
      {
        id: "1",
        name: "Lat Pulldown",
        sets: [
          { reps: 10, weight: 50, unit: "lbs" },
          { reps: 10, weight: 70, unit: "lbs" },
          { reps: 10, weight: 65, unit: "lbs" },
          { reps: 10, weight: 50, unit: "lbs" },
        ],
        isPR: false,
        image: require("@/assets/images/Lat_Pulldown.png")
      },
      {
        id: "2",
        name: "Seated Cable Row",
        sets: [
          { reps: 10, weight: 20, unit: "lbs" },
          { reps: 10, weight: 30, unit: "lbs" },
          { reps: 10, weight: 35, unit: "lbs" },
          { reps: 10, weight: 40, unit: "lbs" },
          { reps: 10, weight: 45, unit: "lbs" },
          { reps: 10, weight: 50, unit: "lbs" },
        ],
        isPR: true,
        image: require("@/assets/images/Barbell_Rows.png")
      }
    ]
  };

  const handleDone = () => {
    router.back();
  };

  const dynamicStyles = {
    container: {
      backgroundColor: Colors[colorScheme === 'light' ? 'light' : 'dark'].background,
    },
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme === 'light' ? 'light' : 'dark'].background }}>
      <ThemedView style={[styles.container, dynamicStyles.container]}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Header with Summary and Date */}
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>Summary</ThemedText>
            <ThemedText style={styles.headerDate}>{workoutData.date}</ThemedText>
          </View>
          
          {/* Muscle Group Icon */}
          <View style={styles.muscleGroupContainer}>
            <View style={styles.muscleIconContainer}>
              <Image 
                source={require("@/assets/images/react-logo.png")} 
                style={styles.muscleIcon} 
                resizeMode="contain"
              />
            </View>
            <ThemedText style={styles.muscleGroupText}>{workoutData.muscleGroup}</ThemedText>
          </View>
          
          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statsLeftSpacer} />
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Calories</ThemedText>
              <ThemedText style={styles.statValue}>{workoutData.calories}</ThemedText>
            </View>
            <View style={styles.statsCenterSpacer} />
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>PRs</ThemedText>
              <ThemedText style={styles.statValue}>{workoutData.prs}</ThemedText>
            </View>
            <View style={styles.statsRightSpacer} />
          </View>
          
          {/* Exercise Count */}
          <ThemedText style={styles.exerciseCount}>
            {workoutData.exercises.length} exercise{workoutData.exercises.length !== 1 ? 's' : ''}
          </ThemedText>
          
          {/* Exercise List */}
          <View style={styles.exerciseList}>
            {workoutData.exercises.map((exercise) => (
              <WorkoutSummaryExerciseItem 
                key={exercise.id}
                exercise={exercise}
              />
            ))}
          </View>
        </ScrollView>
        
        {/* Done Button */}
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={handleDone}
        >
          <ThemedText style={styles.doneButtonText}>Done</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  headerDate: {
    fontSize: 16,
    opacity: 0.7,
  },
  muscleGroupContainer: {
    alignItems: "center",
    marginBottom: 35,
  },
  muscleIconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  muscleIcon: {
    width: 70,
    height: 70,
    tintColor: "#FF4D4D",
  },
  muscleGroupText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  statsLeftSpacer: {
    flex: 1,
  },
  statsCenterSpacer: {
    flex: 2,
  },
  statsRightSpacer: {
    flex: 1,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  exerciseCount: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  exerciseList: {
    flex: 1,
  },
  doneButton: {
    backgroundColor: "#FF9500",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  doneButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
