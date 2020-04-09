import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';

export const NotesScreen = ({ navigation }) => {
    const [titleVal, settitleVal, note, setnote] = React.useState('');

    return (
        <View>
            <TextInput
                style={{ height: 60}}
                placeholder="ADD TITLE..."
                onChangeText={settitleVal}
                value={titleVal}
            />
            <TextInput underlineColorAndroid="transparent"
                placeholder="Add Description..."
                value = {note}
                multiline={true} />
        </View>
    );
}