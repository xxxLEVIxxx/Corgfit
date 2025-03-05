import React, { useState } from "react";
import { useRouter } from 'expo-router';

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
import { WebView } from "react-native-webview";

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

  const router = useRouter()

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeText}>✖</Text>
        </TouchableOpacity>

        {/* Embedded YouTube Video */}
        <View style={styles.videoContainer}>
          <WebView
            source={{
              uri: "https://www.youtube.com/embed/NMfBdEV03j8?autoplay=1&playsinline=1&mute=1",
            }}
            style={{ width: "100%", height: 315 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsInlineMediaPlayback={true} // Required for autoplay on iOS
            allowsFullscreenVideo={true}     // Allows fullscreen playback
          />
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
    overflow: "hidden",
    marginBottom: 15,
  },
  video: {
    width: "100%",
    height: "100%",
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
