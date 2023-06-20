import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './app/screens/login';
import SignupPage from './app/screens/singup';
import TaskPage from './app/screens/tasks';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskDetailScreen from './app/screens/task_detail'; 
import AddTaskPage from './app/screens/add_task';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Signup" component={SignupPage}/>
        <Stack.Screen name="Tasks" component={TaskPage}/>
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen}/>
        <Stack.Screen name="AddTask" component={AddTaskPage}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text :{
    color: 'white',
  }

});
