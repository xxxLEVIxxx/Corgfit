import React from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useExercises, Exercise } from "./Context";
import { useState } from "react";
import { MuscleGroupFilter } from "@/components/MuscleGroupFilter";
import { set } from "date-fns";
import { EXERCISE_DATA } from "../app/Context";

interface ExerciseElement {
  id: number;
  name: string;
  category: string;
}

export default function ExerciseSelector() {
  const { exercises, setExercises } = useExercises();
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const colorScheme = useColorScheme();
  const router = useRouter();
  const exerciseList: ExerciseElement[] = [
    // Back Exercises
    { id: 1, name: "Barbell Rows", category: "Back" },
    { id: 2, name: "Deadlift", category: "Back" },
    { id: 3, name: "Dumbbell Row", category: "Back" },
    { id: 4, name: "Lat Pulldown", category: "Back" },
    { id: 5, name: "Pull Ups", category: "Back" },

    // Bicep Exercises
    { id: 6, name: "Bicep Curl", category: "Biceps" },
    { id: 7, name: "Concentration Curl", category: "Biceps" },
    { id: 8, name: "Bicep Dumbbell Curl", category: "Biceps" },
    { id: 9, name: "Hammer Curl", category: "Biceps" },
    { id: 10, name: "Preacher Curl", category: "Biceps" },

    // Calf Exercises
    { id: 11, name: "Donkey Raise", category: "Calves" },
    { id: 12, name: "Jump Rope", category: "Calves" },
    { id: 13, name: "Calf Raise", category: "Calves" },
    { id: 14, name: "Seated Calf Raise", category: "Calves" },
    { id: 15, name: "Smith Calf Raise", category: "Calves" },

    // Chest Exercises
    { id: 16, name: "Bench Press", category: "Chest" },
    { id: 17, name: "Dumbbell Chest Press", category: "Chest" },
    { id: 18, name: "Chest Fly", category: "Chest" },
    { id: 19, name: "Incline Dumbbell Press", category: "Chest" },
    { id: 20, name: "Push Ups", category: "Chest" },

    // Core Exercises
    { id: 21, name: "Bicycle Crunch", category: "Core" },
    { id: 22, name: "Leg Raise", category: "Core" },
    { id: 23, name: "Mountain Climbers", category: "Core" },
    { id: 24, name: "Plank", category: "Core" },
    { id: 25, name: "Russian Twist", category: "Core" },

    // Glute Exercises
    { id: 26, name: "Glute Bridge", category: "Glutes" },
    { id: 27, name: "Hip Thrust", category: "Glutes" },
    { id: 28, name: "Kettlebell Row", category: "Glutes" },
    { id: 29, name: "Split Squat", category: "Glutes" },
    { id: 30, name: "Step Up", category: "Glutes" },

    // Hamstring Exercises
    { id: 31, name: "Good Morning", category: "Hamstrings" },
    { id: 32, name: "Machine Curl", category: "Hamstrings" },
    { id: 33, name: "Romanian Deadlift", category: "Hamstrings" },
    { id: 34, name: "Stiff Leg Deadlift", category: "Hamstrings" },
    { id: 35, name: "Walking Lunge", category: "Hamstrings" },

    // Leg Exercises
    { id: 36, name: "Barbell Squats", category: "Legs" },
    { id: 37, name: "Lunges", category: "Legs" },
    { id: 38, name: "Machine Extension", category: "Legs" },
    { id: 39, name: "Leg Press", category: "Legs" },
    { id: 40, name: "Leg Split Squat", category: "Legs" },

    // Shoulder Exercises
    { id: 41, name: "Shoulder Dumbbell Press", category: "Shoulders" },
    { id: 42, name: "Face Pulls", category: "Shoulders" },
    { id: 43, name: "Front Raise", category: "Shoulders" },
    { id: 44, name: "Lateral Raise", category: "Shoulders" },
    { id: 45, name: "Reverse Fly", category: "Shoulders" },

    // Tricep Exercises
    { id: 46, name: "Close Grip Bench", category: "Triceps" },
    { id: 47, name: "Tricep Dips", category: "Triceps" },
    { id: 48, name: "Tricep Kickbacks", category: "Triceps" },
    { id: 49, name: "Tricep Overhead Extension", category: "Triceps" },
    { id: 50, name: "Skullcrushers", category: "Triceps" },
  ];
  const muscleGroups = [
    "Back",
    "Biceps",
    "Calves",
    "Chest",
    "Hamstrings",
    "Core",
    "Glutes",

    "Legs",
    "Shoulders",
    "Triceps",
  ];
  const [selectedExercises, setSelectedExercises] = useState(exerciseList);
  const [filteredExercises, setFilteredExercises] = useState(exerciseList);
  const handleSelectExercise = (exercise: Exercise) => {
    const newExercise = {
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      id: exercise.id,
      image: EXERCISE_DATA[exercise.name][1],  // Assuming the 2nd element is the list image.
      category: EXERCISE_DATA[exercise.name][0], // Assuming the 1st element is the category.
    };

    setExercises(() => [...exercises, exercise]);
    router.back();
  };

  const handleInputChange = (text: string) => {
    setSearch(text);
    setSelectedExercises(
      filteredExercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleInputFilterChange = (exerciseList: ExerciseElement[]) => {
    setSelectedExercises(
      exerciseList.filter((exercise) =>
        exercise.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  const handleFilterChange = (selectedGroup: string) => {
    const tempList = exerciseList.filter((exercise) =>
      exercise.category.includes(selectedGroup)
    );

    setFilteredExercises(tempList);
    handleInputFilterChange(tempList);
    setSelectedGroup(selectedGroup);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Exercise Library</ThemedText>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="close"
            size={24}
            color={Colors[colorScheme === "light" ? "light" : "dark"].text}
          />
        </TouchableOpacity>
      </ThemedView>

      {/* Search Box */}
      <ThemedView style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={Colors[colorScheme === "light" ? "light" : "dark"].text}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          placeholderTextColor={
            Colors[colorScheme === "light" ? "light" : "dark"].text + "80"
          }
          value={search}
          onChangeText={handleInputChange}
        />
        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearch("");
              setSelectedExercises(exerciseList);
            }}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={Colors[colorScheme === "light" ? "light" : "dark"].text}
            />
          </TouchableOpacity>
        )}
      </ThemedView>

      <View style={styles.row}>
        <Text style={styles.headerTitle}>Target Groups</Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedExercises(exerciseList);
            setFilteredExercises(exerciseList);
            setSearch("");
          }}
        >
          <Text style={{ color: "white" }}>Clear all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filter}>
        {muscleGroups.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleFilterChange(item)}
            style={[
              styles.button,
              item === selectedGroup && styles.activeButton,
            ]}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Exercise List */}
      <FlatList
        data={selectedExercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              handleSelectExercise({
                ...item,
                sets: 3, // Default value for sets
                reps: 10, // Default value for reps
                weight: 100, // Default value for weight
                image: typeof EXERCISE_DATA[item.name]?.[1] === "string"
                  ? { uri: EXERCISE_DATA[item.name][1] }
                  : EXERCISE_DATA[item.name]?.[1] || require("@/assets/images/List-Images/Calf_Donkey_Raise.png"), // Ensure valid ImageSourcePropType
              })
            }
          >
            <ThemedView style={styles.exerciseItem}>
              <ThemedText style={styles.exerciseName}>{item.name}</ThemedText>
              <ThemedText style={styles.categoryText}>
                {item.category}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              No available exercises found
            </ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 30,
    backgroundColor: "#212529",
  },
  rootView: {
    flex: 1,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#212529",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  exerciseName: {
    color: "white",
    fontSize: 16,
  },
  exerciseItem: {
    margin: 10,
    backgroundColor: "#343A40",
    alignItems: "center",

    borderRadius: 10,

    paddingVertical: 15,
  },
  categoryText: {
    fontSize: 14,
    opacity: 0.6,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#343A40",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.background + "40",
    marginHorizontal: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  filter: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "orange",
  },
  // ... similar styles to workout_details.tsx
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
