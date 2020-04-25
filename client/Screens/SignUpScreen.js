import React from 'react';
import { Dimensions } from 'react-native'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, StatusBar, ActivityIndicator } from 'react-native';
import firebase from '../db'

class SignUpScreen extends React.Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
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
            email: this.state.email.trim(),
            password: this.state.password.trim(),
            confirmPassword: this.state.confirmPassword.trim()
        })

        if (this.state.password != this.state.confirmPassword) {
            this.setState({
                loading: false,
                error: 'Passwords do not match'
            })
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(success => {
                    this.setState({
                        email: '',
                        password: '',
                        confirmPassword: '',
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

    }

    changeHandle = (name,value) => {
        this.setState({
            [name]: value.replace(/\s/g, '')
        })
    }

    renderButton = () => {
        switch (this.state.loading) {
            case true:
                return (<ActivityIndicator size="large" />)
            default:
                return (
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
                        <Text style={styles.buttonText}>SignUp</Text>
                    </TouchableOpacity>
                )
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <TextInput placeholder="email" style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.changeHandle("email",email)} />

                <TextInput placeholder="password" style={styles.input}
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={password => this.changeHandle("password",password)} />

                <TextInput placeholder="confirm password" style={styles.input}
                    value={this.state.confirmPassword}
                    secureTextEntry={true}
                    onChangeText={confirmPassword => this.changeHandle("confirmPassword",confirmPassword)} />

                {this.renderButton()}

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


export default SignUpScreen