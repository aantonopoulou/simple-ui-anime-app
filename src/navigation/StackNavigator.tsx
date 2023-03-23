import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Screen2 from '../Screen2';
import {StackNavigationConstants} from './navigationConstants';

const Stack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerShown: false,
};

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={StackNavigationConstants.SPLASH_SCREEN}
        //@ts-ignore
        screenOptions={defaultScreenOptions}>
        <Stack.Screen
          name={StackNavigationConstants.SCREEN_2}
          component={Screen2}
        />
        {/* 
        <Stack.Screen
          name={StackNavigationConstants.RECORDING_SCREEN}
          component={RecordingScreen}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name={StackNavigationConstants.SIDE_NAV_SCREEN}
          component={SettingsScreen}
          options={{animation: 'slide_from_left'}}
        />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
