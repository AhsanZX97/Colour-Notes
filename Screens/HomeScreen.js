import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Notes from '../Components/Notes'


export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            notes: [{
                title: "test1",
                note: "noteTest"
            }, {
                title: "test2",
                note: "noteTest"
            },]
        }

        this.createNote = this.createNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }


    createNote(title, note) {

        let noteObj = {
            title: title,
            note: note
        };
        this.state.notes.push(noteObj);

        this.setState({ notes: this.state.notes });
    }

    saveNote(note) {

        console.log("outside for loops")
        var notes = this.state.notes;
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].title == note.title.props.value) {
                let noteObj = {
                    title: note.title.props.value,
                    note: note.noteText.props.value
                };
                notes[i] = noteObj;

                this.setState({ notes: notes })
                console.log(note.noteText.props.value)
            }
        }
    }

    deleteNote(key) {
        this.state.notes.splice(key, 1);
        this.setState({
            notes: this.state.notes
        })
    }

    componentWillReceiveProps() {
        try {
            if (this.props) {
                var ops = this.props.route.params.operation;
                if (ops == 'save') {
                    var note = this.props.route.params.note
                    this.saveNote(this.props.route.params.note)
                }
            }
        } catch (error) {
            console.log("Error")
        }

    }

    render() {

        const { navigation } = this.props;

        const front = this.state.notes.length == 0 ? <Text>Add notes to see them displayed</Text> :
            this.state.notes.map((val, key) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Notes', {
                        note: val
                    })}>
                        <Notes key={key} keyval={key} val={val} deleteMethod={() => this.deleteNote(key)} />
                    </TouchableOpacity>
                );
            });

        return (
            <View style={{ flex: 1 }}>
                {front}
                <TouchableOpacity onPress={() => navigation.navigate('Notes', {
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
