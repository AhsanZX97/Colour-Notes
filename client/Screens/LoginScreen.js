import React from 'react';
import { Dimensions, NativeModules } from 'react-native'
import { StyleSheet, Text, View, Platform, StatusBar, ScrollView} from 'react-native';
import firebase from '../db'
import { Input, Button, Spinner } from '@ui-kitten/components';
import Logo from '../Components/Logo'
import KeyboardSpacer from 'react-native-keyboard-spacer';


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

                /*SharedStorage.set(
                    JSON.stringify({ user: firebase.auth().currentUser.email })
                );*/

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
                    onChangeText={email => this.changeHandle("email", email)}
                    size='large' />

                <Input placeholder="password" style={styles.input}
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={password => this.changeHandle("password", password)}
                    size='large' />

                <Button appearance='outline' status='warning' style={styles.buttonContainer} onPress={this.onButtonPress} accessoryLeft={load}>
                    <Text style={{color:'#FF8000'}}>Login</Text>
                </Button>

                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>

                <View style={styles.signUpSection}>

                    <Button appearance='outline' status='warning' onPress={() => this.props.navigation.navigate('Sign Up')} style = {styles.signUpButton}>
                        <Text style={{color:'#FF8000'}}>Create Account</Text>
                    </Button>

                    <Button appearance='outline' status='warning' onPress={() => this.props.navigation.navigate('Forgot')} style = {styles.signUpButton}>
                        <Text style={{color:'#FF8000'}}>Forgot Password</Text>
                    </Button>

                </View>

                <KeyboardSpacer/>

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

    signUpButton: {
        borderRadius: 10,
        backgroundColor:'#fcebf5'
    },

    text: {
        color: 'black',
        backgroundColor: 'transparent',
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
});

export default LoginScreen;