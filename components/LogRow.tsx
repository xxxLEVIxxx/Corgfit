import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Svg, { Polygon, Text as SvgText } from "react-native-svg";
import React from "react";

interface LogRowProps {
  index: number;
  isFocused: boolean;
  onSetData: (reps: number, weight: number) => void;
}

export function LogRow({ index, isFocused, onSetData }: LogRowProps) {
  const defaultRepsValue = "4";
  const defaultWeightValue = "40";

  const [reps, setReps] = useState<string>(defaultRepsValue);
  const [weight, setWeight] = useState<string>(defaultWeightValue);

  const [repsError, setRepsError] = useState<string>("");
  const [weightError, setWeightError] = useState<string>("");

  useEffect(() => {
    if (isFocused) {
      const repsValue = reps === "" ? parseInt(defaultRepsValue, 10) : parseInt(reps, 10);
      const weightValue = weight === "" ? parseInt(defaultWeightValue, 10) : parseInt(weight, 10);
      onSetData(repsValue, weightValue);
    }
  }, [isFocused, reps, weight, index]);

  useEffect(() => {
    if (index === 1) {
      const repsValue = reps === "" ? parseInt(defaultRepsValue, 10) : parseInt(reps, 10);
      const weightValue = weight === "" ? parseInt(defaultWeightValue, 10) : parseInt(weight, 10);
      onSetData(repsValue, weightValue);
    }
  }, []);

  const handleRepsChange = (text: string) => {
    setReps(text);
    if (text === "") {
      setRepsError("It cannot be empty!");
    } else {
      setRepsError("");
    }
  };

  const handleWeightChange = (text: string) => {
    setWeight(text);
    if (text === "") {
      setWeightError("It cannot be empty!");
    } else {
      setWeightError("");
    }
  };

  const handleRepsBlur = () => {
    if (reps === "") {
      setReps(defaultRepsValue);
      setRepsError("");
    }
  };

  const handleWeightBlur = () => {
    if (weight === "") {
      setWeight(defaultWeightValue);
      setWeightError("");
    }
  };

  return (
    <View style={styles.row}>
      <Svg height={60} width={60}>
        <Polygon
          points="30,0 60,15 60,45 30,60 0,45 0,15"
          fill={isFocused ? "orange" : "#343A40"}
        />
        <SvgText x="30" y="35" textAnchor="middle" fill="white" fontSize={24}>
          {index}
        </SvgText>
      </Svg>
      <View style={styles.inputWrapper}>
        <TextInput
          style={isFocused ? styles.focused_input : styles.unfocused_input}
          onChangeText={handleRepsChange}
          onBlur={handleRepsBlur}
          value={reps}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#666"
          selectTextOnFocus={true}
        />
        {repsError !== "" && (
          <Text style={styles.errorTooltip} numberOfLines={1}>
            {repsError}
          </Text>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={isFocused ? styles.focused_input : styles.unfocused_input}
          onChangeText={handleWeightChange}
          onBlur={handleWeightBlur}
          value={weight}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#666"
          selectTextOnFocus={true}
        />
        {weightError !== "" && (
          <Text style={styles.errorTooltip} numberOfLines={1}>
            {weightError}
          </Text>
        )}
      </View>

      {isFocused && (
        <>
          <Text style={styles.tooltip1}>Reps</Text>
          <Text style={styles.tooltip2}>Weight</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputWrapper: {
    position: "relative",
    alignItems: "center",
  },
  focused_input: {
    height: 45,
    width: 130,
    borderWidth: 1,
    color: "white",
    borderColor: "orange",
    backgroundColor: "#343A40",
    borderRadius: 5,
    fontWeight: "bold",
    padding: 10,
  },
  unfocused_input: {
    height: 40,
    width: 120,
    borderWidth: 1,
    color: "black",
    borderColor: "white",
    backgroundColor: "#343A40",
    borderRadius: 5,
    fontWeight: "bold",
    padding: 10,
  },
  errorTooltip: {
    position: "absolute",
    top: -18,
    left: -18,
    // Ensure there's enough width for one line of text:
    width: 180,
    color: "red",
    fontSize: 12,
    textAlign: "center",
  },
  tooltip1: {
    position: "absolute",
    color: "orange",
    top: 60,
    left: 100,
  },
  tooltip2: {
    position: "absolute",
    color: "orange",
    top: 60,
    left: 250,
  },
});
