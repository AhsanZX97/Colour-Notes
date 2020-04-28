import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { postNote, editNote } from '../Actions';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    MenuProvider,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';

const { SlideInMenu } = renderers;

const colourScheme = [
    Purple = {
        name: "Purple",
        titleColor: "#e7cfff",
        borderColor: "#723226",
        noteColor: "#f2e6ff",
        placeholderTextColor: "#696969"
    }
]

class NotesScreen extends React.Component {

    state = {
        titleVal: "",
        note: "",
        key: undefined,
        titleColor: "#e7cfff",
        borderColor: "#723226",
        noteColor: "#f2e6ff",
        placeholderTextColor: "#696969"
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

    selectColour = (colour) => {
        alert(colour)
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
            <MenuProvider >
                <View style={{ flex: 1 }}>
                    <TextInput
                        style={{
                            height: 60,
                            backgroundColor: this.state.titleColor,
                            borderBottomColor: this.state.borderColor,
                            borderBottomWidth: 1,
                        }}
                        placeholder="ADD TITLE..."
                        placeholderTextColor= {this.state.placeholderTextColor}
                        ref={(el) => { this.titleVal = el; }}
                        onChangeText={(titleVal) => this.setState({ titleVal })}
                        value={this.state.titleVal}
                    />
                    <TextInput underlineColorAndroid="transparent"
                        style={{
                            backgroundColor: this.state.noteColor,
                            textAlignVertical: "top"
                        }}
                        placeholder="Add Notes..."
                        placeholderTextColor={this.state.placeholderTextColor}
                        ref={(el) => { this.note = el; }}
                        onChangeText={(note) => this.setState({ note })}
                        value={this.state.note}
                        multiline={true}
                        numberOfLines={42} />
                    <ActionButton buttonColor="#f4511e">
                        <ActionButton.Item buttonColor='#1abc9c' title="Change Colour" onPress={() => { }}>
                            <Menu renderer={SlideInMenu} onSelect={value => this.selectColour(value)}>
                                <MenuTrigger>
                                    <Icon name="md-brush" style={styles.actionButtonIcon} />
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption value={'Purple'} text='Purple' />
                                    <MenuOption value={'Red'} text='Red' />
                                    <MenuOption value={'Blue'} text='Blue' />
                                    <MenuOption value={'Green'} text='Green' />
                                    <MenuOption value={'Black'} text='Black' />
                                </MenuOptions>
                            </Menu>
                        </ActionButton.Item>
                        {button}
                    </ActionButton>
                </View>
            </MenuProvider>
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

})

export default connect(null, { postNote, editNote })(NotesScreen);