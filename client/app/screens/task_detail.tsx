import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { delete_task } from "../api/tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TaskDetail {
  id: string;
  title: string;
  description: string;
  priority: string;
}

const TaskDetailScreen = ({ navigation, route }) => {
  const task: TaskDetail = route.params.task;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.backButtonText}>&lt; Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={async() => {
        const token = await AsyncStorage.getItem('AccessToken')
        if (token) {
          const res = await delete_task(JSON.parse(token) , task.id)
          if (res && res.status === 200) {
            navigation.navigate("Tasks")
          }
        }
      }}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1C",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  deleteButton: {

    backgroundColor: "red",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TaskDetailScreen;
