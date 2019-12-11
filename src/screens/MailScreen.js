import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';
import { openInbox } from 'react-native-email-link';
import colors from "../config/colors";

class MailScreen extends Component {
    state = {  }
    compose = () => {
        Linking.openURL('mailto:sharhan.sathar@gmail.com?subject=Leave Application&body=');
    }
    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.btnStyle} title=' Check Mail ' onPress={()=>openInbox()} />
                <View style={{ height: 50 }} ></View>
                <Button style={styles.btnStyle} title=' Submit Leave ' onPress={ this.compose } />
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
    btnStyle:{
        width: 200,
    }
});

export default MailScreen;