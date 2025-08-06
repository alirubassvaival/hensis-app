import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { withExpoSnack } from 'nativewind';

// Import the proper screen components
import DashboardScreen from './src/screens/DashboardScreen';
import HAZIDScreen from './src/screens/HAZIDScreen';
import HAZOPScreen from './src/screens/HAZOPScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false, // Hide the default header since we have custom headers
        }}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen}
        />
        <Stack.Screen 
          name="HAZID" 
          component={HAZIDScreen}
        />
        <Stack.Screen 
          name="HAZOP" 
          component={HAZOPScreen}
        />
        <Stack.Screen 
          name="Projects" 
          component={ProjectsScreen}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default withExpoSnack(App);
