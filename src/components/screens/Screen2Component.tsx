import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const Screen2Component = () => {
  return (
    <View>
      <Text style={styles.title}> 2nd screen </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'grey',
  },
});
export default Screen2Component;
