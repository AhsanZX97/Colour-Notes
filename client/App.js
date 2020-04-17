import React from 'react';
import { StyleSheet, Text, View, Button, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen'
import NotesScreen from './Screens/NotesScreen'
// https://localhost:44376/api/notes
const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="StickyBlicky Notes" component={HomeScreen} options={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          />
          <Stack.Screen name="Notes" component={NotesScreen} options={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}/>
        </Stack.Navigator>

      </NavigationContainer>
    );
  }
}