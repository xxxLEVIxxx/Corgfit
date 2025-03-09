import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";

interface StreakProps {
  count: number;
  lastLoginDate: string;
}

export default function Streak({ count, lastLoginDate }: StreakProps) {
  const [streakCount, setStreakCount] = React.useState(count);

  const checkStreak = () => {
    if (!lastLoginDate) {
      setStreakCount(1);
      return;
    }
    // Convert both dates to user's LOCAL timezone
    const today = dayjs().startOf("day"); // Local midnight
    const lastLogin = dayjs(lastLoginDate).startOf("day"); // Convert last login date to local time
    const diffDays = today.diff(lastLogin, "day");
    console.log("today", today);
    console.log("lastLogin", lastLogin);
    console.log("diffDays", diffDays);

    if (diffDays === 1) {
      setStreakCount((streakCount) => streakCount + 1);
    } else if (diffDays > 1) {
      setStreakCount(1);
    }
  };
  React.useEffect(() => {
    checkStreak();
  }, [lastLoginDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.white}>Streak</Text>
      <Text style={styles.orange}>{streakCount}</Text>
      <Text style={styles.white}>days</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  white: {
    color: "white",
  },
  orange: {
    color: "orange",
    fontSize: 50,
    fontWeight: "bold",
  },
});
