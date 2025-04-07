import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ref, push, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';
import useAuth from '../hooks/useAuth';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const { user, loading } = useAuth();
  const [medName, setMedName] = useState('');
  const [medTime, setMedTime] = useState('');
  const [medications, setMedications] = useState([]);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  useEffect(() => {
    if (!user) return;

    const userRef = ref(db, `users/${user.uid}/medications`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const medsArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setMedications(medsArray);
      } else {
        setMedications([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddMedication = async () => {
    if (!user || !medName || !medTime) return;

    const userRef = ref(db, `users/${user.uid}/medications`);
    await push(userRef, {
      name: medName,
      time: medTime,
      taken: false,
    });
    setMedName('');
    setMedTime('');
    navigation.navigate('MedicationsList');
  };

  if (loading) return <Text>Loading...</Text>;

  if (!user) return <Text>Please log in to view and add medications.</Text>;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MedicationsList')}>
          <Icon name="list" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>MedicReminder</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="person-circle" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Medication Name"
        value={medName}
        onChangeText={setMedName}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => setTimePickerVisible(true)} style={styles.timePickerButton}>
        <Text style={styles.timePickerButtonText}>
          {medTime || 'Select Time'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleAddMedication}>
        <Text style={styles.buttonText}>Add Medication</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={(time) => {
          setMedTime(time.toLocaleTimeString());
          setTimePickerVisible(false);
        }}
        onCancel={() => setTimePickerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop:50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
  },
  timePickerButton: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  timePickerButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  actionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
