import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Notes from '../Components/Notes'

export const HomeScreen = ({ route, navigation }) => {

    const { params } = route
    const front = params.notes.length == 0 ? <Text>Add notes to see them displayed</Text> :
        params.notes.map((val, key) => {
            return <Notes key={key} keyval={key} val={val} deleteMethod={() => params.deleteNote(key)} />;
        });

    return (
        <View style={{ flex: 1}}>
            {front}
            <TouchableOpacity onPress={() => navigation.navigate('Notes')} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
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
