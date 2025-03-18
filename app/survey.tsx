import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from "expo-router";

const SurveyScreen = () => {

  const router = useRouter();
  // Basic user info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birth, setBirth] = useState('');

  // Physical info
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  // Dropdown for workout goal
  const [open, setOpen] = useState(false);
  const [workoutGoal, setWorkoutGoal] = useState(0);
  const [items, setItems] = useState([
    { label: 'Build Muscle', value: 0 },
    { label: 'Lose Weight', value: 1 },
    { label: 'Improve Fitness', value: 2 },
  ]);

  // Handle form submission
  const handleSubmit = () => {
    const surveyData = {
      firstName,
      lastName,
      birth,
      height,
      weight,
      workoutGoal,
    };
    
    // API call
    router.replace('/(tabs)/dashboard')
  };

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss(); if(open) setOpen(false);}} accessible={false}>
    <View style={styles.container}>
      <Text style={styles.title}>User Survey</Text>

      <View style={styles.content}>
        {/* First Name */}
        

        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            placeholderTextColor="#999"
          />
        </View>
        

        {/* Last Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Date of Birth */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={birth}
            onChangeText={setBirth}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
          />
        </View>

        {/* Height */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder="Enter your height"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* Weight */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder="Enter your weight"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* Workout Goal (Dropdown) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Workout Goal</Text>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={open}
              value={workoutGoal}
              items={items}
              setOpen={setOpen}
              setValue={setWorkoutGoal}
              setItems={setItems}
              placeholder="Select your goal"
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              placeholderStyle={styles.placeholderStyle}
              dropDownContainerStyle={styles.dropdownOpenContainer}
            />
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default SurveyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Dark background
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  input: {
    backgroundColor: '#1C1F24',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 12,
    color: '#fff',
  },
  dropdownWrapper: {
    marginBottom: 20,
  },
  dropdown: {
    backgroundColor: '#1C1F24',
    borderColor: '#333',
  },
  dropdownOpenContainer: {
    backgroundColor: '#1C1F24',
    borderColor: '#333',
  },
  dropdownText: {
    color: '#fff',
  },
  placeholderStyle: {
    color: '#999',
  },
  button: {
    backgroundColor: "#FF9800",
    paddingVertical: 15,
    marginHorizontal: 100,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  }
});
