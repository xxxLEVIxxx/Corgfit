import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

interface TargetMuscleProps {
  targetMuscles: Array<{
    name: string;
    image: string;
  }>;
}

const TargetMuscle = ({ targetMuscles }: TargetMuscleProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Target Muscles</Text>
            <View style={styles.musclesContainer}>
                {targetMuscles.map((muscle) => (
                    <View style={styles.muscle} key={muscle.name}>
                        <Image source={{uri: muscle.image}} style={styles.muscleImage}/>
                        <Text style={styles.muscleText}>{muscle.name}</Text>
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