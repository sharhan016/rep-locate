import React, { Component } from "react";
import { View,Text,StyleSheet, ImageBackground,Image, TextInput, Dimensions, TouchableOpacity,Keyboard, Animated} from "react-native";
import colors from '../config/colors';
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
                value: '',
                rep: true,
                manager: false
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
    registerButton = () => {
        const { name, email, mobile, password, rep, value } = this.state;
        console.log('reached register button ',name)
    }
    
    render() {
        
        return (
            // <View style={styles.container}>
            <Animated.View style={[styles.container, {paddingBottom: this.keyboardHeight}]} >
                <View style={{paddingVertical: 20}}></View>
                 {/* <View style={styles.logoContainer}>
                 <Image source={logo3} style={styles.logo} />
                 </View> */}
                <Animated.Image source={logo3} style={[styles.logo, {height: this.imageHeight}]} />
                <View style={{paddingVertical: 15}}></View>

                <View>
                <Feather name={'user'} size= {28} color={'black'} style={styles.inputIcon} />
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
                    <Feather name={'mail'} size= {28} color={'black'} style={styles.inputIcon} />
                     
                    <TextInput 
                    onChangeText={this.getEmail}
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
                    <Feather name={'phone'} size= {28} color={'black'} style={styles.inputIcon} />
                     
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
                    <Feather name={'lock'} size= {28}  style={styles.inputIcon} />
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
                  onPress={this.registerButton} >
                    <Text style={styles.text} >Register</Text>
                </TouchableOpacity>

                

                <View style={{paddingVertical: 25}}></View>

                <TouchableOpacity onPress={ () => this.props.navigation.navigate('SignIn')} >
                <Text style={{fontSize: 16, textDecorationLine:'underline'}}>Already registered? Login here</Text>
                </TouchableOpacity>

             </Animated.View>
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
        height: 45,
        borderRadius: 45,
        fontSize: 17,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
        paddingLeft:60
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