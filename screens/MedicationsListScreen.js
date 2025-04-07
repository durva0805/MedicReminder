import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { ref, onValue, update, remove } from 'firebase/database';
import { db } from '../firebaseConfig';
import useAuth from '../hooks/useAuth';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MedicationsListScreen({ navigation }) {
  const { user } = useAuth();
  const [medications, setMedications] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentMedId, setCurrentMedId] = useState(null);
  const [currentMedName, setCurrentMedName] = useState('');
  const [currentMedTime, setCurrentMedTime] = useState('');

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

  const handleDelete = (medId) => {
    Alert.alert('Delete Medication', 'Are you sure you want to delete this medication?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          const medRef = ref(db, `users/${user.uid}/medications/${medId}`);
          await remove(medRef);
        },
      },
    ]);
  };

  const handleEdit = (medId, currentName, currentTime) => {
    setCurrentMedId(medId);
    setCurrentMedName(currentName);
    setCurrentMedTime(currentTime);
    setIsModalVisible(true); 
  };

  const handleUpdateMedication = async () => {
    if (!currentMedName || !currentMedTime) {
      Alert.alert('Please provide both name and time for the medication.');
      return;
    }

    const medRef = ref(db, `users/${user.uid}/medications/${currentMedId}`);
    await update(medRef, {
      name: currentMedName,
      time: currentMedTime,
    });

    setIsModalVisible(false); 
    setCurrentMedId(null); 
    setCurrentMedName('');
    setCurrentMedTime('');
  };

  const handleToggleTaken = async (medId, isTaken) => {
    const medRef = ref(db, `users/${user.uid}/medications/${medId}`);
    await update(medRef, {
      taken: !isTaken, 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Medications List</Text>
        <Text></Text>
      </View>
      
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text style={styles.medicationText}>{item.name} - {item.time}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleEdit(item.id, item.name, item.time)}
                style={styles.editButton}
              >
                <Icon name="create-outline" size={20} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={styles.deleteButton}
              >
                <Icon name="trash-outline" size={20} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleToggleTaken(item.id, item.taken)}
                style={styles.toggleButton}
              >
                <Text style={styles.toggleButtonText}>
                  {item.taken ? 'Marked as Taken' : 'Mark as Taken'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Medication</Text>

            <TextInput
              style={styles.input}
              placeholder="Medication Name"
              value={currentMedName}
              onChangeText={setCurrentMedName}
            />

            <TextInput
              style={styles.input}
              placeholder="Medication Time"
              value={currentMedTime}
              onChangeText={setCurrentMedTime}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleUpdateMedication}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop:50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  medicationItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  medicationText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  toggleButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
