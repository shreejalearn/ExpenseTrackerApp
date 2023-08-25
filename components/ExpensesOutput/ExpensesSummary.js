import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ExpensesSummary({ expenses, periodName }) {
    const expenseSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.periodName}>{periodName}:</Text>
            <Text style={styles.expenseSum}>${expenseSum.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        marginTop: 30,
        borderRadius: 10,
        padding: 12, // Smaller padding
        marginHorizontal: 16, // Added margin from container to screen
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    periodName: {
        fontSize: 16, // Slightly smaller font size
        fontWeight: 'bold',
        marginBottom: 8,
        color: GlobalStyles.colors.olive, // Use your preferred color
    },
    expenseSum: {
        fontSize: 20, // Slightly smaller font size
        fontWeight: 'bold',
        color: GlobalStyles.colors.salmon_pink, // Use your preferred color
    },
});

export default ExpensesSummary;
