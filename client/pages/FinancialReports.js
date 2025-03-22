import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FinancialReports() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 Financial Reports</Text>

      <TouchableOpacity style={styles.button} onPress={() => console.log('View Report')}>
        <Text style={styles.buttonText}>View Cash Flow Report</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
