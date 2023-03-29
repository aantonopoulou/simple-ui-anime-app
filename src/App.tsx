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
//import ScreenTwo from './components/screens/ScreenTwo';
import AnimeListScreen from './components/screens/AnimeListScreen';

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
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AnimeList" component={AnimeListScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default App;
