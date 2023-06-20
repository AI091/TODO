import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create_task} from '../api/tasks'

export default function AddTaskPage({navigation}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleAddTask = async () => {
        const token = await AsyncStorage.getItem('AccessToken')
        if (token === null) {
            return null
        }
        const res = await create_task(JSON.parse(token), title, description)
        if (res && res.status === 200) {
            navigation.navigate('Tasks')
        }
    }
    
    return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter task description"
            multiline
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex:1, 
        padding: 8,
        backgroundColor: "#1C1C1C"
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 16,
        color:"white"
      },
      descriptionInput: {
        minHeight: 100,
        color:"white"
      },
      addButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        alignSelf: 'flex-start',
      },
      addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
    });


