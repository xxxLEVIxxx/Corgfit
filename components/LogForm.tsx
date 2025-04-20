// For a normal exercise, 6 sets will be the maximum limit for the user to log.
import { View, StyleSheet, Button, TextInput, ScrollView } from "react-native";
import Svg, { Polygon, Text as SvgText } from "react-native-svg";
import { useEffect, useState } from "react";
import { LogRow } from "./LogRow";
import React from "react";

interface LogFormProps {
  currentSet: number;
  onDelete: () => void;
  updateMaxSets: (sets: number) => void;
  scrollRef: React.RefObject<ScrollView>;
  onSetLogged: (reps: number, weight: number) => void;
}

export function LogForm({
  currentSet,
  onDelete,
  updateMaxSets,
  scrollRef,
  onSetLogged,
}: LogFormProps) {
  const [sets, setSets] = useState(3);
  const rows = [];
  // this26
  for (let i = 2; i <= sets; i++) {
    rows.push(
      <React.Fragment key={i}>
        <View style={styles.line}></View>
        <LogRow
          index={i}
          isFocused={i === currentSet}
          onSetData={onSetLogged}
        />
      </React.Fragment>
    );
  }
  // this is a function that adds a set to the log form
  const handleAddSet = () => {
    if (sets < 6) {
      setSets(sets + 1);
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  };

  // this is a function that deletes a set from the log form
  const handleDeleteSet = () => {
    if (sets > 2) {
      if (currentSet === sets) {
        onDelete();
      }
      setSets(sets - 1);
    }
  };

  // this is a function that updates the max sets for the log form
  useEffect(() => {
    updateMaxSets(sets);
  }, [sets]);

  return (
    <View>
      <View style={styles.row}></View>

      {/* this is the first row of the log form */}
      <LogRow
        index={1}
        isFocused={1 === currentSet}
        key={1}
        onSetData={onSetLogged}
      />

      {/* this is a loop that creates the rows for the log form */}
      {rows}

      {/* this is the last row of the log form */}
      <View style={styles.line}></View>
      <View style={styles.lastrow}>
        <Svg height={60} width={60}>
          <Polygon
            points="30,0 60,15 60,45 30,60 0,45 0,15"
            fill="orange"
          ></Polygon>
          <SvgText x="30" y="36" textAnchor="middle" fill="white" fontSize={24}>
            +
          </SvgText>
        </Svg>
        <Button
          onPress={handleAddSet}
          title="Add Set"
          style={styles.button}
          color={"orange"}
        />
        <Button
          onPress={handleDeleteSet}
          title="Delete Set"
          style={styles.button}
          color={"orange"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
    alignItems: "center",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
  line: {
    width: 3,
    height: 30,
    backgroundColor: "orange",
    left: 50,
  },
  centered: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 80,
    borderWidth: 1,
    color: "white",
    borderColor: "orange",
    backgroundColor: "#343A40",
    borderRadius: 5,
    fontWeight: "bold",
  },
  centered_gap: {
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  log_button: {
    position: "absolute",
    bottom: -50,
    height: 40,
    width: 180,
    textAlign: "center",
    backgroundColor: "green",
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#212529",
    height: 40,
  },
  lastrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
    alignItems: "center",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 100,
  },
});
