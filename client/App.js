import React from 'react';
import { StyleSheet, Text, View, Button, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen'
import NotesScreen from './Screens/NotesScreen'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import Reducers from './Reducers'

const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {

    state = createStore(Reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={state}>

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
            }} />
          </Stack.Navigator>

        </NavigationContainer>

      </Provider>
    );
  }
}