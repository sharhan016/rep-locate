import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking, StatusBar, ImageBackground, TouchableHighlight, Dimensions } from 'react-native';
//import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Content } from 'native-base';
import Btn from '../components/Button';
import Header from '../components/HeaderBack';
import { openInbox } from 'react-native-email-link';
import colors from "../config/colors";

const width = Dimensions.get('screen').width - 50;

class MailScreen extends Component {
    state = {}
    compose = () => {
        Linking.openURL('mailto:sharhan.sathar@gmail.com?subject=Leave Application&body=');
    }
    render() {
        return (
            <ImageBackground 
            style={styles.backgroundContainer}
            source={require('../assets/mail.jpg')}
            >
                <StatusBar barStyle = "light-content" hidden = {false} backgroundColor={colors.BG_LOGIN}/>
                <View style={styles.container}>
                <Header 
                heading='Mail Screen'
                onPress={() => this.props.navigation.goBack()}
                />
                          
                            <View style={styles.btnContainer}>
                            <TouchableHighlight onPress={() => openInbox()} >
                <ImageBackground source={require('../assets/mail-image.jpg')} imageStyle={{ borderRadius: 20 }} style={styles.buttonContainer}>
                    <View style={styles.textImage}>
                        <Text style={styles.imageText}>OPEN INBOX</Text>
                    </View>
                </ImageBackground>
                </TouchableHighlight>

                        {/* <Btn style={styles.btnStyle} textStyle={styles.textStyle} label=' CHECK MAIL ' onPress={() => openInbox()}/> */}
                        <View style={{paddingVertical: 40}}></View>
                        {/* <Btn style={[styles.btnStyle,styles.textStyle]} label=' SUBMIT LEAVE ' onPress={this.compose} /> */}
                        <TouchableHighlight onPress={this.compose} >
                <ImageBackground source={require('../assets/mail-image.jpg')} imageStyle={{ borderRadius: 20 }} style={styles.buttonContainer}>
                    <View style={styles.textImage}>
                        <Text style={styles.imageText}>SUBMIT LEAVE </Text>
                    </View>
                </ImageBackground>
                </TouchableHighlight>
                         
                          <View style={{paddingVertical: 40}}></View>
                        </View>

                        </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //justifyContent: 'center',
        //alignItems: 'center',
        flex: 1,
        backgroundColor: colors.BG_LOGIN
        //backgroundColor:'#E7E2C5'
    },
    btnStyle: {
        width: "60%"
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex:1
    },
    textStyle: {
        fontSize: 17,
        fontWeight: '700'
    },
    backgroundContainer: {
        height: '100%',
        width: '100%'
    },
    textImage: { 
        position: 'absolute', 
        top: "80%", 
        left: 10, 
        right: 20, 
        bottom: 0,
        paddingLeft: 10
        //justifyContent: 'center', 
        //alignItems: 'center' 
    },
    imageText:{
        fontSize: 22,
        fontWeight: 'bold',
        //fontFamily: 'monospace'
    },
    buttonContainer: {
        height: 200,
        width: width,
        borderRadius: 10,
        alignItems: 'center'

    },
});

export default MailScreen;