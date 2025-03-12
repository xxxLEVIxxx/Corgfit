import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface MusclesProps {

  muscles?: string;
}

const MusclesTile: React.FC<MusclesProps> = ({ muscles }) => {
  return (
    <View style={styles.tile}>
      {/* Title to match the "Today's Workout" style in the screenshot */}
      <Text style={styles.tileTitle}>Today's Workout</Text>
      
      {/* Container for two side-by-side images (front/back muscle views) */}
      <View style={styles.imageContainer}>
        {/* Replace these with your actual muscle front/back images */}
        <Image
          source={require("@/assets/images/Target_Muscles_Images/chest_target.png")}
          style={styles.muscleImage}
        />
        <Image
          source={require("@/assets/images/Target_Muscles_Images/back_target.png")}
          style={styles.muscleImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    justifyContent: 'center',   // keeps content vertically centered
    alignItems: 'center',       // keeps content horizontally centered
  },
  tileTitle: {
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',        // centers text horizontally
  },  
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  muscleImage: {
    width: 50,
    height: 50,
    marginHorizontal: 4,
    resizeMode: 'contain',
  },
  muscleLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#ffffff',
  },
});

export default MusclesTile;
