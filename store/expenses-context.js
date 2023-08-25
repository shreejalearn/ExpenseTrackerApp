import { Children, createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    setExpenses:(expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
})

function expensesReducer(state, action) {

    switch (action.type) {
        case "ADD_EXPENSE":
            return [...state, action.payload];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case "DELETE_EXPENSE":
            return state.filter((expense) => expense.id !== action.payload);
            case "UPDATE_EXPENSE":
                const expenseIndex = state.findIndex(
                    (expense) => expense.id === action.payload.id
                  );
            
                  // Create a copy of the updated expense
                  const updatedExpense = {
                    id: action.payload.id,
                    ...action.payload.expense,
                  };
            
                  // Update the state with the new expense
                  const updatedState = [...state];
                  updatedState[expenseIndex] = updatedExpense;
            
                  return updatedState;
                default:
                return state;
                }
}

function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expense){
        dispatch({type: "ADD_EXPENSE", payload: expense})
    }

    function deleteExpense(id){
        dispatch({type: "DELETE_EXPENSE", payload: id})
    }

    function updateExpense(id, expense){
        dispatch({type: "UPDATE_EXPENSE", payload: {id, expense}})
    }

    function setExpenses(expenses){
        dispatch({type: "SET", payload: expenses})
    }


    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return (
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider