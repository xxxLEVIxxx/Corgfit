import { useExercises } from '@/app/Context';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ImageSourcePropType } from 'react-native';

// interface TargetMuscleProps {
//   targetMuscles: Array<{
//     name: string;
//     image: string;
//   }>;
// }

interface CategoryImages {
  [key: string]: string;
}

const TargetMuscle = () => {
  const { exercises, setExercises } = useExercises();
  const targetMuscles = [...new Set(exercises.map(e => e.category))];

  const categoryImages: { [key: string]: ImageSourcePropType } = {
    "Back": require("@/assets/images/Target_Muscles_Images/back_target.png"),
    "Biceps": require("@/assets/images/Target_Muscles_Images/bicep_target.png"),
    "Calves": require("@/assets/images/Target_Muscles_Images/calf_target.png"),
    "Chest": require("@/assets/images/Target_Muscles_Images/chest_target.png"),
    "Core": require("@/assets/images/Target_Muscles_Images/core_target.png"),
    "Glutes": require("@/assets/images/Target_Muscles_Images/glute_target.png"),
    "Hamstrings": require("@/assets/images/Target_Muscles_Images/hamstring_target.png"),
    "Shoulders": require("@/assets/images/Target_Muscles_Images/shoulder_target.png"),
    "Legs": require("@/assets/images/Target_Muscles_Images/leg_target.png"),
    "Triceps": require("@/assets/images/Target_Muscles_Images/tricep_target.png")
  }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Target Muscles</Text>
            <ScrollView style={styles.musclesContainer} horizontal={true} contentContainerStyle={styles.musclesContentContainer}>
                {targetMuscles.map((muscle) => (
                    <View style={styles.muscle} key={muscle}>
                    <Image source={categoryImages[muscle]} style={styles.muscleImage} />
                    <Text style={styles.muscleText}>{muscle}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
      title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginVertical: 10,
      },
      container: {
        backgroundColor: "#1E1E1E",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
      },
      musclesContainer: {
        marginTop: 10
      },
      musclesContentContainer: {
        flexDirection: "row",
        justifyContent: "center",
      },
      muscle: {
        alignItems: "center",
        marginHorizontal: 20,
      },
      muscleText: {
        color: "white",
        marginTop: 5,
      },
      muscleImage: {
          height: 50,
          width: 50,
      },
});

export default TargetMuscle;