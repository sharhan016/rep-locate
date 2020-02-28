import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Keyboard, Animated, ToastAndroid, ImageBackground, StatusBar, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import RadioForm from 'react-native-simple-radio-button';
import axios from "axios";
import * as api from '../config/api';
import colors from '../config/colors';
import logo3 from '../assets/logo3.png';



var radio_props = [
    { label: 'Representative      ', value: 0 },
    { label: 'Manager', value: 1 }
];
const { width: WIDTH } = Dimensions.get('window')
const TRUE = 'true';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            showPass: true,
            loading: false,
            press: false,
            username: '',
            password: '',
            value: '',
            isUserLoggedIn: '1',
            rep: true,
            manager: false,
            topPadding: 80
        };
        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(120);
    }
    componentDidMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }

    keyboardDidShow = (event) => {
        let height = event.endCoordinates.height - 150;
        this.setState({ topPadding: 20 });
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: height,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: 100,
            }),
        ]).start();
    };

    keyboardDidHide = (event) => {
        this.setState({ topPadding: 80 });
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: 120,
            }),
        ]).start();
    };



    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }
    getUserId = (id) => {
        this.setState({ username: id })
    }
    getPassword = (pass) => {
        this.setState({ password: pass })
    }
    loginButton = () => {
        const { username, password, rep, value } = this.state;
        if (this.state.username != '') {
            if (this.state.password != '') {
            } else {
                alert('Please Enter password');
            }
        } else {

        }
        this.setState({loading: true});
        Keyboard.dismiss();
        this.submit(username, password, rep, value);
    }

    submit = async (userId, password, rep, val) => {

        axios.post(api.USER_LOGIN, {
            UserName: userId, // text
            UserPassword: password, // text
            UserType: val // 1 -> manager
        })
            .then(response => {
                let userData = response.data.TokenData
                const navigationParams = {
                    token: response.data.APIToken,
                    tokenData: response.data,
                    userName: userData["UserName"],
                    designation: userData["UserDesignation"]
                }
                let tok = response.data.APIToken;
                let tokendata = tok.toString();
                let use = userData["UserType"]
                let userType = use.toString();
                this.storeToken(tokendata,userType,navigationParams);
                

            })
            .catch(error => {
                ToastAndroid.show("Login Failed", ToastAndroid.SHORT);
                this.setState({loading: false});
                console.log(error)
            }
            );
    
    }

    storeToken = async (data, type, navData) => {
        let { userName, designation } = navData;
        if(designation == null){
            designation = ' . '
        }
        try {
            await AsyncStorage.setItem(api.TOKEN, data)
            await AsyncStorage.setItem(api.USER_TYPE, type)
            await AsyncStorage.setItem(api.LOGGED_IN, TRUE)
            await AsyncStorage.setItem(api.USER_NAME,userName)
            await AsyncStorage.setItem(api.USER_DESIGNATION, designation)
            this.getToken();
        } catch (error) {
            console.log(error)
        }
        this.setState({loading: false});
        this.props.navigation.navigate("Dashboard", navData);

    }

    getToken = async () => {
        try {
            let token = await AsyncStorage.getItem(api.TOKEN);
        } catch (error) {
            console.log(error)
        }
    }

    static navigationOptions = {
        header: null
    }
    render() {
        const Indicator = <ActivityIndicator animating = {this.state.loading} color = {colors.HEADER_BLUE} size = "large"/>
        return (
            <ImageBackground
                    source={require('../assets/healthcare.jpg')}
                    style={styles.backgroundContainer}
                >
                    <StatusBar hidden = {true} />
                
                   
                  
                

            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]} >
                <View style={{ paddingVertical: this.state.topPadding }}></View>

                <Animated.Image source={logo3} style={[styles.logo, {height: this.imageHeight}]} />

                <View style={{ paddingVertical: 10 }}></View>

                <View>
                    <Feather name={'user'} size={24} color={'black'} style={styles.inputIcon} />

                    <TextInput
                        onChangeText={this.getUserId}
                        autoCapitalize={"none"}
                        value={this.state.username}
                        style={styles.inputContainer}
                        placeholder={'Username'}
                        placeholderTextColor={colors.INPUT_LABEL}
                        underlineColorAndroid='transparent'
                        keyboardType='email-address'
                    />
                </View>

                <View style={{ paddingVertical: 15 }}></View>

                <View>
                    <Feather name={'lock'}
                        size={24} style={styles.inputIcon} />

                    <TextInput
                        style={styles.inputContainer}
                        autoCapitalize={"none"}
                        onChangeText={this.getPassword}
                        value={this.state.password}
                        placeholder={'Password'}
                        placeholderTextColor={colors.INPUT_LABEL}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPass}
                    />
                    <TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)} >
                        <Feather name={this.state.press == false ? 'eye' : 'eye-off'}
                        size={20}
                        color={'rgba(207, 204, 204, 0.5)'}
                         />
                    </TouchableOpacity>
                </View>

                <View style={{ paddingVertical: 5 }}></View>

                <View style={styles.radioField}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        buttonSize={8}
                        labelColor={colors.INPUT_LABEL}
                        buttonOuterSize={18}
                        selectedLabelColor='#ff971db8'
                        formHorizontal={true}
                        animation={false}
                        buttonColor={colors.INPUT_LABEL}
                        selectedButtonColor='#ff971db8'
                        onPress={(value) => {
                            if (value == 0) {
                                this.setState({
                                    value: value,
                                    rep: true
                                })
                            } else {
                                this.setState({
                                    value: value,
                                    rep: false
                                })
                            }

                        }}
                    />
                </View>
                <View style={{ paddingVertical: 5 }}></View>

                {this.state.loading ? Indicator : <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={this.loginButton}
                    activeOpacity={0.5}
                    underlayColor={colors.BLACK}>
                <Text style={styles.text} >SIGN IN</Text>
                </TouchableOpacity>}



                <View style={{ paddingVertical: 15 }}></View>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUp')} >
                    <Text style={{ fontSize: 14, textDecorationLine: 'underline', color: colors.INPUT_LABEL }}>New user? Register here</Text>
                </TouchableOpacity>
                <View style={{ paddingVertical: 15 }}></View>
            </Animated.View>
            </ImageBackground>

        );
    }
}
export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG_LOGIN,
        alignItems: 'center',
        //paddingTop: 30
    },
    backgroundContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 120,
        height: 120,

    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 30
    },
    logoText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.5
    },
    inputContainer: {
        width: WIDTH - 55,
        height: 40,
        borderRadius: 45,
        fontSize: 13,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: colors.INPUT_LABEL,
        marginHorizontal: 25,
        paddingLeft: 45
    },
    inputIcon: {
        position: 'absolute',
        top: 6,
        left: 37,
        padding: 0,
        color: colors.BT_ORANGE
    },
    btnEye: {
        position: 'absolute',
        top: 9,
        right: 40,
    },
    btnLogin: {
        width: WIDTH - 95,
        height: 40,
        borderRadius: 25,
        backgroundColor: colors.BT_ORANGE,
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        textAlign: 'center',
        color: colors.WHITE,
        //color: 'rgba(255,255,255,0.7)',
        fontSize: 18
    },
    radioField: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 40,
        justifyContent: 'flex-start',
        width: WIDTH - 15,
        marginTop: 20,
        marginLeft: 30
    },
    imageBG: {
        width: undefined,
        padding: 16,
        paddingTop: 48
    },
});