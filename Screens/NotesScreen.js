import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';

export default class NotesScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            titleVal: "",
            note: ""
        }
    }

    componentWillMount() {
        if (this.props.route.params.note) {
            this.setState({
                titleVal: this.props.route.params.note.title,
                note: this.props.route.params.note.note
            })
        }
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

            </View>
        )
    }
}



/*export const NotesScreen = ({ route }) => {
    const [titleVal, settitleVal, note, setnote] = React.useState('');
    var button;

    if (route.params.note) {
        const { note } = route.params;
        titleVal = note.title;
        note = note.note;
        button = (
            <TouchableOpacity onPress={route.params.saveNote} style={styles.createButton}>
                <Text style={styles.createButtonText}>Save</Text>
            </TouchableOpacity>
        )
    }
    else {
        button = (
            <TouchableOpacity onPress={route.params.createNote} style={styles.createButton}>
                <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                style={{ height: 60 }}
                placeholder="ADD TITLE..."
                onChangeText={settitleVal}
                value={titleVal}
            />
            <TextInput underlineColorAndroid="transparent"
                placeholder="Add Description..."
                value={note}
                multiline={true} />
            {button}
        </View>
    );
}*/

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