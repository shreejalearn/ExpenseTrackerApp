import React, { useLayoutEffect, useContext } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert, TextInput } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import IconButton2 from '../components/UI/IconButton2';
import Button from '../components/UI/Button';
import { useNavigation } from '@react-navigation/native';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpenseById, deleteExpenseById } from '../util/http'; // Updated function names

function ManageExpenses({ route, navigation }) {
    const { expenses, setExpenses } = useContext(ExpensesContext); // Use expenses and setExpenses from context

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenses.find((expense) => expense.id === editedExpenseId); // Use expenses from context

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this expense?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: confirmDeleteHandler,
                },
            ]
        );
    }

    async function confirmDeleteHandler() {
        try {
            await deleteExpenseById(editedExpenseId); // Updated function name
            // Update the state by removing the deleted expense
            const updatedExpenses = expenses.filter((expense) => expense.id !== editedExpenseId);
            setExpenses(updatedExpenses);
            navigation.goBack();
        } catch (error) {
            // Handle error if the delete request fails
            console.error("Delete failed:", error);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        let amountIsValid = true;
        let dateIsValid = true;
        let descriptionIsValid = true;

        if (isEditing) {
            try {
                await updateExpenseById(editedExpenseId, expenseData);
                // Update the state with the updated expense data
                const updatedExpenses = expenses.map((expense) => {
                    if (expense.id === editedExpenseId) {
                        return { ...expense, ...expenseData };
                    } else {
                        return expense;
                    }
                });
                setExpenses(updatedExpenses);
                navigation.goBack();
            } catch (error) {
                // Handle error if the update request fails
                console.error("Update failed:", error);
            }
    
            // Validate the form ...

            if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
                Alert.alert('Invalid Input', 'Please enter a valid input', [
                    { text: 'Ok', style: 'destructive' },
                ]);
                return;
            }
        } else {
            const id = await storeExpense(expenseData);
            // Update the state by adding the newly created expense
            setExpenses([...expenses, { ...expenseData, id }]);
            navigation.goBack();
        }
    }
          
    return (
        <SafeAreaView style={styles.container}>
            <ExpenseForm submitButtonLabel={isEditing ? 'Update' : 'Add'} onCancel={cancelHandler} onSubmit={confirmHandler} defaultValues={selectedExpense}/>
            <View style={styles.header}>
                {isEditing && (
                    <View style={styles.borderLine} />
                )}
                {isEditing && (
                    <IconButton2
                        icon="trash"
                        color={GlobalStyles.colors.dark_green}
                        size={40}
                        onPress={deleteExpenseHandler}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FAF1E4',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 24,
    },
    borderLine: {
        width: '90%',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        paddingTop: 16,
    },
});
