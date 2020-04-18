import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { postNote, editNote } from '../Actions';
import { connect } from 'react-redux';

class NotesScreen extends React.Component {

    state = {
        titleVal: "",
        note: "",
        key: undefined
    }

    createNote = () => {
        this.props.postNote(this.state.titleVal, this.state.note);
        this.setState({
            titleVal: "",
            note: ""
        })
        this.props.navigation.navigate('StickyBlicky Notes');
    }

    editNote = () => {
        this.props.editNote(this.state.titleVal, this.state.note, this.state.key);
        this.setState({
            titleVal: "",
            note: "",
            key: undefined
        })
        this.props.navigation.navigate('StickyBlicky Notes');
    }

    componentWillMount() {
        if (this.props.route.params != undefined) {
            var note = this.props.route.params.note;
            this.setState({
                titleVal: note.title,
                note: note.noteText,
                key: note.key
            })
        }
    }

    render() {

        var button;
        if (this.state.key != undefined) {
            button = (<TouchableOpacity onPress={this.editNote} style={styles.createButton}>
                <Text style={styles.createButtonText}>Save</Text>
            </TouchableOpacity>)
        }
        else {
            button = (<TouchableOpacity onPress={this.createNote} style={styles.createButton}>
                <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>)
        }

        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    style={{ height: 60 }}
                    placeholder="ADD TITLE..."
                    ref={(el) => { this.titleVal = el; }}
                    onChangeText={(titleVal) => this.setState({ titleVal })}
                    value={this.state.titleVal}
                />
                <TextInput underlineColorAndroid="transparent"
                    placeholder="Add Description..."
                    ref={(el) => { this.note = el; }}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note}
                    multiline={true} />
                {button}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    createButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        backgroundColor: '#f4511e',
        width: 70,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 14,
    },
})

export default connect(null, { postNote, editNote })(NotesScreen);