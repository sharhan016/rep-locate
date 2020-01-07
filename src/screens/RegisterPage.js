import React, { Component } from "react";
import { View,Text,StyleSheet, ImageBackground, ActivityIndicator, StatusBar,Image, ToastAndroid, TextInput, Dimensions, TouchableOpacity,Keyboard, Animated} from "react-native";
import colors from '../config/colors';
import * as api from '../config/api';
import Feather from 'react-native-vector-icons/Feather';
import RadioForm from 'react-native-simple-radio-button';
import axios from "axios";
import logo3 from '../assets/logo3.png';

var radio_props = [
    { label: 'Representative      ', value: 0 },
    { label: 'Manager', value: 1 }
];
const { width: WIDTH } = Dimensions.get('window')
class RegisterPage extends Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();
        this.state = { 
                showPass : true,
                press : false,
                name: '',
                email: '',
                mobile: '',
                password: '',
                value: 0,
                rep: true,
                manager: false,
                loading: false
        };
        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(120);
    }
    componentDidMount () {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
      }
    
      componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
      }
      keyboardDidShow = (event) => {
        let height = event.endCoordinates.height;
        this.setState({topPadding: 10});
      Animated.parallel([
          Animated.timing(this.keyboardHeight, {
            duration: event.duration,
            toValue: height,
          }),
          Animated.timing(this.imageHeight, {
            duration: event.duration,
            toValue: 0,
          }),
        ]).start();
    };
  
    keyboardDidHide = (event) => {
      this.setState({topPadding: 70});
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

    //  Keyboard.dismiss();


    showPass = () => {
        if(this.state.press == false){
            this.setState({ showPass: false, press: true})
        } else {
            this.setState({ showPass: true, press: false })
        }
    }
    getName = (name) => {
        this.setState({ name: name })
    }
    getEmail = (mail) => {
        this.setState({ email: mail })
    }
    getNumber = (mob) => {
        this.setState({ mobile: mob })
    }
    getPassword = (pass) => {
        this.setState({ password: pass })
    }
    
    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
        console.log("Email is Not Correct");
        this.setState({email:text, valid: false})
        return false;
          }
        else {
          this.setState({email:text, valid: true})
          console.log("Email is Correct");
        }
        }
        

    checkEmpty = () => {
        const { name, mobile, password, valid } = this.state;
        if (name.length <= 3) {
            console.log('name not correct', name.length)
        } else if(mobile.length != 10){
            return ToastAndroid.show("Mobile number invalid", ToastAndroid.SHORT);
        } else if(password <= 4){
            return ToastAndroid.show("Password should be 4 or more characters", ToastAndroid.SHORT);
        }else if(valid == false){
            return ToastAndroid.show("Email is not valid", ToastAndroid.SHORT);
        }else{
            this.setState({loading: true});
            Keyboard.dismiss();
            this.registerButton();
        }
    }

    registerButton = async () => {
        const { name, email, mobile, password, value,  } = this.state;
        console.log('name',name)
        console.log('email',email)
        console.log('mobile',mobile)
        console.log('password',password)
        console.log('value',value)
        await axios.post(api.USER_REGITER, {
            UserName: name,
            UserEmail: email,
            UserMobile: mobile, 
            UserPassword: password,
            UserType: value
        })
            .then(response => {
                console.log('RESPONSE REGITERATION ',response)
                if(response.status == 200){
                    this.setState({loading: false});
                    ToastAndroid.show("Registeration Successful", ToastAndroid.LONG);this.props.navigation
                    this.props.navigation.navigate('SignIn')
                }else{
                    ToastAndroid.show("Sign Up Failed", ToastAndroid.SHORT);
                    this.setState({loading: false});
                }
            })
            .catch(error => {
                ToastAndroid.show("Sign Up Failed", ToastAndroid.SHORT);
                this.setState({loading: false});
                console.log(error)
            }
            );
    }
    
    render() {
        const Indicator = <ActivityIndicator animating = {this.state.loading} color = {colors.BT_ORANGE} size = "large"/>
        return (
            <ImageBackground
            source={require('../assets/healthcare.jpg')}
            style={styles.backgroundContainer}
        >
            <StatusBar hidden = {true} />
            <Animated.View style={[styles.container, {paddingBottom: this.keyboardHeight}]} >
                <View style={{paddingVertical: 20}}></View>
      
                <Animated.Image source={logo3} style={[styles.logo, {height: this.imageHeight}]} />
                <View style={{paddingVertical: 15}}></View>

                <View>
                <Feather name={'user'} size= {24} color={'black'} style={styles.inputIcon} />
                <TextInput 
                    onChangeText={this.getName}
                    value={this.state.name}
                    style={styles.inputContainer}
                    placeholder={'Name'}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                    />
                </View>
                <View style={{paddingVertical: 10}}></View>
                <View>
                    <Feather name={'mail'} size= {24} color={'black'} style={styles.inputIcon} />
                     
                    <TextInput 
                    onChangeText={this.validate}
                    value={this.state.email}
                    style={styles.inputContainer}
                    placeholder={'Email Id'}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                    keyboardType='email-address'
                    />
                </View>
                <View style={{paddingVertical: 10}}></View>

                <View>
                    <Feather name={'phone'} size= {24} color={'black'} style={styles.inputIcon} />
                     
                    <TextInput 
                    onChangeText={this.getNumber}
                    value={this.state.mobile}
                    style={styles.inputContainer}
                    placeholder={'Mobile Number'}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                    keyboardType='number-pad'
                    maxLength={10}
                    />
                </View>
                <View style={{paddingVertical: 10}}></View>
                    <View>
                    <Feather name={'lock'} size= {24}  style={styles.inputIcon} />
                    <TextInput 
                    style={styles.inputContainer}
                    onChangeText={this.getPassword}
                    value={this.state.password}
                    placeholder={'Password'}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                    secureTextEntry={this.state.showPass}
                    />
                    <TouchableOpacity style={styles.btnEye} onPress={ this.showPass.bind(this)} >
                        <Feather name={this.state.press == false ? 'eye' : 'eye-off'} 
                        size={20} color={'rgba(207, 204, 204, 0.5)'} />
                    </TouchableOpacity>
                     </View>

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
                                    value: 0,
                                    rep: true
                                })
                            } else {
                                this.setState({
                                    value: 1,
                                    rep: false
                                })
                            }
                        }}
                    />
                </View>

                {this.state.loading ? Indicator : <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={this.checkEmpty}
                    activeOpacity={0.5}
                    underlayColor={colors.BLACK}>
                <Text style={styles.text} >Register</Text>
                </TouchableOpacity>}

                

                <View style={{paddingVertical: 25}}></View>

                <TouchableOpacity onPress={ () => this.props.navigation.navigate('SignIn')} >
                <Text style={{fontSize: 14, textDecorationLine:'underline', color: colors.INPUT_LABEL}}>Already registered? Login here</Text>
                </TouchableOpacity>

             </Animated.View>
             </ImageBackground>
        );
    }
}
export default RegisterPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG_LOGIN,
        alignItems: 'center',
    },
    backgroundContainer: {
        //flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundContainers: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 120,
        //height: 120,

    },
    logoContainer:{
        alignItems: 'center',
        marginTop: 30,
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
        //color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
        paddingLeft: 45
    },
    inputIcon: {
        position: 'absolute',
        top: 6,
        left: 37,
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
        marginTop: 25,

    },
    text: {
        textAlign: 'center',
        color: colors.WHITE,
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