import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useRouter } from "expo-router";

interface ExerciseCardProps {
  id: string;
  name: string;
  logged?: string;
  details?: string;
  image: ImageSourcePropType;
  isLogged: boolean;
  onDelete: (id: string) => void;
  swipeableRef: (ref: Swipeable | null) => void;
  index: number;
  onSwipeableOpen: (index: number) => void;
  onSwipeableWillOpen: (index: number) => void;
  colorScheme: "light" | "dark";
}

const ExerciseCard = ({
  id,
  name,
  logged,
  details,
  image,
  isLogged,
  onDelete,
  swipeableRef,
  index,
  onSwipeableOpen,
  onSwipeableWillOpen,
  colorScheme,
}: ExerciseCardProps) => {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragX: Animated.AnimatedInterpolation<number>
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
            onPress={() => onDelete(id)}
          >
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };
  const router = useRouter();
  const onPressEvent = () => {
    router.push("/log");
  };
  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      rightThreshold={40}
      overshootRight={false}
      containerStyle={styles.swipeableContainer}
      onSwipeableOpen={() => onSwipeableOpen(index)}
      onSwipeableWillOpen={() => onSwipeableWillOpen(index)}
    >
      <TouchableWithoutFeedback onPress={() => onPressEvent()}>
        <ThemedView
          style={[
            styles.exerciseCard,
            { backgroundColor: colorScheme === "dark" ? "#2A2A2A" : "#F2F2F7" },
          ]}
        >
          <Image source={image} style={styles.exerciseImage} />
          <View style={styles.exerciseContent}>
            <ThemedText style={styles.exerciseName}>{name}</ThemedText>
            {isLogged ? (
              <ThemedText style={styles.loggedText}>{logged}</ThemedText>
            ) : (
              <ThemedText style={styles.detailsText}>{details}</ThemedText>
            )}
          </View>
        </ThemedView>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  swipeableContainer: {
    marginVertical: 6,
    marginHorizontal: 20,
  },
  exerciseCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  deleteActionContainer: {
    width: 80,
    height: "100%",
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  deleteAction: {
    flex: 1,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  loggedText: {
    fontSize: 14,
    color: "#34C759",
  },
  detailsText: {
    fontSize: 14,
    opacity: 0.6,
  },
});

export default ExerciseCard;
