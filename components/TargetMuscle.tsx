import { useExercises } from '@/app/Context';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  // need to add all target muscles
  const categoryImages: { [key: string]: string } = {
    "Back": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    "Chest": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    "Abs": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    "Leg": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Target Muscles</Text>
            <View style={styles.musclesContainer}>
                {targetMuscles.map((muscle) => (
                    <View style={styles.muscle} key={muscle}>
                        <Image source={{uri: categoryImages[muscle]}} style={styles.muscleImage}/>
                        <Text style={styles.muscleText}>{muscle}</Text>
                    </View>
                ))}
            </View>
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
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 10,
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