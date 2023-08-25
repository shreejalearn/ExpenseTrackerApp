import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { fetchExpenses } from '../util/http';

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpenses();
            expensesCtx.setExpenses(expenses);
        }
    
        getExpenses();
    }, []);
    
    const today = new Date();
    const date7DaysAgo = new Date(today);
    date7DaysAgo.setDate(today.getDate() - 7);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        return expense.date >= date7DaysAgo && expense.date <= today;
    });

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {recentExpenses.length === 0 ? (
                    <Text style={styles.noExpensesText}>No recent expenses found.</Text>
                ) : (
                    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
                )}
            </View>
        </SafeAreaView>
    );
}


export default RecentExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF1E4',
        padding: 16,
    },
    noExpensesText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
});
