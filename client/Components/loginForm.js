import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

class LoginForm extends React.Component {

    state = {
        email: '',
        password: '',
        error: ''
    }

    onBottomPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onLoginSuccess)
        .catch(err => {
            this.setState({
                error:err.message
            })
        })
    }

    onLoginSuccess = () => {
        this.setState({
            error: '',
            loading:false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder="email" style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })} />

                <TextInput placeholder="password" style={styles.input}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })} />

                <TouchableOpacity style={styles.buttonContainer} onPress={this.onBottomPress}>
                    <Text style={styles.buttonText}>Login</Text>

                </TouchableOpacity>
                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,.5)',
        paddingLeft: 10,
        marginBottom: 15,
        borderRadius: 5,
        fontSize: 15
    },
    errorText: {
        fontSize: 15,
        color: 'red',
        alignSelf: 'center',
        marginTop:15
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },

    buttonContainer: {
        backgroundColor: '#3B3B98',
        padding: 15,
        borderRadius: 8
    }
});

export default LoginForm;