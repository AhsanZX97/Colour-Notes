import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { deleteNote } from '../Actions'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';


class Notes extends Component {

    render() {
        const { val } = this.props;
        var d = new Date(-val.time)
        return (
            <View key={this.props.keyval} style={{
                position: 'relative',
                padding: 20,
                backgroundColor: val.colorScheme.noteColor,
                borderBottomWidth: 2,
                borderBottomColor: val.colorScheme.borderColor,
            }}>
                <Text style={{
                    fontSize: 18,
                    color: val.colorScheme.color,
                }}>{val.title}
                    <Text style={{
                        fontSize: 9,
                        color: val.colorScheme.Color == "Black" ? 'white':'grey'
                    }}>
                        {d.toUTCString().substring(0, d.toUTCString().length - 7)}
                    </Text>
                </Text>

                <Text style={{
                    color: val.colorScheme.color,
                }}>{val.noteText.length > 40 ? val.noteText.replace(/\n/g, '').substring(0, 40) + '...' : val.noteText.replace(/\n/g, '')}</Text>
                <TouchableOpacity onPress={deleteNote(this.props.keyval)} style={styles.noteDelete}>
                    <Icon name="md-trash" style={styles.actionButtonIcon} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    noteDeleteText: {
        color: "white",
    },
    actionButtonIcon: {
        fontSize: 30,
        color: 'white',
    },
});

export default connect(null, { deleteNote })(Notes);