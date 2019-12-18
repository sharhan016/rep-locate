import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import colors from "../config/colors";
import {  Text } from "@99xt/first-born";
import FormTextInput from '../components/FormTextInput';
import RadioForm from 'react-native-simple-radio-button';
import Button from '../components/Button';

var radio_props = [
    { label: 'Representative      ', value: 0 },
    { label: 'Manager', value: 1 }
];
const screenWidth = Math.round(Dimensions.get('window').width) - 10;

class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        email: '',
        password: '',
        value: ''
    }
    handleTextChange = (value) => {
        console.log(value)
    }
    handleButtonClick = () => {

    }
    handleClick = () => {
        console.log('clicked register')
        this.props.navigation.navigate('SignUp')
    }
    goDash = () => {
        this.props.navigation.navigate('Dashboard')
    }
    getEmail = (mail) => {
        this.setState({ email: mail })
    }
    getPassword = (pass) => {
        this.setState({ password: pass })
    }
    submitButton = () => {
        console.log('Submit clicked')
        // handle post request here
        this.props.navigation.navigate('Dashboard')
    }

    render() {
        return (


            <View style={styles.container}>
                <View style={{paddingVertical: 50}}></View>
                <View style={styles.fields}>
                    <View style={{ justifyContent: 'flex-start' }} >
                        <Text>Email Id</Text></View>
                    <FormTextInput
                        style={{ height: 40 }}
                        placeholder=" Email Id"
                        onChangeText={this.getEmail}
                        value={this.state.email}
                    />


                    <View style={styles.padding}></View>
                    <View style={{ justifyContent: 'flex-start' }} >
                        <Text>Password</Text></View>
                    <FormTextInput
                        style={{ height: 40 }}
                        placeholder=" Password"
                        secureTextEntry={true}
                        onChangeText={this.getPassword}
                        value={this.state.password}
                    />
                </View>
                <View style={styles.padding}></View>
                <View style={styles.radioField}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        formHorizontal={true}
                        animation={false}
                        buttonColor={colors.MISCHKA}
                        selectedButtonColor={colors.GREENISH}
                        onPress={(value) => {
                            if (value == 1) {
                                this.setState({
                                    value: value,
                                })
                            } else {
                                this.setState({
                                    value: value,
                                })
                            }

                        }}
                    />
                </View>
                <View style={styles.padding}></View>
                <View style={{alignItems:'center'}}>
                    <Button style={styles.btnStyle} onPress={this.submitButton} label='LOGIN' />

                </View>
                <View style={styles.padding}></View>
                <View style={styles.placeholder}>
                <TouchableOpacity onPress={this.handleClick} >
                    <Text style={{ fontSize: 16, textDecorationLine: 'underline' }}>New user? Register here</Text>
                </TouchableOpacity>
                </View>


            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight:10,
        //alignItems: 'center',
        flex: 1,
        backgroundColor: colors.WHITE
        //backgroundColor:'#E7E2C5'
    },
    text: { fontSize: 25 },
    padding: { padding: 10 },
    radioField: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 40,
        justifyContent: 'flex-start',
        width: screenWidth
    },
    btnStyle: {
        width: screenWidth - 30,
        //color: colors.DODGER_BLUE

    },
    placeholder: {
        alignItems: 'center'
    },
    fields: {
        paddingLeft: 10
    }
});

export default LoginScreen;

