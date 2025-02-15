import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { FontAwesome } from '@expo/vector-icons';
import CorgiImage from '../../assets/images/og-corgi-fit.svg';

export default function ProfileScreen() {
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
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <CorgiImage 
            width={100} 
            height={100}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.memberSince}>
          Member since {format(user.memberSince, 'MMMM yyyy')}
        </Text>
      </View>

      {/* Main Menu */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <FontAwesome name="user" size={20} color="#007AFF" />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Edit Profile</Text>
              <Text style={styles.menuSubtext}>Photo, name, height, sex, location, email</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#C7C7CC" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <FontAwesome name="lock" size={20} color="#007AFF" />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Change Password</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#C7C7CC" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logoutButton]}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Download Reports Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Download Your Information</Text>
        </View>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <FontAwesome name="file-text" size={20} color="#007AFF" />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Meals Report</Text>
            </View>
            <FontAwesome name="download" size={16} color="#C7C7CC" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <FontAwesome name="file-text" size={20} color="#007AFF" />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Workout Report</Text>
            </View>
            <FontAwesome name="download" size={16} color="#C7C7CC" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Help Section */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <FontAwesome name="question-circle" size={20} color="#007AFF" />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Contact Support</Text>
              <Text style={styles.menuSubtext}>help@corgfit.com</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#C7C7CC" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Legal Section */}
      <View style={[styles.section, styles.legalSection]}>
        <TouchableOpacity style={styles.legalItem}>
          <Text style={styles.legalText}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.legalItem}>
          <Text style={styles.legalText}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
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
    color: '#000',
  },
  memberSince: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
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
    color: '#000',
    fontWeight: '500',
  },
  menuSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
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
    color: '#666',
  },
  legalSection: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  legalItem: {
    backgroundColor: '#fff',
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
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
});
