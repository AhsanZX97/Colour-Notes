import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import { postNote } from '../Actions';
import { connect } from 'react-redux';

class NotesScreen extends React.Component {

    state = {
        titleVal: "",
        note: ""
    }

    createNote = () => {
        this.props.postNote(this.state.titleVal,this.state.note);
        this.setState({
            titleVal: "",
            note: ""
        })
        this.props.navigation.navigate('StickyBlicky Notes');
    }

    render() {

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
                <TouchableOpacity onPress={this.createNote} style={styles.createButton}>
                    <Text style={styles.createButtonText}>Create</Text>
                </TouchableOpacity>
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

export default connect(null, { postNote })(NotesScreen);