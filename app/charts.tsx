import { sub } from "date-fns";
import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function charts() {
  const width = Dimensions.get("window").width - 32;
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
          172.1, 171.4, 171.6,
        ],
      },
    ],
  };
  const timeOptions = [
    { label: "Week", value: "7d" },
    { label: "1 Month", value: "1m" },
    { label: "3 Months", value: "3m" },
    { label: "6 Months", value: "6m" },
    { label: "1Y", value: "1y" },
    { label: "3Y", value: "3y" },
  ];
  const [selectedRange, setSelectedRange] = useState("7d");
  const diff =
    weightData.datasets[0].data[weightData.datasets[0].data.length - 1] -
    weightData.datasets[0].data[weightData.datasets[0].data.length - 2];

  const goalDiff = Math.abs(
    165 - weightData.datasets[0].data[weightData.datasets[0].data.length - 1]
  );
  const processLabels = (labels, interval = 3) => {
    return labels.map((label, index) => (index % interval === 0 ? label : ""));
  };
  const chartData = {
    ...weightData,
    labels: processLabels(weightData.labels),
  };

  const chartConfig = {
    backgroundColor: "#212529",
    backgroundGradientFrom: "#212529",
    backgroundGradientTo: "#212529",
    decimalPlaces: 0,
    color: () => `#FFFFFF`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weight</Text>
      <Text style={styles.title}>
        {weightData.datasets[0].data[weightData.datasets[0].data.length - 1]}{" "}
        lbs
      </Text>

      <Text style={diff < 0 ? styles.loseWeight : styles.gainWeight}>
        {diff > 0
          ? `▲ ${diff.toPrecision(2)} lbs`
          : `▼ ${Math.abs(diff.toPrecision(2))} lbs`}
      </Text>

      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={width}
          height={180}
          chartConfig={chartConfig}
          bezier // Makes line curved
          style={styles.linechart}
          withInnerLines={false}
          withOuterLines={false}
          withDots={false}
          withShadow={false}
        />
      </View>
      <View style={styles.row}>
        {timeOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => setSelectedRange(option.value)}
            style={[
              styles.button,
              selectedRange === option.value && styles.activeButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedRange === option.value && styles.activeButtonText,
              ]}
            >
              {option.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.row, styles.cardRow]}>
        <View style={styles.card}>
          <Text style={styles.text}>Goal</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>165</Text>
            <Text style={styles.text}>lbs</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.text}>To Go</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{goalDiff.toPrecision(2)}</Text>
            <Text style={styles.text}>lbs</Text>
          </View>
        </View>
      </View>
      <Text
        style={[
          styles.text,
          { fontFamily: "RobotoSlab_400Regular", marginTop: 20 },
        ]}
      >
        You're doing great — consistency beats perfection!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    paddingHorizontal: 35,
    backgroundColor: "#212529",
    paddingTop: 80,
  },
  title: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "RobotoSlab_700Bold",
    marginTop: 20,
  },
  loseWeight: {
    color: "green",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "RobotoSlab_700Bold",
    alignSelf: "flex-start",
    marginTop: 20,
  },
  gainWeight: {
    color: "#FE3903",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "RobotoSlab_700Bold",
    alignSelf: "flex-start",
    marginTop: 10,
  },

  chartWrapper: {
    borderRadius: 16,
    paddingRight: 25,
    marginTop: 50,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  diffRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#343A40",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: 140,
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
  button: {
    paddingVertical: 10,
    width: 40,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  activeButton: {
    backgroundColor: "#CC749C",
  },
  cardRow: {
    gap: 30,
  },
});
