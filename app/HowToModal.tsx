import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

interface HowToModalProps {
  visible: boolean;
  onClose: () => void;
}

// Instruction Tab Content
const InstructionTab = () => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.text}>1. Adjust the seat and pad to align with your thighs</Text>
    <Text style={styles.text}>2. Grip the bar with hands slightly wider than shoulder-width</Text>
    <Text style={styles.text}>3. Pull the bar down to chest level smoothly</Text>
    <Text style={styles.text}>4. Squeeze shoulder blades and hold for 1-2 seconds</Text>
  </ScrollView>
);

// Target Tab Content
const TargetTab = () => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.text}>Primary: Latissimus Dorsi (Lats)</Text>
    <Text style={styles.text}>Secondary: Biceps, Rhomboids, Traps</Text>
  </ScrollView>
);

// Equipment Tab Content
const EquipmentTab = () => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.text}>Lat Pulldown Machine</Text>
    <Text style={styles.text}>Adjustable Weights</Text>
  </ScrollView>
);

const HowToModal: React.FC<HowToModalProps> = ({ visible, onClose }) => {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: "instruction", title: "Instruction" },
    { key: "target", title: "Target" },
    { key: "equipment", title: "Equipment" },
  ]);

  const router = useRouter();

  // ✅ Corrected `renderScene` function
  const renderScene = ({ route }) => {
    console.log("Rendering Tab:", route.key); // Debugging
    switch (route.key) {
      case "instruction":
        return <InstructionTab />;
      case "target":
        return <TargetTab />;
      case "equipment":
        return <EquipmentTab />;
      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeText}>✖</Text>
        </TouchableOpacity>

        {/* Embedded Video Placeholder (Change if using WebView) */}
        <View style={styles.videoContainer}>
          <Image
            source={require("@/assets/images/How-To-Images/Back_HT_Pull_Ups.png")}
            style={{ width: "100%", height: 200 }}
          />
        </View>

        {/* Exercise Title */}
        <Text style={styles.title}>Lat Pulldown</Text>

        {/* Tab View */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene} // ✅ Fixed rendering
          onIndexChange={setIndex}
          initialLayout={{
            width: Dimensions.get("window").width,
            height: Platform.OS === "ios" ? Dimensions.get("window").height : 0,
          }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={styles.tabBar}
              labelStyle={styles.tabLabel}
              indicatorStyle={styles.indicator}
              activeColor="#fff"
              inactiveColor="#aaa"
            />
          )}
          style={styles.tabView}
        />
      </View>
    </Modal>
  );
};

export default HowToModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
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
  videoContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#000", // Placeholder background
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
    backgroundColor: "#333",
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
  tabLabel: {
    fontSize: 16,
    fontWeight: "600",
    ...Platform.select({
      ios: {
        padding: 8,
        margin: 0,
      },
      web: {
        margin: 8,
      },
    }),
  },
  indicator: {
    backgroundColor: "orange",
    height: 3,
  },
  tabContent: {
    flex: 1, // Ensures proper spacing
    padding: 15,
    backgroundColor: "#1a1a1a",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    lineHeight: 22,
  },
});
