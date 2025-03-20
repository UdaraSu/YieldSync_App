import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function ExpenseScreen() {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [category, setCategory] = useState('Seeds');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>➕ Add New Expense</Text>
            
            <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
                <Ionicons name="calendar" size={20} color="#2E7D32" />
                <Text style={styles.dateText}>{date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />
            )}
            
            <View style={styles.pickerContainer}>
                <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
                    <Picker.Item label="🌱 Seeds" value="Seeds" />
                    <Picker.Item label="🛠️ Labor" value="Labor" />
                    <Picker.Item label="⚙️ Equipment" value="Equipment" />
                </Picker>
            </View>

            <TextInput style={styles.input} keyboardType="numeric" placeholder="💲 Amount" value={amount} onChangeText={setAmount} />
            <TextInput style={styles.input} multiline placeholder="📋 Description" value={description} onChangeText={setDescription} />
            
            <TouchableOpacity style={styles.saveButton} onPress={() => console.log({ date, category, amount, description })}>
                <Text style={styles.saveButtonText}>Save Expense</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.viewExpensesButton}>
                <Text style={styles.viewExpensesText}>View Recent Expenses</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1B5E20',
        marginBottom: 20,
    },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C8E6C9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    dateText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#1B5E20',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 10,
    },
    picker: {
        backgroundColor: '#C8E6C9',
    },
    input: {
        borderWidth: 1,
        borderColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    saveButton: {
        backgroundColor: '#2E7D32',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewExpensesButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    viewExpensesText: {
        color: '#1B5E20',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
