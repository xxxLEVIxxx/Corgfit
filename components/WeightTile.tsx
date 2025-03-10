import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WeightProps {
  weight_this_week: number;
  weight_last_week: number;
}

const WeightTile: React.FC<WeightProps> = ({ weight_this_week, weight_last_week }) => {
  const difference = weight_this_week - weight_last_week;
  const differenceStr = difference > 0 ? `+${difference}` : `${difference}`;
  // Change text color: green if positive, red if negative.
  const diffColor = difference < 0 ? '#f44336' : '#4caf50';

  return (
    <View style={styles.tile}>
      <Text style={styles.tileTitle}>Weight</Text>
      <Text style={styles.weightValue}>{weight_this_week} lbs</Text>
      <Text style={[styles.weightDifference, { color: diffColor }]}>
        {differenceStr} lbs this week
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 8,
  },
  weightValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  weightDifference: {
    fontSize: 14,
  },
});

export default WeightTile;
