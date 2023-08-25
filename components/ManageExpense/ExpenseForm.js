import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import Input from './Input';
import { GlobalStyles } from '../../constants/styles';
import Button from '../UI/Button';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: { value: defaultValues ? defaultValues.amount.toString() : '', isValid: true },
    date: { value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '', isValid: true },
    description: { value: defaultValues ? defaultValues.description : '', isValid: true },
  });

  // Track invalid inputs for highlighting
  const [invalidInputs, setInvalidInputs] = useState([]);

  useEffect(() => {
    // Remove invalid inputs from the list when they become valid
    const updatedInvalidInputs = invalidInputs.filter((inputName) => !inputs[inputName].isValid);
    setInvalidInputs(updatedInvalidInputs);
  }, [inputs]);

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Show an error message and prevent submission
      Alert.alert('Invalid Input', 'Please enter a valid input', [
        { text: 'Ok', style: 'destructive' },
      ]);

      // Add invalid input fields to the list for highlighting
      const newInvalidInputs = [];
      if (!amountIsValid) newInvalidInputs.push('amount');
      if (!dateIsValid) newInvalidInputs.push('date');
      if (!descriptionIsValid) newInvalidInputs.push('description');
      setInvalidInputs(newInvalidInputs);
      return;
    }

    // Call onSubmit if the form is valid
    onSubmit(expenseData);
  }

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });

    // Remove the input from the list of invalid inputs when it's corrected
    if (invalidInputs.includes(inputIdentifier)) {
      setInvalidInputs((prevInvalidInputs) =>
        prevInvalidInputs.filter((input) => input !== inputIdentifier)
      );
    }
  }

  // Function to dismiss the keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Your Expense</Text>

          <Input
            label="Amount"
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangedHandler.bind(this, 'amount'),
              value: inputs.amount.value,
              style: [styles.input, invalidInputs.includes('amount') ? styles.invalidInput : null],
            }}
          />
          <Input
            label="Date"
            textInputConfig={{
              placeholder: 'YYYY-MM-DD',
              maxLength: 10,
              onChangeText: inputChangedHandler.bind(this, 'date'),
              value: inputs.date.value,
              placeholderTextColor: '#ccc',
              style: [styles.input, invalidInputs.includes('date') ? styles.invalidInput : null],
            }}
          />
          <Input
            label="Description"
            textInputConfig={{
              keyboardType: 'default',
              multiline: true,
              autoCorrect: true,
              onChangeText: inputChangedHandler.bind(this, 'description'),
              value: inputs.description.value,
              style: [styles.input, invalidInputs.includes('description') ? styles.invalidInput : null],
            }}
          />
          <View style={styles.buttonContainer}>
            <Button mode="flat" onPress={onCancel}>
              Cancel
            </Button>
            <Button onPress={submitHandler}>
              {submitButtonLabel}
            </Button>
          </View>

          {formIsInvalid && <Text style={styles.errorText}>Invalid Inputs...please check your entered data!</Text>}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: GlobalStyles.colors.dark_green,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    height: 40,
  },
  invalidInput: {
    borderColor: 'red',
  },
  buttonContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ExpenseForm;
