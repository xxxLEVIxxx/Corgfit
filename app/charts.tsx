import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function charts() {
  const width = Dimensions.get("window").width - 100;
  // Sample data
  const weightData = {
    labels: [
      "Jan 1",
      "Jan 8",
      "Jan 15",
      "Jan 22",
      "Jan 29",
      "Feb 5",
      "Feb 12",
      "Feb 19",
      "Feb 26",
      "Mar 5",
      "Mar 12",
      "Mar 19",
      "Mar 26",
    ],
    datasets: [
      {
        data: [
          185.0, 183.2, 181.5, 179.8, 178.3, 177.6, 175.9, 175.2, 174.8, 173.5,
          172.1, 171.4, 170.6,
        ],
      },
    ],
  };

  const processLabels = (labels, interval = 3) => {
    return labels.map((label, index) => (index % interval === 0 ? label : ""));
  };
  const chartData = {
    ...weightData,
    labels: processLabels(weightData.labels),
  };

  const chartConfig = {
    backgroundColor: "#343A40",
    backgroundGradientFrom: "#343A40",
    backgroundGradientTo: "#343A40",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Progress</Text>
      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={width}
          height={180}
          chartConfig={chartConfig}
          bezier // Makes line curved
          style={styles.linechart}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.text}>Current Weight</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>170.6</Text>
            <Text style={styles.text}>lbs</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.text}>Goal</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>165</Text>
            <Text style={styles.text}>lbs</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    color: "white",
    marginTop: 36,
    alignSelf: "flex-start",
    fontSize: 24,
    fontWeight: "bold",
  },

  chartWrapper: {
    backgroundColor: "#343A40",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#343A40",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: 165,
    height: 143,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },
  value: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});
