import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';

export const NotesScreen = ({ route, navigation }) => {
    const [titleVal, settitleVal, note, setnote] = React.useState('');

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
            <TouchableOpacity onPress = {route.params.createNote} style={styles.createButton}>
                <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
        </View>
    );
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