import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View , FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get_tasks } from '../api/tasks';
import { useFocusEffect } from '@react-navigation/native';


interface Task {
    id: number;
    title: string;
    description: string;
    status: boolean;
    user_id: number;
    priority : any ;

  }

export default function TaskPage({navigation }){
    const [tasks , setTasks] = useState<Task[]>([])

    const getTasks = async () => {
        const token =await AsyncStorage.getItem('AccessToken')
        if( token === null) {
            return null 
        }
        const res = await get_tasks(JSON.parse(token)) 
        if (res && res.status === 200) {
            setTasks(res.data)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getTasks()
        }, [])
      );

        return (
          <View style={styles.container}>
            <Text style={styles.header}>Tasks</Text>
            <FlatList
              data={tasks}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate("TaskDetail" , {
                    task : item
                })}>
                    <Text style={styles.task}>{item.title}</Text>
                </TouchableOpacity>
            )}
              keyExtractor={(item) => item.id.toString()}
            />
        <View style = {styles.buttonContatiner}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddTask")}>
            <Text style={styles.buttonText}>Add Task</Text></TouchableOpacity>
        </View>
          </View>
        );
      };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1C1C1C',
      paddingHorizontal: 20,
    },
    header: {
      color: '#FFFFFF',
      fontSize: 24,
      marginBottom: 20,
    },
    task: {
      color: '#FFFFFF',
      fontSize: 18,
      marginVertical: 10,
    },
    addButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        marginBottom: 10,
    } , 
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    } , 
    buttonContatiner: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        alignItems: 'center',
    }
});



