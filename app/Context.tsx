import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface Exercise {
  id: number;
  image: ImageSourcePropType;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  category: string;
  logged?: string;
  isLogged?: boolean;
  loggedSets?: Array<{
    setNumber: number;
    reps: number;
    weight: number;
  }>;
}

// Dictionary mapping exercise names to [muscle_group, list_image_path, how_to_image_path]
export const EXERCISE_DATA: { [key: string]: [string, ImageSourcePropType, ImageSourcePropType] } = {
  // Back Exercises
  "Barbell Rows": ["Back", require("@/assets/images/List-Images/Back_Barbell_Rows.png"), require("@/assets/images/How-To-Images/Back_HT_Barbell_Rows.png")],
  "Deadlift": ["Back", require("@/assets/images/List-Images/Back_Deadlift.png"), require("@/assets/images/How-To-Images/Back_HT_Deadlift.png")],
  "Dumbbell Row": ["Back", require("@/assets/images/List-Images/Back_Dumbell_Row.png"), require("@/assets/images/How-To-Images/Back_HT_Dumbell_Row.png")],
  "Lat Pulldown": ["Back", require("@/assets/images/List-Images/Back_Lat_PD.png"), require("@/assets/images/How-To-Images/Back_HT_Lat_PD.png")],
  "Pull Ups": ["Back", require("@/assets/images/List-Images/Back_Pull_Ups.png"), require("@/assets/images/How-To-Images/Back_HT_Pull_Ups.png")],

  // Bicep Exercises
  "Bicep Curl": ["Biceps", require("@/assets/images/List-Images/Bicep_Curl.png"), require("@/assets/images/How-To-Images/Bicep_HT_Curl.png")],
  "Concentration Curl": ["Biceps", require("@/assets/images/List-Images/Bicep_Concentration_Curl.png"), require("@/assets/images/How-To-Images/Bicep_HT_Concentration_Curl.png")],
  "Bicep Dumbbell Curl": ["Biceps", require("@/assets/images/List-Images/Bicep_Dumbell_Curl.png"), require("@/assets/images/How-To-Images/Bicep_HT_Dumbell_Curl.png")],
  "Hammer Curl": ["Biceps", require("@/assets/images/List-Images/Bicep_Hammer_Curl.png"), require("@/assets/images/How-To-Images/Bicep_HT_Hammer_Curl.png")],
  "Preacher Curl": ["Biceps", require("@/assets/images/List-Images/Bicep_Preacher_Curl.png"), require("@/assets/images/How-To-Images/Bicep_HT_Preacher_Curl.png")],

  // Calf Exercises
  "Donkey Raise": ["Calves", require("@/assets/images/List-Images/Calf_Donkey_Raise.png"), require("@/assets/images/How-To-Images/Calf_HT_Donkey_Raise.png")],
  "Jump Rope": ["Calves", require("@/assets/images/List-Images/Calf_Jump_Rope.png"), require("@/assets/images/How-To-Images/Calf_HT_Jump_Rope.png")],
  "Calf Raise": ["Calves", require("@/assets/images/List-Images/Calf_Raise.png"), require("@/assets/images/How-To-Images/Calf_HT_Raise.png")],
  "Seated Calf Raise": ["Calves", require("@/assets/images/List-Images/Calf_Seated_Raise.png"), require("@/assets/images/How-To-Images/Calf_HT_Seated_Raise.png")],
  "Smith Calf Raise": ["Calves", require("@/assets/images/List-Images/Calf_Smith_Raise.png"), require("@/assets/images/How-To-Images/Calf_HT_Smith_Raise.png")],

  // Chest Exercises
  "Bench Press": ["Chest", require("@/assets/images/List-Images/Chest_Bench_Press.png"), require("@/assets/images/How-To-Images/Chest_HT_Bench_Press.png")],
  "Dumbbell Chest Press": ["Chest", require("@/assets/images/List-Images/Chest_Dumbell_Press.png"), require("@/assets/images/How-To-Images/Chest_HT_Dumbell_Press.png")],
  "Chest Fly": ["Chest", require("@/assets/images/List-Images/Chest_Fly.png"), require("@/assets/images/How-To-Images/Chest_HT_Fly.png")],
  "Incline Dumbbell Press": ["Chest", require("@/assets/images/List-Images/Chest_Incline_Dumbell_Press.png"), require("@/assets/images/How-To-Images/Chest_HT_Incline_Dumbell_Press.png")],
  "Push Ups": ["Chest", require("@/assets/images/List-Images/Chest_Push_Ups.png"), require("@/assets/images/How-To-Images/Chest_HT_Push_Ups.png")],

  // Core Exercises
  "Bicycle Crunch": ["Core", require("@/assets/images/List-Images/Core_Bicycle_Crunch.png"), require("@/assets/images/How-To-Images/Core_HT_Bicycle_Crunch.png")],
  "Leg Raise": ["Core", require("@/assets/images/List-Images/Core_Leg_Raise.png"), require("@/assets/images/How-To-Images/Core_HT_Leg_Raise.png")],
  "Mountain Climbers": ["Core", require("@/assets/images/List-Images/Core_Mtn_Climbers.png"), require("@/assets/images/How-To-Images/Core_HT_Mtn_Climbers.png")],
  "Plank": ["Core", require("@/assets/images/List-Images/Core_Plank.png"), require("@/assets/images/How-To-Images/Core_HT_Plank.png")],
  "Russian Twist": ["Core", require("@/assets/images/List-Images/Core_Rus_Twist.png"), require("@/assets/images/How-To-Images/Core_HT_Rus_Twist.png")],

  // Glute Exercises
  "Glute Bridge": ["Glutes", require("@/assets/images/List-Images/Glute_Bridge.png"), require("@/assets/images/How-To-Images/Glute_HT_Bridge.png")],
  "Hip Thrust": ["Glutes", require("@/assets/images/List-Images/Glute_Hip_Thrust.png"), require("@/assets/images/How-To-Images/Glute_HT_Hip_Thrust.png")],
  "Kettlebell Row": ["Glutes", require("@/assets/images/List-Images/Glute_Kettlebell_Row.png"), require("@/assets/images/How-To-Images/Glute_HT_Kettlebell_Row.png")],
  "Split Squat": ["Glutes", require("@/assets/images/List-Images/Glute_Split_Squat.png"), require("@/assets/images/How-To-Images/Glute_HT_Split_Squat.png")],
  "Step Up": ["Glutes", require("@/assets/images/List-Images/Glute_Step_Up.png"), require("@/assets/images/How-To-Images/Glute_HT_Step_Up.png")],

  // Hamstring Exercises
  "Good Morning": ["Hamstrings", require("@/assets/images/List-Images/Hamstring_Good_Morning.png"), require("@/assets/images/How-To-Images/Hamstring_HT_Good_Morning.png")],
  "Machine Curl": ["Hamstrings", require("@/assets/images/List-Images/Hamstring_Machine_Curl.png"), require("@/assets/images/How-To-Images/Hamstring_HT_Machine_Curl.png")],
  "Romanian Deadlift": ["Hamstrings", require("@/assets/images/List-Images/Hamstring_Romanian_Deadlift.png"), require("@/assets/images/How-To-Images/Hamstring_HT_Romanian_Deadlift.png")],
  "Stiff Leg Deadlift": ["Hamstrings", require("@/assets/images/List-Images/Hamstring_Stiff_Deadlift.png"), require("@/assets/images/How-To-Images/Hamsting_HT_Stiff_Deadlift.png")],
  "Walking Lunge": ["Hamstrings", require("@/assets/images/List-Images/Hamstring_Walk_Lunge.png"), require("@/assets/images/How-To-Images/Hamstring_HT_Walk_Lunge.png")],

  // Leg Exercises
  "Barbell Squats": ["Legs", require("@/assets/images/List-Images/Leg_Barbell_Squats.png"), require("@/assets/images/How-To-Images/Leg_HT_Barbell_Squats.png")],
  "Lunges": ["Legs", require("@/assets/images/List-Images/Leg_Lunges.png"), require("@/assets/images/How-To-Images/Leg_HT_Lunges.png")],
  "Machine Extension": ["Legs", require("@/assets/images/List-Images/Leg_Machine_Extension.png"), require("@/assets/images/How-To-Images/Leg_HT_Machine_Extension.png")],
  "Leg Press": ["Legs", require("@/assets/images/List-Images/Leg_Press.png"), require("@/assets/images/How-To-Images/Leg_HT_Press.png")],
  "Leg Split Squat": ["Legs", require("@/assets/images/List-Images/Leg_Split_Squat.png"), require("@/assets/images/How-To-Images/Leg_HT_Split_Squat.png")],

  // Shoulder Exercises
  "Shoulder Dumbbell Press": ["Shoulders", require("@/assets/images/List-Images/Shoulder_Dumbell_Press.png"), require("@/assets/images/How-To-Images/Shoulder_HT_Dumbell_Press.png")],
  "Face Pulls": ["Shoulders", require("@/assets/images/List-Images/Shoulder_Face_Pulls.png"), require("@/assets/images/How-To-Images/Shoulder_HT_Face_Pulls.png")],
  "Front Raise": ["Shoulders", require("@/assets/images/List-Images/Shoulder_Front_Raise.png"), require("@/assets/images/How-To-Images/Shoulder_HT_Front_Raise.png")],
  "Lateral Raise": ["Shoulders", require("@/assets/images/List-Images/Shoulder_Lateral_Raise.png"), require("@/assets/images/How-To-Images/Shoulder_HT_Lateral_Raise.png")],
  "Reverse Fly": ["Shoulders", require("@/assets/images/List-Images/Shoulder_Reverse_Fly.png"), require("@/assets/images/How-To-Images/Shoulder_HT_Reverse_Fly.png")],

  // Tricep Exercises
  "Close Grip Bench": ["Triceps", require("@/assets/images/List-Images/Tricep_Close_Grip_Bench.png"), require("@/assets/images/How-To-Images/Tricep_HT_Close_Grip_Bench.png")],
  "Tricep Dips": ["Triceps", require("@/assets/images/List-Images/Tricep_Dips.png"), require("@/assets/images/How-To-Images/Tricep_HT_Dips.png")],
  "Tricep Kickbacks": ["Triceps", require("@/assets/images/List-Images/Tricep_Kickbacks.png"), require("@/assets/images/How-To-Images/Tricep_HT_Kickbacks.png")],
  "Tricep Overhead Extension": ["Triceps", require("@/assets/images/List-Images/Tricep_Overhead_Extension.png"), require("@/assets/images/How-To-Images/Tricep_HT_Overhead_Extension.png")],
  "Skullcrushers": ["Triceps", require("@/assets/images/List-Images/Tricep_Skullcrushers.png"), require("@/assets/images/How-To-Images/Tricep_HT_Skullcrushers.png")]
};

