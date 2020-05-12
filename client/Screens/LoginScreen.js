import React from 'react';
import { Dimensions, NativeModules } from 'react-native'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import firebase from '../db'
import { Input, Button, Spinner } from '@ui-kitten/components';

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' />
    </View>
);

const SharedStorage = NativeModules.SharedStorage;

class LoginScreen extends React.Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    loading: false
                })

                SharedStorage.set(
                    JSON.stringify({ user: firebase.auth().currentUser.email })
                );

                this.props.navigation.replace('StickyBlicky Notes');
            } else {
                this.setState({
                    loading: false
                })
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
                return (
                    <Button style={styles.buttonContainer} appearance='outline' accessoryLeft={LoadingIndicator}>
                        LOADING
                    </Button>
                )
            default:
                return (
                    <Button appearance='outline' status='primary' style={styles.buttonContainer} onPress={this.onButtonPress}>
                        Login
                    </Button>
                )
        }
    }

    changeHandle = (name, value) => {
        this.setState({
            [name]: value.replace(/\s/g, '')
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <Input placeholder="email" style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.changeHandle("email", email)}
                    size='large' />

                <Input placeholder="password" style={styles.input}
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={password => this.changeHandle("password", password)}
                    size='large' />

                {this.renderButton()}

                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>

                <View style={styles.signUpSection}>

                    <Button appearance='outline' status='info' onPress={() => this.props.navigation.navigate('Sign Up')}>
                        Create Account
                    </Button>

                    <Button appearance='outline' status='info' onPress={() => this.props.navigation.navigate('Forgot')}>
                        Forgot Password
                    </Button>

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
        justifyContent: 'center',
        backgroundColor: '#F2E6FF',
        borderColor: '#E1D6ED',
        borderWidth: 8,
    },

    signUpSection: {
        width: screenWidth - 80,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    
    text: {
        color: 'black',
        backgroundColor: 'transparent',
    },

    input: {
        height: 60,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#000000'
    },

    buttonContainer: {
        borderRadius: 20,
        width: screenWidth - 35,
        height: 60,
        marginTop: 10,
    },

    errorText: {
        fontSize: 15,
        color: 'red',
        alignSelf: 'center',
        marginTop: 15
    },
});

export default LoginScreen;