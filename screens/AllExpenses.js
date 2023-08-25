import React, { useContext } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    // Calculate the total of all expenses
    const totalExpense = expensesCtx.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    return (
        <SafeAreaView style={styles.container}>
            <ExpensesOutput
                total={totalExpense}
                expenses={expensesCtx.expenses}
                expensesPeriod="Total"
            />
        </SafeAreaView>
    );
}

export default AllExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FAF1E4',
    },
    noExpensesText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
});
