import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,TouchableOpacity, ScrollView } from 'react-native';
import colors from "../config/colors";
import FormTextInput from '../components/FormTextInput';

class RegisterScreen extends Component {
    static navigationOptions = {
        header: null
    }
    handleClick = () => {
        console.log('clicked Login!!')
        this.props.navigation.navigate('SignIn')
    }
    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
        <FormTextInput
          style={{height: 40}}
          placeholder="Name"  />
        <View style={styles.padding}></View>

        <FormTextInput
          style={{height: 40}}
          placeholder="Mobile Number"  />
        <View style={styles.padding}></View>

        <FormTextInput
          style={{height: 40}}
          placeholder="Email id"  />
        <View style={styles.padding}></View>

        <FormTextInput
          style={{height: 40}}
          placeholder="Designation"  />
        <View style={styles.padding}></View>

        <FormTextInput
          style={{height: 40}}
          placeholder="Headquarters"  />
        <View style={styles.padding}></View>

        <FormTextInput
          style={{height: 40}}
          placeholder="Password" />
        <View style={styles.padding}></View>

        <FormTextInput
          style={{height: 40}}
          placeholder="Confirm Password" />
        <View style={styles.padding}></View>

        <View>
                <Button onPress={() => { console.log('Button clicked');  }} title='Submit' />
        </View> 
        <View style={{height: 20}}></View>
        <TouchableOpacity onPress={this.handleClick} >
        <Text style={{fontSize: 16, textDecorationLine:'underline'}}>Already registered? Login here</Text>
        </TouchableOpacity>


      </View>
      </ScrollView>
            
        ); 
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
        //backgroundColor:'#E7E2C5'
    },
    text: {fontSize: 25},
    padding: { padding: 5 },
    scrollContainer: {        
        flex: 1,
        backgroundColor: colors.ALMOND,

    },

});

export default RegisterScreen;


/*


 <View style={styles.container}>
                <Text>
                    This is the Register page seperate
                </Text>
                <View style={styles.spacer}></View>
                <Text>Already registered? Login here</Text>
            <Button title='Login' onPress={()=>{this.props.navigation.navigate('SignIn')}} />
            </View>




*/