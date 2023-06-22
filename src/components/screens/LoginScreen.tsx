import React, {useState} from 'react';
import usersData from '../../users.json';
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = usersData.users.find(
      userData =>
        userData.username === username && userData.password === password,
    );

    if (user) {
      navigation.navigate('AnimeScreen');
    } else {
      Alert.alert('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
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
        <Button title="Submit" onPress={handleLogin} />
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

export default LoginScreen;
