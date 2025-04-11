import React from "react";
import { StyleSheet, View, Image, ImageSourcePropType } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface Set {
  setNumber: number;
  reps: number;
  weight: number;
}

interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  isPR: boolean;
  image: ImageSourcePropType;
}

interface WorkoutSummaryExerciseItemProps {
  exercise: Exercise;
}

const WorkoutSummaryExerciseItem = ({ exercise }: WorkoutSummaryExerciseItemProps) => {
  // Split sets into columns of 3 instead of 4
  const firstColumn = exercise.sets.slice(0, 3);
  const secondColumn = exercise.sets.slice(3);
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.exerciseCard}>
        {/* Image container */}
        <View style={styles.imageContainer}>
          <Image 
            source={exercise.image} 
            style={styles.exerciseImage} 
            resizeMode="cover"
          />
        </View>
        
        {/* Content */}
        <View style={styles.exerciseContent}>
          <View style={styles.exerciseHeader}>
            <ThemedText style={styles.exerciseName}>{exercise.name}</ThemedText>
            {exercise.isPR && (
              <View style={styles.prBadge}>
                <ThemedText style={styles.prText}>PR</ThemedText>
                <Image 
                  source={require("@/assets/images/PR-corgi.png")} 
                  style={styles.prCorgi} 
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
          
          {/* Sets Container - Display columns side by side */}
          <View style={styles.setsOuterContainer}>
            {/* First column of sets - always show up to 3 sets */}
            <View style={styles.setsContainer}>
              {firstColumn.map((set, index) => (
                <ThemedText key={`first-${index}`} style={styles.setInfo}>
                  {set.reps} × {set.weight} lb
                </ThemedText>
              ))}
              
              {/* Add empty placeholders if less than 3 sets to maintain consistent height */}
              {Array.from({ length: Math.max(0, 3 - firstColumn.length) }).map((_, index) => (
                <View key={`placeholder-${index}`} style={styles.setPlaceholder} />
              ))}
            </View>
            
            {/* Second column of sets if more than 3 sets */}
            {secondColumn.length > 0 && (
              <View style={styles.setsContainer}>
                {secondColumn.map((set, index) => (
                  <ThemedText key={`second-${index}`} style={styles.setInfo}>
                    {set.reps} × {set.weight} lb
                  </ThemedText>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
  },
  exerciseCard: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#2A2A2A",
    minHeight: 110,
    alignItems: "center",
  },
  imageContainer: {
    width: 80,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    overflow: "hidden",
    borderRadius: 12,
    marginLeft: 8,
  },
  exerciseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  exerciseContent: {
    flex: 1,
    padding: 12,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  setsOuterContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  setsContainer: {
    flexDirection: "column",
    minWidth: 100,
    marginRight: 20,
  },
  setInfo: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 1, // Reduced from 8 to 4 for tighter spacing between reps
    height: 20, // Fixed height for each set
  },
  setPlaceholder: {
    height: 24, // Reduced from 28 to 24 (height of set (20) + marginBottom (4))
  },
  prBadge: {
    backgroundColor: "#FF4D4D",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  prText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    marginRight: 4, // Add space between text and corgi
  },
  prCorgi: {
    width: 20,
    height: 20,
  },
});

export default WorkoutSummaryExerciseItem; 