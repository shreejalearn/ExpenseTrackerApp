import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({ children, onPress, mode, style }) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "85%", // Adjust the width to your preference
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.semi_light_green, // Change to your preferred background color
    shadowColor: "#000",
    alignSelf: "center", // Center the button horizontally
    marginTop: 30, // Add more marginTop as needed
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressable: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    
  },
  buttonText: {
    color: "#fff", // Change to your preferred text color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
