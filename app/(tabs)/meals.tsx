import { View, Text, StyleSheet } from 'react-native';

export default function MealsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meals</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 