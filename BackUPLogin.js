import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Keyboard, Animated, ToastAndroid } from "react-native";
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
            press: false,
            username: '',
            password: '',
            value: '',
            isUserLoggedIn: '1',
            rep: true,
            manager: false,
            topPadding: 50
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
        let height = event.endCoordinates.height;
        console.log('inside didShow', height)
        this.setState({ topPadding: 10 });
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: height,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: 115,
            }),
        ]).start();
    };

    keyboardDidHide = (event) => {
        this.setState({ topPadding: 70 });
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: 100,
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
        //console.log('value is ',this.state.value,'rep is', this.state.rep)
        if (this.state.username != '') {
            if (this.state.password != '') {
                //alert('Success')
            } else {
                alert('Please Enter password');
            }
        } else {
            //alert('Please Enter Userid');

        }
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
                console.log('NavigationParams inside submit ', navigationParams);
                let tok = response.data.APIToken;
                let tokendata = tok.toString();
                let use = userData["UserType"]
                let userType = use.toString();
                this.storeToken(tokendata,userType,navigationParams);
                /*
              AsyncStorage.multiSet(
                  [
                    [LOGGED_IN, this.state.isUserLoggedIn],
                    [USER, userData["UserName"]],
                    [USER_TYPE, userData["UserType"] ]
                    [TOKEN, response.data.APIToken]
                  ],
                  () => {
                    this.props.navigation.navigate("Dashboard", navigationParams);
                  });
                  */
                

            })
            .catch(error => {
                ToastAndroid.show("Login Failed", ToastAndroid.SHORT);
                console.log(error)
            }
            );
    
    }

    storeToken = async (data, type, navData) => {
        const { userName, designation } = navData;
        console.log('username inside storeToken ',userName)
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
        this.props.navigation.navigate("Dashboard", navData);

    }

    getToken = async () => {
        try {
            let token = await AsyncStorage.getItem(api.TOKEN);
            console.log("token inside LoginPage ",token)
        } catch (error) {
            console.log(error)
        }
    }

    static navigationOptions = {
        header: null
    }
    render() {
        return (

            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]} >
                {/* <ScrollView> */}
                <View style={{ paddingVertical: this.state.topPadding }}></View>

                {/* <View style={styles.logoContainer}>
                <Image source={logo3} style={styles.logo} />
                </View> */}
                <Animated.Image source={logo3} style={styles.logo} />

                <View style={{ paddingVertical: 20 }}></View>

                <View>
                    {/* <Ionicons name={'person'} size={28} color={('rgba(255, 255, 255, 0.7')}  */}
                    <Feather name={'user'} size={28} color={'black'} style={styles.inputIcon} />

                    <TextInput
                        onChangeText={this.getUserId}
                        value={this.state.username}
                        style={styles.inputContainer}
                        placeholder={'User Id'}
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'
                        keyboardType='email-address'
                    />
                </View>

                <View style={{ paddingVertical: 15 }}></View>

                <View>
                    <Feather name={'lock'}
                        size={28} style={styles.inputIcon} />

                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={this.getPassword}
                        value={this.state.password}
                        placeholder={'Password'}
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPass}
                    />
                    <TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)} >
                        <Feather name={this.state.press == false ? 'eye' : 'eye-off'}
                            size={26} color={'rgba(207, 204, 204, 0.5)'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.radioField}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        animation={false}
                        buttonColor={colors.MISCHKA}
                        selectedButtonColor={'#432577'}
                        onPress={(value) => {
                            if (value == 0) {
                                this.setState({
                                    value: value,
                                    rep: true
                                })
                                // console.log('rep value changed to true ', this.state.rep,this.state.value)
                            } else {
                                this.setState({
                                    value: value,
                                    rep: false
                                })
                                //console.log('rep value changed to false ', this.state.rep, this.state.value)
                            }

                        }}
                    />
                </View>

                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={this.loginButton}
                    //onPress={ ()=> this.props.navigation.navigate('Dashboard')}
                    activeOpacity={0.5}
                    underlayColor={colors.BLACK}
                >
                    <Text style={styles.text} >Login</Text>
                </TouchableOpacity>



                <View style={{ paddingVertical: 25 }}></View>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUp')} >
                    <Text style={{ fontSize: 16, textDecorationLine: 'underline' }}>New user? Register here</Text>
                </TouchableOpacity>
                <View style={{ paddingVertical: 15 }}></View>
            </Animated.View>


            // <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            //     <View style={styles.logoContainer}>
            //     <Image source={logo2} style={styles.logo} />
            //     <Text style={styles.logoText}>Med Shore</Text>
            //     </View>
            // </ImageBackground>
        );
    }
}
export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG_LOGIN,
        alignItems: 'center',
        //justifyContent: 'center'
    },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
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
        height: 45,
        borderRadius: 45,
        fontSize: 17,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
        paddingLeft: 60
    },
    inputIcon: {
        position: 'absolute',
        top: 9,
        left: 37,
        color: '#cfcccc'
    },
    btnEye: {
        position: 'absolute',
        top: 9,
        right: 40,
    },
    btnLogin: {
        width: WIDTH - 75,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#432577',
        justifyContent: 'center',
        marginTop: 20,

    },
    text: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.7)',
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
});