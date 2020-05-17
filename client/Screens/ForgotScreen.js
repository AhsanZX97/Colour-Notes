import React from 'react';
import { Dimensions } from 'react-native'
import { StyleSheet, Text, View, Platform, StatusBar, Animated, Keyboard } from 'react-native';
import firebase from '../db'
import { Input, Button } from '@ui-kitten/components';
import Logo from '../assets/Logo.png'
import KeyboardSpacer from 'react-native-keyboard-spacer';



class ForgotScreen extends React.Component {
    state = {
        email: '',
        error: '',
    }

    imageHeight = new Animated.Value(256);
    imageWidth = new Animated.Value(256);

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardDidShow = (event) => {
        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: 128,
        }).start()

        Animated.timing(this.imageWidth, {
            duration: event.duration,
            toValue: 128,
        }).start()
    };

    keyboardDidHide = (event) => {
        Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: 256,
        }).start()

        Animated.timing(this.imageWidth, {
            duration: event.duration,
            toValue: 256,
        }).start()
    };

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

                <Animated.Image source={Logo} style={[styles.logo, { height: this.imageHeight, width: this.imageWidth }]} />

                <Input placeholder="email" style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.changeHandle("email", email)} size="large" />

                <Button appearance='outline' status='warning' style={styles.buttonContainer} onPress={this.onButtonPress}>
                    <Text style={{ color: '#FF8000' }}>Send</Text>
                </Button>

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
        justifyContent: 'center',
        backgroundColor: '#F2E6FF',
        borderColor: '#E1D6ED',
        borderWidth: 8,
    },

    input: {
        height: 60,
        paddingLeft: 5,
        paddingRight: 5,
        color: '#000000',
        backgroundColor: '#fcebf5',
        borderColor: '#FCB730',
    },

    buttonContainer: {
        borderRadius: 10,
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

    logo: {
        marginBottom: 48
    }
})


export default ForgotScreen