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
import { useExercises } from "./Context";
import { ImageSourcePropType } from "react-native";

export default function WorkoutSummary() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { exercises } = useExercises();
  
  // Get today's date in the format "Jan 1, 2024"
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Filter only logged exercises
  const loggedExercises = exercises.filter(exercise => exercise.isLogged);
  
  // Get all unique muscle groups from logged exercises
  const muscleGroups = [...new Set(loggedExercises.map(exercise => exercise.category))];
  
  // Join muscle groups with comma for display
  const muscleGroupDisplay = muscleGroups.join(', ');
  
  // Mapping of muscle groups to their images
  const categoryImages: { [key: string]: ImageSourcePropType } = {
    "Back": require("@/assets/images/Target_Muscles_Images/back_target.png"),
    "Biceps": require("@/assets/images/Target_Muscles_Images/bicep_target.png"),
    "Calves": require("@/assets/images/Target_Muscles_Images/calf_target.png"),
    "Chest": require("@/assets/images/Target_Muscles_Images/chest_target.png"),
    "Core": require("@/assets/images/Target_Muscles_Images/core_target.png"),
    "Glutes": require("@/assets/images/Target_Muscles_Images/glute_target.png"),
    "Hamstrings": require("@/assets/images/Target_Muscles_Images/hamstring_target.png"),
    "Shoulders": require("@/assets/images/Target_Muscles_Images/shoulder_target.png"),
    "Legs": require("@/assets/images/Target_Muscles_Images/leg_target.png"),
    "Triceps": require("@/assets/images/Target_Muscles_Images/tricep_target.png")
  };

  // Format exercises for display
  const formattedExercises = loggedExercises.map(exercise => ({
    id: exercise.id.toString(),
    name: exercise.name,
    sets: exercise.loggedSets || [],
    isPR: false, // We can implement PR detection later
    image: exercise.image
  }));

  // Calculate workout stats
  const workoutData = {
    date: formattedDate,
    muscleGroup: muscleGroupDisplay || "Workout",
    calories: "107 kcal", // This could be calculated based on the exercises
    prs: 0, // This could be determined by comparing with previous workouts
    exercises: formattedExercises
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
          
          {/* Muscle Groups Icons Carousel */}
          <View style={styles.muscleGroupContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.muscleGroupScrollContent}
            >
              {muscleGroups.map((muscleGroup, index) => (
                <View key={index} style={styles.muscleIconWrapper}>
                  <View style={styles.muscleIconContainer}>
                    <Image 
                      source={categoryImages[muscleGroup]} 
                      style={styles.muscleIcon} 
                      resizeMode="contain"
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
            
            {/* Muscle Group Text Display */}
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
            {formattedExercises.length} exercise{formattedExercises.length !== 1 ? 's' : ''}
          </ThemedText>
          
          {/* Exercise List */}
          <View style={styles.exerciseList}>
            {formattedExercises.map((exercise) => (
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
  muscleGroupScrollContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  muscleIconWrapper: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  muscleIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  muscleIcon: {
    width: 50,
    height: 50,
  },
  muscleGroupText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
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
