import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons"; // ✅ Use FontAwesome5 instead

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute", // Ensures transparency effect on iOS
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Icon name="chart-bar" size={24} color={Colors[colorScheme ?? "light"].tabIconDefault} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: "Workout",
          tabBarIcon: ({ color }) => (
            <Icon name="running" size={24} color={Colors[colorScheme ?? "light"].tabIconDefault} />
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "Me",
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={24} color={Colors[colorScheme ?? "light"].tabIconDefault} />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: "Log",
          tabBarIcon: ({ color }) => (
            <Icon name="clipboard-list" size={24} color={Colors[colorScheme ?? "light"].tabIconDefault} />
          ),
        }}
      />
    </Tabs>
  );
}
