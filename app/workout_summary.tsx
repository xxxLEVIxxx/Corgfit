import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image, ScrollView, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import { useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

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
  const navigation = useNavigation();
  
  // Hide the header when this screen mounts
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, [navigation]);
  
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

  // Handle the done button press
  const handleDone = () => {
    // router.replace("/(tabs)/me");
    router.back();
    // router.push("/(tabs)/workout");

  };

  // Add dynamic styles for theming
  const dynamicStyles = {
    container: {
      backgroundColor: Colors[colorScheme ?? 'dark'].background,
    },
  };

  return (
      <Modal
        isVisible={true}
        style={{ margin: 0, justifyContent: 'flex-end' }}
        backdropOpacity={0}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        statusBarTranslucent
      >
      <View style={{ flex: 1, width: '100%' }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'dark'].background }}>
          <ThemedView   style={[
                                styles.container,
                                dynamicStyles.container,
                                { paddingTop: insets.top + 20 } // Add extra top padding
                              ]}>
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
          <ScrollView style={styles.exerciseList}>
            {workoutData.exercises.map((exercise) => (
              <WorkoutSummaryExerciseItem 
                key={exercise.id}
                exercise={exercise}
              />
            ))}
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
      </View>
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
    paddingHorizontal: 20,
    // You can remove manual paddingTop since SafeAreaView handles it
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 32,
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
    flex: 1, // Takes up space from left edge to 25% mark
  },
  statsCenterSpacer: {
    flex: 2, // Takes up space between Calories (25%) and PRs (75%)
  },
  statsRightSpacer: {
    flex: 1, // Takes up space from 75% mark to right edge
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
