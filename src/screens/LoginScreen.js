import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native';
import colors from "../config/colors";
import FormTextInput from '../components/FormTextInput';
import RadioForm from 'react-native-simple-radio-button';

var radio_props = [
    { label: 'Representative    ', value: 0 },
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
    handleClick = () => {
        console.log('clicked register')
        this.props.navigation.navigate('SignUp')
    }
    getEmail =(mail) => {
        this.setState({email: mail })
    }
    getPassword =(pass) => {
        this.setState({password: pass })
    }
    submitButton = () => {
        console.log('Submit clicked')
        // handle post request here
        this.props.navigation.navigate('Dashboard')
    }

    render() {
        return (


            <View style={styles.container}>

        <FormTextInput
          style={{height: 40}}
          placeholder=" Email Id"
          onChangeText={this.getEmail}   
          value={this.state.email}     
        />

        <View style={styles.padding}></View>

        <FormTextInput
          style={{height: 40}}
          placeholder=" Password"
          secureTextEntry={true}
          onChangeText={this.getPassword}
          value={this.state.password}
        />
        <View style={styles.padding}></View>
            <View style={styles.radioField}>
        <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={true}
                    animation={false}
                    buttonColor={colors.MISCHKA}
                    selectedButtonColor= {colors.GREENISH}
                    onPress={(value) => { 
                        if(value == 1) {
                        this.setState({ 
                            value: value,
                         }) } else {
                             this.setState({
                                 value: value,
                             })
                         }
                    
                    }}
                />
                </View>
                <View style={styles.padding}></View>
        <View>
                <Button onPress={this.submitButton} title='Submit' />
        </View> 
        <View style={styles.padding}></View>
        <TouchableOpacity onPress={this.handleClick} >
        <Text style={{fontSize: 16, textDecorationLine:'underline'}}>New user? Register here</Text>
        </TouchableOpacity>

         <Text>{this.state.email}</Text>

        

      </View>

            
        ); 
    }
}

const styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.ALMOND
        //backgroundColor:'#E7E2C5'
    },
    text: {fontSize: 25},
    padding: { padding: 10 },
    radioField: {flexDirection:'row',
    alignItems: 'center',
     justifyContent: 'center',
     width: screenWidth
    }
});

export default LoginScreen;

