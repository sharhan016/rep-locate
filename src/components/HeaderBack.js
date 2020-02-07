import React, { Component } from 'react';
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native';
//import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Content } from 'native-base';
import colors from '../config/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';



const HeaderBack = (props) => {
    const { textStyle, container,leftIcon, headerText } = styles;
    return(
        <View style={container}>
            <View style={leftIcon}>
            <TouchableOpacity onPress={props.onPress}>
            <Ionicons style= {{paddingLeft:15}} name= "md-arrow-back" size={40} color={colors.WHITE} />
            </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 15}}></View>
            <View style={headerText}>
            <Text style={textStyle}> {props.heading} </Text>
            </View>
        </View>
    );
}

export default HeaderBack;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.CUSTOM_HEADER,
        width: "100%",

        //justifyContent: 'center',
        //alignItems: 'center',
        flexDirection: 'row',
        height: 70,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.6,
        elevation: 2,
        position: 'relative',
        top: 0
    },
    leftIcon: {
        justifyContent: 'flex-start'
    },
    textStyle: {
        fontSize: 28,
        paddingBottom: 10,
        color: colors.WHITE,
        fontWeight: '600'
    },
    headerText: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        height: 60,
        paddingRight: 20
        
    }
});
