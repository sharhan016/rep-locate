import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight, StatusBar } from 'react-native';
import colors from '../config/colors';

const width = Dimensions.get('screen').width - 50;

class DashboardPage extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle = "light-content" hidden = {false} backgroundColor={colors.STATUS_BAR}/>
                <View style={{paddingVertical: 40}}></View>
                
                <TouchableHighlight>
                <View style={styles.btnContainer}>
                <Image 
                style={styles.image}
                source={require('../assets/doctor-logo.jpg')}
                />
                </View>
                </TouchableHighlight>
                
                <View style={{paddingVertical: 40}}></View>

                <View style={styles.btnContainer}></View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'center',
        //flex: 1
    },
    btnContainer:{
        height: 200,
        width: width,
        //alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.DASH_BTN,
        borderRadius: 14

    },
    image: {
        width: width,
        height: 150,
        resizeMode: 'stretch'
    },
    fontStyle: {
        fontSize: 20,
        fontWeight: "500",
        fontStyle: 'italic'
    }
});
export default DashboardPage;