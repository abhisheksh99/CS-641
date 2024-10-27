import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

interface Entry {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
}

const IncomeExpenseScreen = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');
  const [entries, setEntries] = useState([]);

  const addEntry = () => {
    const newEntry: Entry = {
      id: Math.random().toString(),
      type,
      amount: parseFloat(amount),
      description,
    };
    setEntries((prevEntries) => [...prevEntries, newEntry]);
    setAmount('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Income / Expense</Text>
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Income" onPress={() => setType('income')} />
        <Button title="Expense" onPress={() => setType('expense')} />
      </View>
      <Button title="Add Entry" onPress={addEntry} />

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text>{item.description}</Text>
            <Text>{item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default IncomeExpenseScreen;
