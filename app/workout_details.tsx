import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  View,
  Animated,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import ExerciseCard from '../components/ExerciseCard';
import { useExercises } from "./Context";

interface Exercise {
  id: number;
  name: string;
  logged?: string;
  details?: string;
  image: any;
  isLogged: boolean;
}

export default function WorkoutDetails() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { exercises, setExercises } = useExercises();

  // Set initial logged exercises, 0 and 4 as an example
  useEffect(() => {
    setExercises(currentExercises => 
      currentExercises.map((exercise, index) => {
        if (index === 0 || index === 4) {
          return {
            ...exercise,
            isLogged: true,
            logged: '3/3 Sets Logged'
          };
        }
        return exercise;
      })
    );
  }, []);

  const dynamicStyles = {
    container: {
      backgroundColor: Colors[colorScheme === 'light' ? 'light' : 'dark'].background,
    },
    exerciseCard: {
      backgroundColor: colorScheme === "dark" ? "#2A2A2A" : "#F2F2F7",
    },
  };

  const swipeableRefs = useRef<Array<Swipeable | null>>([]);

  const closeAllSwipeables = (indexToSkip?: number) => {
    swipeableRefs.current.forEach((ref, index) => {
      if (ref && index !== indexToSkip) {
        ref.close();
      }
    });
  };

  // Add this function to handle exercise deletion
  const deleteExercise = (id: number) => {
    setExercises((currentExercises) =>
      currentExercises.filter((exercise) => exercise.id !== id)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme === 'light' ? 'light' : 'dark'].background }}>
      <GestureHandlerRootView style={styles.rootView}>
        <ThemedView style={[styles.container, dynamicStyles.container]}>
          {/* Header */}
          <ThemedView style={styles.header}>
            <ThemedText style={styles.headerTitle}>
              {(exercises || []).length} Exercise
              {(exercises || []).length !== 1 ? "s" : ""}
            </ThemedText>
            <TouchableOpacity onPress={() => router.push("/exercise_selector")}>
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={Colors[colorScheme === 'light' ? 'light' : 'dark'].text}
              />
            </TouchableOpacity>
          </ThemedView>

          {/* Exercise List */}
          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.listContent}
            style={styles.list}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {router.push('/log')}}>
                <ExerciseCard
                  {...item}
                  isLogged={item.isLogged || false}
                  onDelete={deleteExercise}
                  swipeableRef={(ref) => (swipeableRefs.current[index] = ref)}
                  index={index}
                  onSwipeableOpen={closeAllSwipeables}
                  onSwipeableWillOpen={closeAllSwipeables}
                  colorScheme={colorScheme === 'light' ? 'light' : 'dark'}
                />
              </TouchableOpacity>
            )}
          />

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.replace("/workout_summary")}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </ThemedView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  swipeableContainer: {
    marginVertical: 6,
    marginHorizontal: 20,
  },
  exerciseCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  deleteActionContainer: {
    width: 80,
    height: "100%",
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#FFA500",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  loggedText: {
    fontSize: 14,
    color: "#34C759",
  },
  detailsText: {
    fontSize: 14,
    opacity: 0.6,
  },
  listContainer: {
    flex: 1,
    marginBottom: 80,
  },
  listContent: {
    paddingBottom: 100,
  },
  list: {
    flex: 1,
  },
});
