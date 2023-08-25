// ExpensesList.js
import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem({ item }) {
    return (
        <ExpenseItem {...item}/>
    )
}

function ExpensesList({ expenses }) {
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item, index) => item.id.toString()}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default ExpensesList;
