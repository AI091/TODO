import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { user_login } from '../api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function LoginPage({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (username === '' || password === '') {
      alert('Username or password cannot be empty!');
      return;
    }
    const res = await user_login(username, password);
    if (res && res.status === 200) {
      await AsyncStorage.setItem('AccessToken', JSON.stringify(res.data.token));

      navigation.navigate('Tasks')
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#b3b3b3"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#b3b3b3"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

        <Text style={styles.signup} onPress={()=>{
          navigation.navigate('Signup')
        }}>Signup </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 48,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 32,
  },
  input: {
    height: 40,
    borderColor: '#4d4d4d',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signup : {
    // color : '#fff',
    fontSize : 18,
    fontWeight : 'bold',
    color : '#FFA500', 
    marginTop : 16
  }
});