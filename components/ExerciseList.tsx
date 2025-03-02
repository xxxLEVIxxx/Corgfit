import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
    const handleAddExercise = () => {
        // TODO
    }

    return (
        <View style={styles.container}>
          {/* Header with Title & Add Button */}
          <View style={styles.header}>
            <Text style={styles.title}>Exercises</Text>
            <TouchableOpacity onPress={handleAddExercise}>
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
    
          {/* Exercise List */}
          {exercises.map((exercise, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => navigation.navigate("ExerciseDetail", { exercise })}
              style={styles.cardContainer}
            >
              {/* Left Column: Image */}
              <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
    
              {/* Middle Column: Text */}
              <View style={styles.textContainer}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>
                  {exercise.sets} Sets • {exercise.reps} Reps • {exercise.weight} lbs
                </Text>
              </View>
    
              {/* Right Column: Options (More Button) */}
              <TouchableOpacity style={styles.moreButton} onPress={() => console.log("More options for", exercise.name)}>
                <Icon name="ellipsis-h" size={20} color="white" />
              </TouchableOpacity>
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
  });