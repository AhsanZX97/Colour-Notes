import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, BackHandler, Platform, StatusBar, Dimensions } from 'react-native';
import Notes from '../Components/Notes'
import { getNotes } from '../Actions';
import { connect } from 'react-redux';
import _ from 'lodash'
import firebase from '../db'
import { Icon, Modal, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Card, Button, List, ListItem } from '@ui-kitten/components';

const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' />
);

const screenWidth = Math.round(Dimensions.get('window').width);

class HomeScreen extends React.Component {

    state = {
        menuVisible: false,
        sortVisible: false
    }

    componentDidMount() {
        this.props.getNotes('time');
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        });
    }

    logOut = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate('Login');
    }

    sort = (type) => {
        this.props.getNotes(type);
        this.setState({
            sortVisible: !this.state.sortVisible
        })
    }

    renderItem = ({ item }) => (
        <ListItem title={`${item.title}`} onPress={() => { this.sort(item.value) }}/>
    );


    render() {
        const { navigation } = this.props;

        const front = this.props.listOfNotes == 0 ? <Text>Add notes to see them displayed</Text> :
            this.props.listOfNotes.map((val, key) => {
                var d = new Date(val.time)
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
                    accessoryRight={() => {
                        return (
                            <React.Fragment>
                                <OverflowMenu
                                    anchor={() => {
                                        return <TopNavigationAction icon={MenuIcon} onPress={() => { this.setState({ menuVisible: !this.state.menuVisible }) }} />
                                    }}
                                    visible={this.state.menuVisible}
                                    onBackdropPress={() => { this.setState({ menuVisible: !this.state.menuVisible }) }}>
                                    <MenuItem title='Sort By' onPress={() => this.setState({ sortVisible: !this.state.sortVisible, menuVisible: !this.state.menuVisible })} />
                                </OverflowMenu>
                            </React.Fragment>
                        )
                    }}
                    style={{
                        backgroundColor: '#FFF2AB',
                        borderBottomColor: '#EDE6C2',
                        borderBottomWidth: 1,
                        color: 'black'
                    }}
                />
                <Modal
                    visible={this.state.sortVisible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => this.setState({ sortVisible: !this.state.sortVisible })}>
                    <Card disabled={true}>
                        <List
                            style={styles.modal}
                            data={[{ title: 'Sort By Date', value: "time" }, { title: 'Sort By Name', value: "title" }]}
                            renderItem={this.renderItem}
                        />
                        <Button onPress={() => this.setState({ sortVisible: !this.state.sortVisible })}>
                            DISMISS
                        </Button>
                    </Card>
                </Modal>
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
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: screenWidth - 100,
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