import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList, Animated } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import { useExercises } from '@/app/Context';

interface Exercise {
  id: number;
  image: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export default function ExerciseList({ navigation }: { navigation: any }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const { exercises, setExercises } = useExercises();
    
    
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

    const onDelete = (index: number) => {
        setExercises(exercises.filter(exercise => exercise.id !== index));
    }
    // const swipeableRefs = useRef<Array<Swipeable | null>>([]);
    // const currentOpenSwipeable = useRef<Swipeable | null>(null);
  

    // const closeAllSwipeables = (index: number) => {
    //   if (currentOpenSwipeable.current && currentOpenSwipeable.current !== swipeableRefs.current[index]) {
    //     currentOpenSwipeable.current.close();
    //   }
    //   currentOpenSwipeable.current = swipeableRefs.current[index] || null;
    // };

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
                <TouchableOpacity onPress={() => navigation.push('/exercise_selector')}>
                    <Icon name="plus" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <Modal
                visible={showDropdown}
                transparent={true}
                onRequestClose={() => setShowDropdown(false)}
            >
                <View style={styles.modalView}>
                    <FlatList
                        data={exercises}
                        renderItem={({item}) => (
                            <TouchableOpacity 
                                onPress={() => {
                                    // setSelectedExercise(item);
                                    setShowDropdown(false);
                                }}
                            >
                                <Text style={styles.modalText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </Modal>

            {/* {exercises.map((exercise, index) => (
                
                // <Swipeable 
                //     ref={ref => swipeableRefs.current[index] = ref}
                //     key={exercise.id} 
                //     renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, index)} 
                //     containerStyle={styles.cardContainer}
                //     rightThreshold={40}
                //     overshootRight={false}
                //     onSwipeableOpen={() => closeAllSwipeables(index)}
                //     onSwipeableWillOpen={() => closeAllSwipeables(index)}
                // >
                    <TouchableOpacity 
                        style={styles.cardContainer}
                        onPress={() => navigation.push('/HowToModal')}
                    >
                        <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
                        <View style={styles.textContainer}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <Text style={styles.exerciseDetails}>
                            {exercise.sets} Sets • {exercise.reps} Reps • {exercise.weight} lbs
                        </Text>
                        </View>
                    </TouchableOpacity>
                // </Swipeable>

            
            ))} */}

            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer} 
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => (
                    
                    <TouchableOpacity
                    style={styles.cardContainer}
                    onPress={() => navigation.push("/HowToModal")}
                    >
                    <Image source={{ uri: item.image }} style={styles.exerciseImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.exerciseName}>{item.name}</Text>
                        <Text style={styles.exerciseDetails}>
                        {item.sets} Sets • {item.reps} Reps • {item.weight} lbs
                        </Text>
                    </View>
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
        paddingBottom: 80,
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
    moreButton: {
      padding: 5, 
    },
    modalView: {
        margin: 20,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 20,
        marginTop: 100,
    },
    modalText: {
        color: 'white',
        fontSize: 16,
        padding: 10,
    },
    // swipeableContainer: {
    //     marginVertical: 6,
    //     marginHorizontal: 20,
    //   },
    //   exerciseCard: {
    //     borderRadius: 16,
    //     padding: 16,
    //     flexDirection: "row",
    //     alignItems: "center",
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 3,
    //     elevation: 3,
    //   },
    //   deleteActionContainer: {
    //     width: 80,
    //     height: '100%',
    //     backgroundColor: '#FF3B30',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderTopRightRadius: 16,
    //     borderBottomRightRadius: 16,
    //   },
    //   deleteAction: {
    //     flex: 1,
    //     backgroundColor: '#FF3B30',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '100%',
    //   },
    //   deleteButton: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '100%',
    //   },
});