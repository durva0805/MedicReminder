// components/MedicationCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MedicationCard({ medication, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.medicationName}>{medication.name}</Text>
      <Text style={styles.medicationTime}>{medication.time}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  medicationTime: {
    fontSize: 16,
    color: '#888',
    marginVertical: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editText: {
    color: '#4CAF50',
  },
  deleteText: {
    color: '#f44336',
  },
});
