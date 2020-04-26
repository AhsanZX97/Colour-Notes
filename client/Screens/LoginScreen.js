import React from 'react';
import { Dimensions } from 'react-native'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, StatusBar, ActivityIndicator } from 'react-native';
import firebase from '../db'

class LoginScreen extends React.Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('StickyBlicky Notes');
            } else {
                console.log("not logged in")
            }
        })
    }

    onButtonPress = () => {
        this.setState({
            loading: true,
            email: this.state.email.toLowerCase()
        })

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(success => {
                this.setState({
                    email: '',
                    password: '',
                    error: '',
                    loading: false
                })
            })
            .catch(err => {
                this.setState({
                    error: err.message,
                    loading: false
                })
            })
    }

    renderButton = () => {
        switch (this.state.loading) {
            case true:
                return (<ActivityIndicator size="large" />)
            default:
                return (
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                )
        }
    }

    changeHandle = (name,value) => {
        this.setState({
            [name]: value.replace(/\s/g, '')
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <TextInput placeholder="email" style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.changeHandle( "email", email )} />

                <TextInput placeholder="password" style={styles.input}
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={password => this.changeHandle("password", password )} />

                {this.renderButton()}

                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>

                <View style={styles.signUpSection}>
                    <TouchableOpacity style={styles.signUpSection} onPress={() => this.props.navigation.navigate('Sign Up')}>
                        <Text style={styles.signUpText}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signUpSection} onPress={() => this.props.navigation.navigate('Forgot')}>
                        <Text style={styles.text}>Forget Password</Text>
                    </TouchableOpacity>
                </View>

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

    signUpSection: {
        width: screenWidth - 80,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    text: {
        color: 'black',
        backgroundColor: 'transparent',
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
});

export default LoginScreen;