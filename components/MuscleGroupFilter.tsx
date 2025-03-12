import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface FilterButtonProps {
  title: string;
  selected: boolean;
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.filterButton, selected ? styles.selectedButton : null]}
      onPress={onPress}
    >
      <Text
        style={[styles.buttonText, selected ? styles.selectedButtonText : null]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface MuscleGroupFilterProps {
  onFiltersChange: (selectedGroups: string[]) => void;
}

const MuscleGroupFilter: React.FC<MuscleGroupFilterProps> = ({
  onFiltersChange,
}) => {
  const muscleGroups = [
    "Back",
    "Biceps",
    "Calves",
    "Chest",
    "Core",
    "Glutes",
    "Hamstrings",
    "Legs",
    "Shoulders",
    "Triceps",
  ];

  // State to track selected filters
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  // Toggle a muscle group selection
  const toggleMuscleGroup = (group: string) => {
    const updatedSelection = selectedGroups.includes(group)
      ? selectedGroups.filter((item) => item !== group) // Remove if already selected
      : [...selectedGroups, group]; // Add if not already selected

    setSelectedGroups(updatedSelection);
    onFiltersChange(updatedSelection);
  };

  // Clear all selections
  const clearAll = () => {
    setSelectedGroups([]);
    onFiltersChange([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Target Groups</Text>
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {muscleGroups.map((group) => (
          <FilterButton
            key={group}
            title={group}
            selected={selectedGroups.includes(group)}
            onPress={() => toggleMuscleGroup(group)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
  },
  clearText: {
    fontSize: 14,
    color: "#007AFF",
  },
  scrollContent: {
    paddingRight: 10,
  },
  filterButton: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedButton: {
    backgroundColor: "#333",
    borderColor: "#333",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
  },
  selectedButtonText: {
    color: "white",
  },
});

export default MuscleGroupFilter;