interface ExerciseContextType {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

// use API to fetch exercises
export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const initialExercises: Exercise[] = [
    {
      name: "Bench Press",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 1,
      image: EXERCISE_DATA["Bench Press"][1],
      category: EXERCISE_DATA["Bench Press"][0]
    },
    {
      name: "Deadlift",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 2,
      image: EXERCISE_DATA["Deadlift"][1],
      category: EXERCISE_DATA["Deadlift"][0]
    },
    {
      name: "Barbell Squats",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 3,
      image: EXERCISE_DATA["Barbell Squats"][1],
      category: EXERCISE_DATA["Barbell Squats"][0]
    },
    {
      name: "Pull Ups",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 4,
      image: EXERCISE_DATA["Pull Ups"][1],
      category: EXERCISE_DATA["Pull Ups"][0]
    },
    {
      name: "Push Ups",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 5,
      image: EXERCISE_DATA["Push Ups"][1],
      category: EXERCISE_DATA["Push Ups"][0]
    },
    {
      name: "Bicep Curl",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 6,
      image: EXERCISE_DATA["Bicep Curl"][1],
      category: EXERCISE_DATA["Bicep Curl"][0]
    },
    {
      name: "Tricep Dips",
      sets: 3,
      reps: 10,
      weight: 100,
      id: 7,
      image: EXERCISE_DATA["Tricep Dips"][1],
      category: EXERCISE_DATA["Tricep Dips"][0]
    }
  ];

  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);

  return (
    <ExerciseContext.Provider value={{ exercises, setExercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExercises must be used within an ExerciseProvider');
  }
  return context;
};


