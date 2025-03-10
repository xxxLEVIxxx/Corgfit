import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface ChartProps {
  chartTitle?: string;
}

const ChartsTile: React.FC<ChartProps> = ({ chartTitle = "Charts" }) => {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileTitle}>{chartTitle}</Text>
      <Image
        source={require('@/assets/images/corgi-1.png')}
        style={styles.chartImage}
      />
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
    textAlign: 'center',
  },
  chartImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});

export default ChartsTile;
