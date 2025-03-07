import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Exercise {
  id: number;
  image: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  category: string;
}

interface ExerciseContextType {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

// Initialize context as undefined to force proper usage through provider
const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

// Provider Component
export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: 1, name: 'Bench Press', category: 'Chest', image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", sets: 10, reps: 10, weight: 10 },
    { id: 2, name: 'Deadlift', category: 'Chest', image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", sets: 10, reps: 10, weight: 10 },
    { id: 3, name: 'Squats', category: 'Legs', image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", sets: 10, reps: 10, weight: 10 },
  ]);

  return (
    <ExerciseContext.Provider value={{ exercises, setExercises }}>
      {children}
    </ExerciseContext.Provider>
  );
};

// Custom Hook for easy use
export const useExercises = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExercises must be used within an ExerciseProvider');
  }
  return context;
};
