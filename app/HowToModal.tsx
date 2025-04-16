import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  useWindowDimensions,
  Image,
  Animated,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { EXERCISE_DETAILS, EXERCISE_DATA } from "@/app/Context";

const InstructionTab: React.FC<{ instructions: string[] }> = ({ instructions }) => (
  <ScrollView style={styles.tabContent}>
    {instructions.map((step, idx) => (
      <Text key={idx} style={styles.text}>
        {idx + 1}. {step}
      </Text>
    ))}
  </ScrollView>
);

const TargetTab: React.FC<{ primary: string[]; secondary: string[] }> = ({
  primary,
  secondary,
}) => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.text}>Primary: {primary.join(", ")}</Text>
    <Text style={styles.text}>Secondary: {secondary.join(", ")}</Text>
  </ScrollView>
);

const EquipmentTab: React.FC<{ equipment: string[] }> = ({ equipment }) => (
  <ScrollView style={styles.tabContent}>
    {equipment.map((item, idx) => (
      <Text key={idx} style={styles.text}>
        {item}
      </Text>
    ))}
  </ScrollView>
);

const HowToModalPage = () => {
  const { exerciseName } = useLocalSearchParams<{ exerciseName: string }>();
  const router = useRouter();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "instruction", title: "Instruction" },
    { key: "target", title: "Target" },
    { key: "equipment", title: "Equipment" },
  ]);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Retrieve exercise details using the exerciseName parameter
  const exerciseDetails = exerciseName ? EXERCISE_DETAILS[exerciseName] : undefined;
  const exerciseData = exerciseName ? EXERCISE_DATA[exerciseName] : undefined;

  if (!exerciseName || !exerciseDetails) {
    return (
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <Text style={styles.closeText}>✖</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Exercise not found</Text>
      </View>
    );
  }

  const renderScene = SceneMap({
    instruction: () => (
      <InstructionTab instructions={exerciseDetails.instruction} />
    ),
    target: () => (
      <TargetTab
        primary={exerciseDetails.target.primary}
        secondary={exerciseDetails.target.secondary}
      />
    ),
    equipment: () => (
      <EquipmentTab equipment={exerciseDetails.equipment} />
    ),
  });

  const handleClose = () => {
    // Fade out the view before navigating back
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300, // duration of fade-out in ms
      useNativeDriver: true,
    }).start(() => {
      router.back();
    });
  };


  return (
    <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Text style={styles.closeText}>✖</Text>
      </TouchableOpacity>

      {/* Exercise How-To Image */}
      <View style={styles.gifContainer}>
        {exerciseData ? (
          <Image
            source={exerciseData[2]} // Use the How-To image from EXERCISE_DATA
            style={{ width: "100%", height: 200 }}
          />
        ) : (
          <View style={{ width: "100%", height: 200, backgroundColor: "#000" }} />
        )}
      </View>

      {/* Exercise Title */}
      <Text style={styles.title}>{exerciseName}</Text>

      {/* Tab View */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
            activeColor="#fff"
            inactiveColor="#aaa"
          />
        )}
        style={styles.tabView}
      />
    </Animated.View>
  );
};

export default HowToModalPage;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#212529",
    paddingTop: Platform.OS === "ios" ? 95 : 40,
    paddingHorizontal: 10,
  },
  closeButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    right: 20,
    zIndex: 10,
    padding: 5,
  },
  closeText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 20,
    textAlign: "center",
  },
  tabView: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 5,
      },
      web: {
        marginTop: 0,
      },
    }),
  },
  tabBar: {
    backgroundColor: "#212529",
    elevation: 2,
    ...Platform.select({
      ios: {
        height: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        paddingBottom: 0,
      },
      web: {
        height: 48,
      },
    }),
  },
  gifContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#000", // Placeholder background
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  indicator: {
    backgroundColor: "orange",
    height: 3,
  },
  tabContent: {
    flex: 1,
    padding: 15,
    backgroundColor: "#212529",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    lineHeight: 22,
  },
});
