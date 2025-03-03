import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { FontAwesome } from '@expo/vector-icons';
import CorgiImage from '@/assets/images/og-corgi-fit.svg';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();

  const dynamicStyles = {
    logoutButtonContainer: {
      borderTopWidth: colorScheme === 'dark' ? 0 : 1, 
      borderTopColor: Colors[colorScheme ?? 'light'].tabIconDefault,
    },
  };
  
  // Mock user data - in a real app, this would come from your auth/user context
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: new Date("2024-01-01"),
    height: "5'10\"",
    sex: "Male",
    location: "New York, NY",
    stats: {
      postsCount: 42,
      followersCount: 128,
      followingCount: 97,
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <ThemedView style={styles.header}>
        <ThemedView style={styles.profileImageContainer}>
          <CorgiImage 
            width={100} 
            height={100}
            style={styles.profileImage}
          />
        </ThemedView>
        <ThemedText style={styles.name}>{user.name}</ThemedText>
        <ThemedText style={styles.memberSince}>
          Member since {format(user.memberSince, 'MMMM yyyy')}
        </ThemedText>
      </ThemedView>

      {/* Main Menu */}
      <ThemedView style={styles.section}>
        {/* Main Menu Items */}
        <ThemedView>
          <TouchableOpacity style={styles.menuItem}>
            <ThemedView style={styles.menuItemContent}>
              <FontAwesome name="user" size={20} color="#007AFF" />
              <ThemedView style={styles.menuTextContainer}>
                <ThemedText style={styles.menuText}>Edit Profile</ThemedText>
                <ThemedText style={styles.menuSubtext}>Photo, name, height, sex, location, email</ThemedText>
              </ThemedView>
              <FontAwesome name="chevron-right" size={16} color="#C7C7CC" />
            </ThemedView>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <ThemedView style={styles.menuItemContent}>
              <FontAwesome name="lock" size={20} color="#007AFF" />
              <ThemedView style={styles.menuTextContainer}>
                <ThemedText style={styles.menuText}>Change Password</ThemedText>
              </ThemedView>
              <FontAwesome name="chevron-right" size={16} color="#C7C7CC" />
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>

        {/* Logout Button */}
        <ThemedView style={dynamicStyles.logoutButtonContainer}>
          <TouchableOpacity style={styles.logoutButton}>
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* Download Reports Section */}
      <ThemedView style={styles.section}>
        <ThemedView style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Download Your Information</ThemedText>
        </ThemedView>
        <TouchableOpacity style={styles.menuItem}>
          <ThemedView style={styles.menuItemContent}>
            <FontAwesome name="file-text" size={20} color="#007AFF" />
            <ThemedView style={styles.menuTextContainer}>
              <ThemedText style={styles.menuText}>Meals Report</ThemedText>
            </ThemedView>
            <FontAwesome name="download" size={16} color="#C7C7CC" />
          </ThemedView>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <ThemedView style={styles.menuItemContent}>
            <FontAwesome name="file-text" size={20} color="#007AFF" />
            <ThemedView style={styles.menuTextContainer}>
              <ThemedText style={styles.menuText}>Workout Report</ThemedText>
            </ThemedView>
            <FontAwesome name="download" size={16} color="#C7C7CC" />
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>

      {/* Help Section */}
      <ThemedView style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <ThemedView style={styles.menuItemContent}>
            <FontAwesome name="question-circle" size={20} color="#007AFF" />
            <ThemedView style={styles.menuTextContainer}>
              <ThemedText style={styles.menuText}>Contact Support</ThemedText>
              <ThemedText style={styles.menuSubtext}>help@corgfit.com</ThemedText>
            </ThemedView>
            <FontAwesome name="chevron-right" size={16} color="#C7C7CC" />
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>

      {/* Legal Section */}
      <ThemedView style={[styles.section, styles.legalSection]}>
        <TouchableOpacity style={styles.legalItem}>
          <ThemedText style={styles.legalText}>Terms and Conditions</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.legalItem}>
          <ThemedText style={styles.legalText}>Privacy Policy</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.versionText}>Version 1.0.0</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  profileImageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 12,
  },
  memberSince: {
    fontSize: 15,
    marginTop: 4,
  },
  section: {
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuSubtext: {
    fontSize: 14,
    marginTop: 2,
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionHeader: {
    padding: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  legalSection: {
    shadowOpacity: 0,
    elevation: 0,
  },
  legalItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  legalText: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
  versionText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
});
