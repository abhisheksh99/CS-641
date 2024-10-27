import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, Alert } from 'react-native';

const AddExpenseScreen = () => {
  const [category, setCategory] = useState(null);
  const [amount, setAmount] = useState('');

  const handleAddExpense = () => {
    if (!category || !amount) {
      Alert.alert("Error", "Please select a category and enter an amount.");
      return;
    }
    Alert.alert("Expense Added", `Category: ${category}, Amount: $${amount}`);
    setCategory(null);
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>

      {/* Category Picker */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value={null} />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Transportation" value="Transportation" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Utilities" value="Utilities" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Amount Input */}
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Add Expense Button */}
      <Button title="Add Expense" onPress={handleAddExpense} color="#6200EE" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
});

export default AddExpenseScreen;