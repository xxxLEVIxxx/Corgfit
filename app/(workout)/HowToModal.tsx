import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

interface HowToModalProps {
  visible: boolean;
  onClose: () => void;
}

const InstructionTab = () => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.text}>1. Adjust the seat and pad to align with your thighs</Text>
    <Text style={styles.text}>2. Grip the bar with hands slightly wider than shoulder-width</Text>
    <Text style={styles.text}>3. Pull the bar down to chest level smoothly</Text>
    <Text style={styles.text}>4. Squeeze shoulder blades and hold for 1-2 seconds</Text>
  </ScrollView>
);

const TargetTab = () => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.text}>Primary: Latissimus Dorsi (Lats)</Text>
    <Text style={styles.text}>Secondary: Biceps, Rhomboids, Traps</Text>
  </ScrollView>
);

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

  const renderScene = SceneMap({
    instruction: InstructionTab,
    target: TargetTab,
    equipment: EquipmentTab,
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>✖</Text>
        </TouchableOpacity>

        <View style={styles.videoContainer}>
          {Platform.OS !== "web" ? (
            <Text style={styles.videoPlaceholder}>
              Watch the tutorial: https://www.youtube.com/watch?v=m90aWKOfu6k
            </Text>
          ) : (
            <Text style={styles.videoPlaceholder}>Video Not Supported on Web</Text>
          )}
        </View>

        <Text style={styles.title}>Lat Pulldown</Text>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get("window").width }}
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
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    paddingHorizontal: 10,
  },
  closeButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 30 : 20,
    right: 20,
    zIndex: 10,
    padding: 5,
  },
  closeText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  videoContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  videoPlaceholder: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
    textAlign: "center",
  },
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#333",
    elevation: 2,
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  indicator: {
    backgroundColor: "#fff",
    height: 3,
  },
  tabContent: {
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