import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome";

interface Exercise {
  id: number;
  image: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export default function ExerciseList({ exercises, setExercises, navigation }: { exercises: Exercise[], setExercises: (exercises: Exercise[]) => void, navigation: any }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Exercises</Text>
                <TouchableOpacity onPress={() => setShowDropdown(true)}>
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
                                    setSelectedExercise(item);
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

            {exercises.map((exercise, index) => (
                <TouchableOpacity 
                    key={index} 
                    onPress={() => navigation.navigate("ExerciseDetail", { exercise })}
                    style={styles.cardContainer}
                >
                    <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />

                    <View style={styles.textContainer}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <Text style={styles.exerciseDetails}>
                            {exercise.sets} Sets • {exercise.reps} Reps • {exercise.weight} lbs
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
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
    cardContainer: {
        flexDirection: "row", 
        alignItems: "center",
        backgroundColor: "#1E1E1E",
        marginVertical: 8,
        borderRadius: 10,
        padding: 25,
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
});