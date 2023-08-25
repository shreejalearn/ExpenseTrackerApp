import { View, Text } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';

function ExpensesOutput({ total, expenses, expensesPeriod }) {
    return (
        <View>
            <Text>Total Expenses: {total}</Text>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            <ExpensesList expenses={expenses} />
        </View>
    );
}

export default ExpensesOutput;
