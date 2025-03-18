import React, { useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Streak from "@/components/Streak";
import ExerciseGoal from "@/components/ExerciseGoal";
import PR from "@/components/PR";
import MusclesTile from "@/components/MusclesTile";
import WeightTile from "@/components/WeightTile";
import ChartsTile from "@/components/ChartsTile";
import WeightFlipCard from "@/components/WeightFlipCard";
import { useRouter } from "expo-router";

interface LoginProps {
  lastLoginDate: string;

  streakCount: number;
}

interface ExerciseGoalProps {
  goal: number;
  progress: number;
  exerciseName: string;
}

interface WeightProps {
  weight_this_week: number;
  weight_last_week: number;
}

interface MusclesProps {
  muscles: string;
}

export default function dashboard() {
  const [loginProps, setLoginProps] = React.useState<LoginProps>({
    lastLoginDate: "2025-3-8",
    streakCount: 23,
  });

  const [exerciseGoalProps, setExerciseGoalProps] =
    React.useState<ExerciseGoalProps>({
      goal: 190,
      progress: 125,
      exerciseName: "Bench Press",
    });

  const [musclesProps, setMusclesProps] = React.useState<MusclesProps>({
    muscles: "Chest",
  });

  const [weightProps, setWeightProps] = React.useState<WeightProps>({
    weight_this_week: 173,
    weight_last_week: 176,
  });
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CORGFIT</Text>
      <Text style={styles.heading}>DASHBOARD</Text>
      <View style={styles.rows}>
        <View style={styles.row}>
          <Pressable style={styles.card}>
            <Streak
              count={loginProps.streakCount}
              lastLoginDate={loginProps.lastLoginDate}
            />
          </Pressable>
          <Pressable style={styles.card}>
            <MusclesTile muscles={musclesProps.muscles} />
            {/* target muscles components */}
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable style={styles.card}>
            <ExerciseGoal
              goal={exerciseGoalProps.goal}
              progress={exerciseGoalProps.progress}
              exerciseName={exerciseGoalProps.exerciseName}
            ></ExerciseGoal>
          </Pressable>

          {/* <WeightTile
              weight_this_week={weightProps.weight_this_week}
              weight_last_week={weightProps.weight_last_week}
            /> */}
          <WeightFlipCard
            weight_this_week={weightProps.weight_this_week}
            weight_last_week={weightProps.weight_last_week}
          />
          {/* weight components */}
        </View>
        <View style={styles.row}>
          <Pressable style={styles.card}>
            <PR />
          </Pressable>
          <Pressable style={styles.card} onPress={() => router.push("/charts")}>
            <ChartsTile chartTitle="Progress Chart" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    marginTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "#343A40",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: 150,
    height: 143,
  },
  rows: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 40,
  },
});
