import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  TextInput,
  Dimensions,
} from "react-native";

interface WeightProps {
  weight_this_week: number;
  weight_last_week: number;
}

export default function WeightFlipCard({
  weight_this_week,
  weight_last_week,
}: WeightProps) {
  // State for current weight and weight this week
  const [currentWeight, setCurrentWeight] = useState("175.6");
  const [weightLossThisWeek, setWeightLossThisWeek] = useState(2.3);
  const [isFlipped, setIsFlipped] = useState(false);
  const difference = weight_this_week - weight_last_week;
  const differenceStr = difference > 0 ? `+${difference}` : `${difference}`;
  // Change text color: green if positive, red if negative.
  const diffColor = difference < 0 ? "#f44336" : "#4caf50";

  // Animation values
  const flipAnimation = useRef(new Animated.Value(0)).current;

  // Handle card flip
  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  // Increment weight value
  const incrementWeight = () => {
    const newWeight = (parseFloat(currentWeight) + 0.1).toFixed(1);
    setCurrentWeight(newWeight);
  };

  // Decrement weight value
  const decrementWeight = () => {
    const newWeight = (parseFloat(currentWeight) - 0.1).toFixed(1);
    setCurrentWeight(newWeight);
  };

  // Save new weight
  const saveWeight = () => {
    // Here you would save the weight to your storage or API
    // For this example, we'll just flip the card back
    flipCard();
  };

  // Calculate rotation for front and back
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  // Calculate opacity to prevent text from being visible when flipped
  const frontOpacity = flipAnimation.interpolate({
    inputRange: [0.5, 1],
    outputRange: [1, 0],
  });

  const backOpacity = flipAnimation.interpolate({
    inputRange: [0, 0.5],
    outputRange: [0, 1],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
    opacity: frontOpacity,
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
    opacity: backOpacity,
  };

  return (
    <View style={styles.container}>
      {/* Front Card (Weight Loss Display) */}
      <Animated.View
        style={[
          styles.card,
          styles.cardFront,
          frontAnimatedStyle,
          { backfaceVisibility: "hidden" },
        ]}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Current{"\n"}Weight</Text>
          <View style={styles.weightValueContainer}>
            <Text style={styles.weightValue}>{currentWeight}</Text>
            <Text style={styles.weightUnit}>lbs</Text>
          </View>
          <View style={styles.weightValueContainer}>
            <Text style={[styles.weightDifference, { color: diffColor }]}>
              {differenceStr} lbs this week
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.flipButton} onPress={flipCard}>
          <View style={styles.flipIndicator}>
            <Text style={styles.flipIcon}>↻</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Back Card (Weight Input) */}
      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          backAnimatedStyle,
          { position: "absolute", backfaceVisibility: "hidden" },
        ]}
      >
        <Text style={styles.inputTitle}>Log Today's Weight</Text>

        <View style={styles.inputContainer}>
          <View style={styles.weightInputWrapper}>
            <TextInput
              style={styles.weightInput}
              value={currentWeight}
              onChangeText={setCurrentWeight}
              keyboardType="numeric"
            />
            <Text style={styles.inputWeightUnit}>lbs</Text>
          </View>

          <View style={styles.weightControls}>
            <TouchableOpacity
              style={styles.weightButton}
              onPress={incrementWeight}
            >
              <Text style={styles.weightButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.weightButton}
              onPress={decrementWeight}
            >
              <Text style={styles.weightButtonText}>−</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={saveWeight}>
            <Text style={styles.saveButtonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.flipButton} onPress={flipCard}>
          <View style={styles.flipIndicator}>
            <Text style={styles.flipIcon}>↻</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  card: {
    width: 150,
    height: 143,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardFront: {
    backgroundColor: "#343A40",
  },
  cardBack: {
    backgroundColor: "#343A40",
  },
  cardContent: {
    flex: 1,
  },
  weekLabel: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  weightValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  weightValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "orange",
  },
  weightUnit: {
    fontSize: 24,
    color: "white",

    marginLeft: 5,
  },

  tapPrompt: {
    fontSize: 10,
    color: "#6B46C1",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  flipButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  flipIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  flipIcon: {
    color: "#6B46C1",
    fontSize: 14,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  weightInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E7",
    borderRadius: 8,
    backgroundColor: "#F9F9FB",
    paddingHorizontal: 8,
    height: 32,
  },
  weightInput: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
    fontWeight: "bold",
  },
  inputWeightUnit: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 0,
    fontWeight: "bold",
  },
  weightControls: {
    marginLeft: 15,
    gap: 5,
  },
  weightButton: {
    width: 20,
    height: 20,
    borderRadius: 16,
    backgroundColor: "#F0E6FD",
    borderWidth: 1,
    borderColor: "#D7C1F0",
    alignItems: "center",
    justifyContent: "center",
  },
  weightButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6B46C1",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    width: 60,
    height: 30,
    backgroundColor: "#6B46C1",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  weightDifference: {
    fontSize: 14,
  },
});
