import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList, Animated } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import { useExercises } from '@/app/Context';
import { useRouter } from 'expo-router';
import ExerciseCard from './ExerciseCard';

// interface Exercise {
//   id: number;
//   image: string;
//   name: string;
//   sets: number;
//   reps: number;
//   weight: number;
// }

export default function ExerciseList() {
    const { exercises, setExercises } = useExercises();
    const router = useRouter();
    
    useEffect(() => {
        setExercises([
            { name: "Bench Press", sets: 3, reps: 10, weight: 100, id: 1, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Chest' },
            { name: "Deadlift", sets: 3, reps: 10, weight: 100, id: 2, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Chest' },
            { name: "Squat", sets: 3, reps: 10, weight: 100, id: 3, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Leg' },
            { name: "Pull-ups", sets: 3, reps: 10, weight: 100, id: 4, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Chest' },
            { name: "Push-ups", sets: 3, reps: 10, weight: 100, id: 5, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Back' },
            { name: "Curls", sets: 3, reps: 10, weight: 100, id: 6, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Abs' },
            { name: "Dips", sets: 3, reps: 10, weight: 100, id: 7, image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", category: 'Chest' },
          ]);
    }, [])

    const deleteExercise = (index: number) => {
        setExercises(exercises.filter(exercise => exercise.id !== index));
    }
    const swipeableRefs = useRef<Array<Swipeable | null>>([]);
  

    const closeAllSwipeables = (indexToSkip?: number) => {
        swipeableRefs.current.forEach((ref, index) => {
          if (ref && index !== indexToSkip) {
            ref.close();
          }
        });
      };
    const renderRightActions = (
        progress: Animated.AnimatedInterpolation<number>,
        _dragX: Animated.AnimatedInterpolation<number>,
        index: number
        ) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [80, 0],
        });

        return (
            <View style={styles.deleteActionContainer}>
            <Animated.View
                style={[
                styles.deleteAction,
                {
                    transform: [{ translateX: trans }],
                },
                ]}
            >
                <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => onDelete(index)}
                >
                <Ionicons name="trash-outline" size={24} color="white" />
                </TouchableOpacity>
            </Animated.View>
            </View>
        );
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Exercises</Text>
                <TouchableOpacity onPress={() => router.push('/exercise_selector')}>
                    <Icon name="plus" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer} 
                showsVerticalScrollIndicator={true}
                renderItem={({ item, index }) => (
                    <TouchableOpacity styles={styles.cardContainer} onPress={() => router.push('/HowToModal')}>
                        <ExerciseCard
                            {...item}
                            isLogged={false}
                            onDelete={deleteExercise}
                            swipeableRef={ref => swipeableRefs.current[index] = ref}
                            index={index}
                            details={`${item.sets} Sets • ${item.reps} Reps • ${item.weight} lb`}
                            onSwipeableOpen={closeAllSwipeables}
                            onSwipeableWillOpen={closeAllSwipeables}
                            colorScheme={'dark'}
                        />
                    </TouchableOpacity>
                )}
            />
                
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    listContainer: {
        paddingBottom: 30,
      },
    cardContainer: {
        flexDirection: "row", 
        alignItems: "center",
        backgroundColor: "#1E1E1E",
        marginVertical: 8,
        borderRadius: 10,
        padding: 15,
    },
    exerciseImage: {
        width: 50, 
        height: 50,
        borderRadius: 10,
        marginRight: 20, 
    },
    textContainer: {
        flex: 1, 
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    exerciseDetails: {
        marginTop: 5,
        fontSize: 14,
        color: "gray",
    },
    
});