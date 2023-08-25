import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ label, textInputConfig }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...textInputConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333', // You can choose your desired text color
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc', // You can choose your desired border color
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333', // You can choose your desired text color
  },
});

export default Input;
