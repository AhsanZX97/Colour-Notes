import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen'
import NotesScreen from './Screens/NotesScreen'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import Reducers from './Reducers'
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';
import ForgotScreen from './Screens/ForgotScreen'
import Icon from 'react-native-vector-icons/Ionicons';
import { Alert } from "react-native";


const Stack = createStackNavigator();

export default class App extends React.Component {

  _handleBackPress(navigation) {
    Alert.alert(
      "Discard changes?",
      "Your note will be lost if you confirm.",
      [
        {
          text: "No, continue editing",
          onPress: () => console.log("No, continue editing")
        },
        {
          text: "Yes, discard changes",
          onPress: () => navigation.goBack(),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }

  render() {

    state = createStore(Reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={state}>

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
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerLeft: false
            }} />
            <Stack.Screen name="Notes" component={NotesScreen} options={{
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerLeft: () => {
                return <HeaderBackButton style= {{color: 'white'}} onPress = {({navigation}) => this._handleBackPress(navigation)} />
              }
            }} />
          </Stack.Navigator>

        </NavigationContainer>

      </Provider>
    );
  }
}