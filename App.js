import React from 'react';
import { StyleSheet, Text, View, Button, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './Screens/HomeScreen'
import { NotesScreen } from './Screens/NotesScreen'

const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [{
        title: "test",
        note: "noteTest"
      },{
        title: "test",
        note: "noteTest"
      },]
    };

    this.createNote = this.createNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  createNote(title, note) {

    let notes = {
      title: title,
      note: note
    };
    this.state.notes.push(this.state.notes);

    this.setState({ notes: this.state.notes });

    alert(title);
  }

  deleteNote(key) {
    this.state.notes.splice(key, 1);
    this.setState({
      notes: this.state.notes
    })
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
            initialParams={{
              notes: this.state.notes,
              deleteNote: this.deleteNote
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
          }}
            initialParams={{
              createNote: this.createNote
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}