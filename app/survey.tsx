import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const SurveyScreen = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  // Step control (1 = Basic Info, 2 = Workout Preferences)
  const [step, setStep] = useState(1);

  // Basic Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birth, setBirth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  // Gender Dropdown
  const [gender, setGender] = useState(null);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]);

  // Workout Experience Dropdown
  const [experience, setExperience] = useState(null);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [experienceItems, setExperienceItems] = useState([
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ]);

  // Workout Target (Goal) Dropdown
  const [workoutGoal, setWorkoutGoal] = useState(null);
  const [goalOpen, setGoalOpen] = useState(false);
  const [goalItems, setGoalItems] = useState([
    { label: "Build Muscle", value: "muscle" },
    { label: "Lose Weight", value: "weight_loss" },
    { label: "Improve Fitness", value: "fitness" },
  ]);

  // Weekly Activity Days
  const [activity, setActivity] = useState(null);
  const [activityOpen, setActivityOpen] = useState(false);
  const [activityItems, setActivityItems] = useState([
    { label: "0 days", value: 0 },
    { label: "1-2 days", value: 1 },
    { label: "3-4 days", value: 2 },
    { label: "5-6 days", value: 3 },
    { label: "7 days", value: 4 },
  ]);

  // Intensity
  const [intensity, setIntensity] = useState(null);
  const [intensityOpen, setIntensityOpen] = useState(false);
  const [intensityItems, setIntensityItems] = useState([
    { label: "Light", value: "light" },
    { label: "Moderate", value: "moderate" },
    { label: "Intense", value: "intense" },
  ]);

  // Sedentary hours
  const [sedentary, setSedentary] = useState(null);
  const [sedentaryOpen, setSedentaryOpen] = useState(false);
  const [sedentaryItems, setSedentaryItems] = useState([
    { label: "Less than 2 hours", value: 0 },
    { label: "2-4 hours", value: 1 },
    { label: "4-6 hours", value: 2 },
    { label: "6+ hours", value: 3 },
  ]);

  // Close dropdowns when typing or tapping outside
  const closeDropdowns = () => {
    setGenderOpen(false);
    setExperienceOpen(false);
    setGoalOpen(false);
    setActivityOpen(false);
    setIntensityOpen(false);
    setSedentaryOpen(false);
  };

  const handleNext = () => setStep(2);

  const handleSubmit = () => {
    const surveyData = {
      firstName,
      lastName,
      birth,
      height,
      weight,
      gender,
      workoutExperience: experience,
      workoutTarget: workoutGoal,
      weeklyActivityDays: activity,
      activityIntensity: intensity,
      dailySedentaryHours: sedentary,
    };

    console.log("Survey Data:", surveyData);
    router.replace("/(tabs)/dashboard");
  };

  const handleSubmit2 = async () => {
    const surveyData = {
      firstName,
      lastName,
      birth,
      height,
      weight,
      gender,
      workoutExperience: experience,
      workoutTarget: workoutGoal,
      weeklyActivityDays: activity,
      activityIntensity: intensity,
      dailySedentaryHours: sedentary,
    };
    console.log("Email:", email);
    console.log("Survey Data:", surveyData);
    // try {
    //   const res = await fetch("http://192.168.0.141:8095/signup/form/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: email, // make sure this is defined from signup
    //       survey: surveyData, // survey object
    //     }),
    //   });

    //   const data = await res.json();

    //   if (res.ok && data.success) {
    //     console.log("Survey Data Submitted:", data.message);
    //     router.replace("/(tabs)/dashboard");
    //   } else {
    //     console.warn("Survey submission failed:", data.message);
    //   }
    // } catch (error) {
    //   console.error("Error submitting survey data:", error);
    // }

    // Simulate a successful submission
    setTimeout(() => {
      console.log("Survey Data Submitted:", surveyData);
      router.replace("/(tabs)/dashboard");
    }, 500);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        closeDropdowns();
      }}
      accessible={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          User Survey {step === 1 ? "- Step 1" : "- Step 2"}
        </Text>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <View style={styles.content}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter your first name"
                placeholderTextColor="#999"
                onFocus={closeDropdowns}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter your last name"
                placeholderTextColor="#999"
                onFocus={closeDropdowns}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TextInput
                style={styles.input}
                value={birth}
                onChangeText={setBirth}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999"
                onFocus={closeDropdowns}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                placeholder="Enter your height"
                placeholderTextColor="#999"
                keyboardType="numeric"
                onFocus={closeDropdowns}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="Enter your weight"
                placeholderTextColor="#999"
                keyboardType="numeric"
                onFocus={closeDropdowns}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <DropDownPicker
                open={genderOpen}
                value={gender}
                items={genderItems}
                setOpen={setGenderOpen}
                setValue={setGender}
                setItems={setGenderItems}
                placeholder="Select your gender"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.placeholderStyle}
                dropDownContainerStyle={styles.dropdownOpenContainer}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2: Workout Preferences */}
        {step === 2 && (
          <View style={styles.content}>
            <View style={{ zIndex: 5000, marginBottom: 20 }}>
              <Text style={styles.label}>Workout Experience</Text>
              <DropDownPicker
                open={experienceOpen}
                value={experience}
                items={experienceItems}
                setOpen={setExperienceOpen}
                setValue={setExperience}
                setItems={setExperienceItems}
                placeholder="Select your experience level"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.placeholderStyle}
                dropDownContainerStyle={[
                  styles.dropdownOpenContainer,
                  { zIndex: 5000 },
                ]}
                onOpen={() => {
                  closeDropdowns();
                  setExperienceOpen(true);
                }}
              />
            </View>

            <View style={{ zIndex: 4000, marginBottom: 20 }}>
              <Text style={styles.label}>Workout Target</Text>
              <DropDownPicker
                open={goalOpen}
                value={workoutGoal}
                items={goalItems}
                setOpen={setGoalOpen}
                setValue={setWorkoutGoal}
                setItems={setGoalItems}
                placeholder="Select your target"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.placeholderStyle}
                dropDownContainerStyle={[
                  styles.dropdownOpenContainer,
                  { zIndex: 4000 },
                ]}
                onOpen={() => {
                  closeDropdowns();
                  setGoalOpen(true);
                }}
              />
            </View>

            <View style={{ zIndex: 3000, marginBottom: 20 }}>
              <Text style={styles.label}>Weekly Activity Days</Text>
              <DropDownPicker
                open={activityOpen}
                value={activity}
                items={activityItems}
                setOpen={setActivityOpen}
                setValue={setActivity}
                setItems={setActivityItems}
                placeholder="Select the frequency"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.placeholderStyle}
                dropDownContainerStyle={[
                  styles.dropdownOpenContainer,
                  { zIndex: 3000 },
                ]}
                onOpen={() => {
                  closeDropdowns();
                  setActivityOpen(true);
                }}
              />
            </View>

            <View style={{ zIndex: 2000, marginBottom: 20 }}>
              <Text style={styles.label}>Activity Intensity</Text>
              <DropDownPicker
                open={intensityOpen}
                value={intensity}
                items={intensityItems}
                setOpen={setIntensityOpen}
                setValue={setIntensity}
                setItems={setIntensityItems}
                placeholder="Select frequency"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.placeholderStyle}
                dropDownContainerStyle={[
                  styles.dropdownOpenContainer,
                  { zIndex: 2000 },
                ]}
                onOpen={() => {
                  closeDropdowns();
                  setIntensityOpen(true);
                }}
              />
            </View>

            <View style={{ zIndex: 1000, marginBottom: 20 }}>
              <Text style={styles.label}>Daily Sedentary Hours</Text>
              <DropDownPicker
                open={sedentaryOpen}
                value={sedentary}
                items={sedentaryItems}
                setOpen={setSedentaryOpen}
                setValue={setSedentary}
                setItems={setSedentaryItems}
                placeholder="Select sedentary hours"
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.placeholderStyle}
                dropDownContainerStyle={[
                  styles.dropdownOpenContainer,
                  { zIndex: 1000 },
                ]}
                onOpen={() => {
                  closeDropdowns();
                  setSedentaryOpen(true);
                }}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit2}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SurveyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#fff",
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
    color: "#fff",
  },
  input: {
    backgroundColor: "#1C1F24",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    padding: 12,
    color: "#fff",
  },
  dropdown: {
    backgroundColor: "#1C1F24",
    borderColor: "#333",
  },
  dropdownOpenContainer: {
    backgroundColor: "#1C1F24",
    borderColor: "#333",
  },
  dropdownText: {
    color: "#fff",
  },
  placeholderStyle: {
    color: "#999",
  },
  button: {
    position: "absolute",
    bottom: 50,
    width: "80%",
    backgroundColor: "#FF9800",
    paddingVertical: 15,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
