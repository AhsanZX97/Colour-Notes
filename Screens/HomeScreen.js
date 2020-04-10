import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Notes from '../Components/Notes'


export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            notes: [{
                title: "test",
                note: "noteTest"
            }, {
                title: "test",
                note: "noteTest"
            },]
        }

        this.createNote = this.createNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        console.log(this.props)
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
        const front = this.state.notes.length == 0 ? <Text>Add notes to see them displayed</Text> :
            this.state.notes.map((val, key) => {
                return <Notes key={key} keyval={key} val={val} deleteMethod={() => this.deleteNote(key)} />;
            });
        
        const { navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                {front}
                <TouchableOpacity onPress={() => navigation.navigate('Notes',{
                    createNote: this.createNote
                })} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        backgroundColor: '#f4511e',
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
})
