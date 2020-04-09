import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';

export const NotesScreen = ({ navigation }) => {
    const [titleVal, settitleVal] = React.useState('');

    return (
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={settitleVal}
                value={titleVal}
            />
        </View>
    );
}