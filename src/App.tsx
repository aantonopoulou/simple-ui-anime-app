/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import HomeScreen from './components/screens/HomeScreen';
import FavouritesScreen from './components/screens/FavouritesScreen';
import LoginScreen from './components/screens/LoginScreen';
import SignupScreen from './components/screens/SignupScreen';
import AnimeScreen from './components/screens/AnimeScreen';
import SelectedFavScreen from './components/screens/SelectedFavScreen';

//mport {StackNavigationConstants} from './navigation/navigationConstants';

// type Props = {
//   navigation: any;
//   route: any;
// };

const Stack = createNativeStackNavigator();

const App = () => {
  //console.log(StackNavigationConstants.SCREEN_2);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SelectedFav" component={SelectedFavScreen} />
      <Stack.Screen name="AnimeScreen" component={AnimeScreen} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default App;
