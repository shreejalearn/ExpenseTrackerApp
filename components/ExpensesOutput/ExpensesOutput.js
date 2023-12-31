import { View, Text } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';

function ExpensesOutput ({expenses, expensesPeriod}){ 
    return (
    <View>
        <ExpensesSummary expenses = {expenses} periodName={expensesPeriod}/>
        <ExpensesList expenses={expenses}/>
    </View>
    );
};

export default ExpensesOutput;
