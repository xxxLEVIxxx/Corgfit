import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Circle } from "react-native-progress";

interface ExerciseGoalProps {
  goal: number;
  progress: number;
  exerciseName: string;
}

export default function ExerciseGoal({
  goal,
  progress,
  exerciseName,
}: ExerciseGoalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.white}>Goals</Text>
      <Text style={styles.white}>{exerciseName}</Text>
      <View>
        <Circle
          progress={progress / goal}
          size={60}
          thickness={5}
          color="orange"
          unfilledColor="white"
        ></Circle>
        <Text style={styles.progressCircleText1}>{goal}</Text>
        <Text style={styles.progressCircleText2}>lbs</Text>
      </View>

      <Text style={styles.white}>{goal - progress} lbs to go</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 5,
  },
  white: {
    color: "white",
    fontWeight: "bold",
  },
  orange: {
    color: "orange",
    fontSize: 50,
    fontWeight: "bold",
  },
  progressCircleText1: {
    position: "absolute",
    top: "25%",
    left: "20%",
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  progressCircleText2: {
    position: "absolute",
    top: "50%",
    left: "20%",
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
