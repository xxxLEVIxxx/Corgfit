import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function PR() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontWeight: "bold" }]}>PRs</Text>
      <Text style={styles.text}>Lat Pulldown</Text>
      <Text style={styles.text}>4 reps - 70 lbs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
  },
});
