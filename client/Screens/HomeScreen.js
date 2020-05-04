import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, BackHandler, Platform, StatusBar } from 'react-native';
import Notes from '../Components/Notes'
import { getNotes } from '../Actions';
import { connect } from 'react-redux';
import _ from 'lodash'
import firebase from '../db'
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';


class HomeScreen extends React.Component {

    componentDidMount() {
        this.props.getNotes();
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        });
    }

    logOut = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate('Login');
    }

    render() {
        const { navigation } = this.props;

        const front = this.props.listOfNotes == 0 ? <Text>Add notes to see them displayed</Text> :
            this.props.listOfNotes.map((val, key) => {
                var d = new Date(val.time)
                console.log(d.toString("MM"))
                return (
                    <TouchableOpacity onPress={() => navigation.navigate('Notes', {
                        note: val
                    })}>
                        <Notes key={key} keyval={val.key} val={val} />
                    </TouchableOpacity>
                );
            });

        return (
            <View style={{ flex: 1, paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0 }}>
                <StatusBar translucent backgroundColor="#EEE2A0" />
                <TopNavigation
                    alignment='center'
                    title='Sticky Blicky Notes'
                    style={{
                        backgroundColor: '#FFF2AB',
                        borderBottomColor: '#EDE6C2',
                        borderBottomWidth: 1,
                        color: 'black'
                    }}
                />
                <ScrollView style={styles.scrollContainer}>
                    {front}
                </ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate('Notes')} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.logOut} style={styles.signOut}>
                    <Text style={styles.signOutText}>sign out</Text>
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
    signOut: {
        position: 'absolute',
        zIndex: 11,
        right: 90,
        bottom: 20,
        backgroundColor: '#f4511e',
        width: 70,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    signOutText: {
        color: '#fff',
        fontSize: 14,
    },
})

function mapStateToProps(state) {

    const listOfNotes = _.map(state.notesList.notesList, (val, key) => {
        return {
            ...val,
            key: key
        }
    })
    return {
        listOfNotes,
        loadingReducer: state.loadingReducer.loadingReducer
    }
}

export default connect(mapStateToProps, { getNotes })(HomeScreen);