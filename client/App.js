import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen'
import NotesScreen from './Screens/NotesScreen'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import Reducers from './Reducers'
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import ForgotScreen from './Screens/ForgotScreen'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';


const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {

    state = createStore(Reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={state}>

        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>

            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} options={{
                headerShown: false
              }} />
              <Stack.Screen name="Sign Up" component={SignUpScreen} options={{
                headerShown: false
              }} />
              <Stack.Screen name="Forgot" component={ForgotScreen} options={{
                headerShown: false
              }} />
              <Stack.Screen name="StickyBlicky Notes" component={HomeScreen} options={{
                headerShown: false
              }} />
              <Stack.Screen name="Notes" component={NotesScreen} options={{
                headerShown: false
              }} />
            </Stack.Navigator>

          </NavigationContainer>

        </ApplicationProvider>

      </Provider>

    );
  }
}