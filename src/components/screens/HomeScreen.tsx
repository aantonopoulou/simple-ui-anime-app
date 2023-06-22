import React, {FC} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export interface ScreenProps {
  navigation: any;
}

const HomeScreen = ({navigation}: ScreenProps) => {
  const handlePress1 = () => {
    navigation.navigate('AnimeScreen');
  };
  const handlePress2 = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to My Anime List !</Text>
        <Text style={styles.subtitle}>
          A place to keep track of all your favourite anime
        </Text>
        <View style={styles.button}>
          <Button title="Login" onPress={handlePress2} />
        </View>
        <View style={styles.button}>
          <Button title="Sign up" onPress={handlePress2} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    flex: 1,
    flexDirection: 'column',
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: 'black',
    //fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  button: {
    //paddingHorizontal: 130,
    //paddingBottom: 15,
    paddingTop: 15,
  },
});

export default HomeScreen;
