import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function IconButton2({icon, size, color, onPress}){
    return(
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color} onPress={onPress}/>
            </View>
        </Pressable>
    )
}
export default IconButton2

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 6,
        borderRadius: 24, 
        marginHorizontal: 8,
        marginVertical: 2,
    },
    pressed:{
        opacity: 0.7,
    }
})