import React from 'react';
import { Dimensions } from 'react-native'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import firebase from '../db'
import { Input, Button, Spinner } from '@ui-kitten/components';
import Logo from '../Components/Logo'


const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' />
    </View>
);


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
            }
        })
    }

    onButtonPress = () => {
        this.setState({
            loading: true,
            email: this.state.email.toLowerCase()
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

    changeHandle = (name, value) => {
        this.setState({
            [name]: value.replace(/\s/g, '')
        })
    }

    render() {

        var load = this.state.loading ? LoadingIndicator : null;

        return (
            <View style={styles.container}>

                <Logo />

                <Input placeholder="email" style={styles.input}
                    value={this.state.email}
                    onChangeText={email => this.changeHandle("email", email)} size="large" />

                <Input placeholder="password" style={styles.input}
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={password => this.changeHandle("password", password)} size="large" />

                <Input placeholder="confirm password" style={styles.input}
                    value={this.state.confirmPassword}
                    secureTextEntry={true}
                    onChangeText={confirmPassword => this.changeHandle("confirmPassword", confirmPassword)} size="large" />

                <Button appearance='outline' status='warning' style={styles.buttonContainer} onPress={this.onButtonPress} accessoryLeft={load}>
                    <Text style={{color:'#FF8000'}}>Sign Up</Text>
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
        backgroundColor:'#fcebf5',
        borderColor:'#FCB730',
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
})


export default SignUpScreen