import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { user_register } from '../api/user_api';

export default function SignupPage({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async() => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    const res = await user_register(username, password);
    if (res && res.status === 200) {
      navigation.navigate('Login')
    }
    else {
      alert("Username already exists")
    }
    
    
  };

  return (
    <View style={[styles.container, styles.darkBackground]}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholderTextColor="#fff"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholderTextColor="#fff"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholderTextColor="#fff"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.login} onPress={()=> {
        navigation.navigate("Login")}}
        >
          Login
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBackground: {
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFA500',
  },
  inputContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize : 18 , 
    flex: 1,
    fontWeight: 'bold',
    marginRight: 16,
    color: '#fff',
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: '#FFA500',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 8,
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  login : {
    fontSize : 18,
    fontWeight : 'bold',
    color : '#FFA500', 
    marginTop : 16
  }
});