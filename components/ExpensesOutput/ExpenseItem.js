import React, { useState } from 'react';
import { Platform, Pressable, View, StyleSheet, Text } from 'react-native';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native'; 


function ExpenseItem({ id, description, amount, date }) {
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate('ManageExpenses', {expenseId: id});
    }

    const pressableStyle = [
        styles.pressable,
        isPressed && styles.pressablePressed,
        Platform.OS === 'ios' && styles.shadowIOS, // Apply shadow only on iOS
    ];

    return (
        <Pressable
            style={pressableStyle}
            onPress={expensePressHandler}
            onPressIn={() => setIsPressed(true)} // Set isPressed to true on press in
            onPressOut={() => setIsPressed(false)} // Set isPressed to false on press out
        >
            <View style={styles.expenseItem}>
                <View style={styles.leftContent}>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.date}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        elevation: 2,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 10,
    },
    pressablePressed: {
        backgroundColor: '#F0F0F0', // Change to the desired pressed state color
    },
    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    leftContent: {
        flex: 2,
        marginRight: 16,
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    rightContent: {
        flex: 1,
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E90FF',
    },
    shadowIOS: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default ExpenseItem;
