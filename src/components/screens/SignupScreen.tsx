import React, {useState, useEffect} from 'react';
import usersData from '../../users.json';
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  email: string;
  username: string;
  password: string;
}

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsers, setNewUsers] = useState<User[]>([]);

  useEffect(() => {
    console.log('All new signUp creds:', newUsers);
  }, [newUsers]);

  const handleSignup = async () => {
    // Create a new user object with the provided email, username, and password
    const newUser = {
      email,
      username,
      password,
    };

    // Save the new user object to AsyncStorage
    try {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setNewUsers(prevUsers => [...prevUsers, newUser]);

      console.log('New user registered successfully:', newUser);
      console.log('All new signUp creds:', newUsers);

      navigation.navigate('AnimeScreen', {userId: username});
    } catch (error) {
      console.log('Error saving user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.button}>
        <Button title="Submit" onPress={handleSignup} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  textInput: {
    fontSize: 14,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'grey',
    padding: 10,
  },
  button: {
    paddingTop: 30,
    paddingHorizontal: 145,
    borderRadius: 18,
  },
});

export default SignupScreen;
