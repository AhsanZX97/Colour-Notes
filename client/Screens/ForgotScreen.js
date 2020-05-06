import React from 'react';
import { Dimensions } from 'react-native'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, StatusBar, ActivityIndicator } from 'react-native';
import firebase from '../db'

class ForgotScreen extends React.Component {
    state = {
        email: '',
        error: '',
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('StickyBlicky Notes');
            } else {

            }
        })
    }

    onButtonPress = () => {

        this.setState({
            email: this.state.email.toLowerCase()
        })

        firebase.auth().sendPasswordResetEmail(this.state.email)
        .then(success => {
            this.setState({
                email: '',
                error: 'Email send to reset password'
            })
        })
        .catch(err => {
            this.setState({
                error: err.message,
            })
        })

    }

    changeHandle = (name, value) => {
        this.setState({
            [name]: value.replace(/\s/g, '')
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <TextInput placeholder="email" style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.changeHandle("email", email)} />

                <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>

                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>

            </View>
        )

    }
}

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        backgroundColor: '#ffe97d',
        width: screenWidth - 40,
        height: 60,
        marginHorizontal: 20,
        paddingLeft: 45,
        marginTop: 20,
        borderRadius: 20,
        color: '#000000',
    },

    buttonContainer: {
        backgroundColor: '#3B3B98',
        padding: 15,
        borderRadius: 20,
        width: screenWidth - 40,
        height: 60,
        marginTop: 20,
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },

    errorText: {
        fontSize: 15,
        color: 'red',
        alignSelf: 'center',
        marginTop: 15
    },
})


export default ForgotScreen