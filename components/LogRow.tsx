import { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Svg, { Polygon, Text as SvgText } from "react-native-svg";
import React from "react";

interface LogRowProps {
  index: number;
  isFocused: boolean;
}

export function LogRow({ index, isFocused }: LogRowProps) {
  const [reps, setReps] = useState(4);
  const [weight, setWeight] = useState(40);

  // this is a function that handles the reps change
  const handleRepsChange = (text: string) => {
    const newReps = parseInt(text) || 0;
    setReps(newReps);
  };

  // this is a function that handles the weight change
  const handleWeightChange = (text: string) => {
    const newWeight = parseInt(text) || 0;
    setWeight(newWeight);
  };

  return (
    <View style={styles.row}>
      <Svg height={60} width={60}>
        <Polygon
          points="30,0 60,15 60,45 30,60 0,45 0,15"
          fill={isFocused ? "orange" : "#343A40"}
        ></Polygon>
        <SvgText x="30" y="35" textAnchor="middle" fill="white" fontSize={24}>
          {index}
        </SvgText>
      </Svg>
      <TextInput
        style={isFocused ? styles.focused_input : styles.unfocused_input}
        onBlur={(e) => handleRepsChange(e.nativeEvent.text)}
        defaultValue={reps.toString()}
      />
      <TextInput
        style={isFocused ? styles.focused_input : styles.unfocused_input}
        onBlur={(e) => handleWeightChange(e.nativeEvent.text)}
        defaultValue={weight.toString()}
      />

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
