import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Notes from '../Components/Notes'

export default class HomeScreen extends React.Component {

    state = {
        notes: []
    }

    render() {

        const { navigation } = this.props;

        const front = this.state.notes.length == 0 ? <Text>Add notes to see them displayed</Text> :
            this.state.notes.map((val, key) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Notes', {
                        note: val
                    })}>
                        <Notes key={key} keyval={key} val={val} />
                    </TouchableOpacity>
                );
            });

        return (
            <View style={{ flex: 1 }}>
                {front}
                <TouchableOpacity onPress={() => navigation.navigate('Notes')} style={styles.addButton}>
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
