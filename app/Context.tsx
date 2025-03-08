import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Exercise {
  id: number;
  image: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  category: string;
  logged?: string;
  isLogged?: boolean;
}

interface ExerciseContextType {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

// use API to fetch exercises
export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<Exercise[]>([
      { name: "Bench Press", sets: 3, reps: 10, weight: 100, id: 1, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Chest' },
      { name: "Deadlift", sets: 3, reps: 10, weight: 100, id: 2, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Chest' },
      { name: "Squat", sets: 3, reps: 10, weight: 100, id: 3, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Leg' },
      { name: "Pull-ups", sets: 3, reps: 10, weight: 100, id: 4, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Chest' },
      { name: "Push-ups", sets: 3, reps: 10, weight: 100, id: 5, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Back' },
      { name: "Curls", sets: 3, reps: 10, weight: 100, id: 6, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Abs' },
      { name: "Dips", sets: 3, reps: 10, weight: 100, id: 7, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Chest' },
  ]);

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
