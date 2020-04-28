import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { postNote, editNote } from '../Actions';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


class NotesScreen extends React.Component {

    state = {
        titleVal: "",
        note: "",
        key: undefined
    }

    createNote = () => {

        this.setState({
            titleVal: this.state.titleVal.trim()
        })

        if (this.state.titleVal === "") {
            alert("Title cannot be empty")
        }
        else {
            this.props.postNote(this.state.titleVal, this.state.note);
            this.setState({
                titleVal: "",
                note: ""
            })
            this.props.navigation.replace('StickyBlicky Notes');
        }
    }

    editNote = () => {
        this.setState({
            titleVal: this.state.titleVal.trim()
        })

        if (this.state.titleVal === "") {
            alert("Title cannot be empty")
        }
        else {
            this.props.editNote(this.state.titleVal, this.state.note, this.state.key);
            this.setState({
                titleVal: "",
                note: "",
                key: undefined
            })
            this.props.navigation.replace('StickyBlicky Notes');
        }
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
            button = (
                <ActionButton.Item buttonColor='#9b59b6' title="Save Note" onPress={this.editNote}>
                    <Icon name="md-save" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            )
        }
        else {
            button = (
                <ActionButton.Item buttonColor='#9b59b6' title="Create Note" onPress={this.createNote}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    style={styles.title}
                    placeholder="ADD TITLE..."
                    placeholderTextColor="#696969"
                    ref={(el) => { this.titleVal = el; }}
                    onChangeText={(titleVal) => this.setState({ titleVal })}
                    value={this.state.titleVal}
                />
                <TextInput underlineColorAndroid="transparent"
                    style={styles.note}
                    placeholder="Add Notes..."
                    placeholderTextColor="#696969"
                    ref={(el) => { this.note = el; }}
                    onChangeText={(note) => this.setState({ note })}
                    value={this.state.note}
                    multiline={true}
                    numberOfLines={42} />
                <ActionButton buttonColor="#f4511e">
                    <ActionButton.Item buttonColor='#1abc9c' title="Change Colour" onPress={() => { }}>
                        <Icon name="md-brush" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    {button}

                </ActionButton>
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
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    title: {
        height: 60,
        backgroundColor: '#e7cfff',
        borderBottomColor: '#723226',
        borderBottomWidth: 1,
    },
    note: {
        backgroundColor: '#f2e6ff',
        textAlignVertical: "top"
    }
})

export default connect(null, { postNote, editNote })(NotesScreen);