import { sub } from "date-fns";
import React from "react";
import { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

// 1️⃣ Define your timeframes & data
type Timeframe = "7d" | "1m" | "3m" | "6m" | "1y";
interface ChartData {
  labels: string[];
  datasets: { data: number[] }[];
}

const weightChartData: Record<Timeframe, ChartData> = {
  "7d": {
    labels: [
      "Mar 20",
      "Mar 21",
      "Mar 22",
      "Mar 23",
      "Mar 24",
      "Mar 25",
      "Mar 26",
    ],
    datasets: [{ data: [172.2, 172.0, 171.8, 171.7, 171.5, 171.4, 171.6] }],
  },
  "1m": {
    labels: ["Feb 26", "Mar 5", "Mar 12", "Mar 19", "Mar 26"],
    datasets: [{ data: [174.8, 173.5, 172.1, 171.4, 171.6] }],
  },
  "3m": {
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
      [
        185.0, 183.2, 181.5, 179.8, 178.3, 177.6, 175.9, 175.2, 174.8, 173.5,
        172.1, 171.4, 171.6,
      ],
    ].map((data) => ({ data })),
  },
  "6m": {
    labels: ["Oct 1", "Nov 1", "Dec 1", "Jan 1", "Feb 1", "Mar 26"],
    datasets: [{ data: [192.0, 188.0, 185.0, 182.0, 178.0, 171.6] }],
  },
  "1y": {
    labels: ["May", "Jul", "Sep", "Nov", "Jan", "Mar"],
    datasets: [{ data: [185, 178, 174, 170, 168, 171.6] }],
  },
};

export default function charts() {
  const width = Dimensions.get("window").width - 32;
  const timeOptions: { label: string; value: Timeframe }[] = [
    { label: "7d", value: "7d" },
    { label: "1m", value: "1m" },
    { label: "3m", value: "3m" },
    { label: "6m", value: "6m" },
    { label: "1y", value: "1y" },
  ];

  const [selectedRange, setSelectedRange] = useState<Timeframe>("3m");

  // 2️⃣ Derive raw data for the current selection
  const raw = weightChartData[selectedRange];

  // 3️⃣ Compute label‐skip interval so we get ~6 ticks max
  const labelInterval = useMemo(() => {
    const maxTicks = 6;
    return Math.max(1, Math.ceil(raw.labels.length / maxTicks));
  }, [raw.labels.length]);

  // 4️⃣ Build the actual chart data, with blanks where we're skipping
  const chartData = useMemo(() => {
    return {
      labels: raw.labels.map((lbl, i) => (i % labelInterval === 0 ? lbl : "")),
      datasets: raw.datasets,
    };
  }, [raw, labelInterval]);

  // 5️⃣ Compute the diff & goal based on the raw series
  const series = raw.datasets[0].data;
  const diff = series[series.length - 1] - series[series.length - 2];
  const goal = 165;
  const goalDiff = Math.abs(goal - series[series.length - 1]);

  const chartConfig = {
    backgroundColor: "#212529",
    backgroundGradientFrom: "#212529",
    backgroundGradientTo: "#212529",
    decimalPlaces: 1,
    color: () => `#FFFFFF`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForLabels: { fontSize: "10" },
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weight</Text>
      <Text style={styles.title}>{series[series.length - 1]} lbs</Text>

      <Text style={diff < 0 ? styles.loseWeight : styles.gainWeight}>
        {diff > 0
          ? `▲ ${Math.abs(diff).toFixed(1)} lbs`
          : `▼ ${diff.toFixed(1)} lbs`}
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
    marginTop: 10,
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
