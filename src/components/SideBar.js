import React, { Component } from "react";
import { Button, View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from "react-native";
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { NavigationActions,withNavigation } from 'react-navigation';

import * as api from '../config/api';
import colors from "../config/colors";
import DrawerItems from './DrawerItems.js';
import AsyncStorage from '@react-native-community/async-storage';


class SideBar extends Component { 
    constructor(){
        super();
        this.state={
            value: '0',
            name: '',
            designation: ''
        }
    }
    
    componentDidMount() {
        this.getToken();
    }
    getToken = async () => {
        try {
            const userType = await AsyncStorage.getItem(api.USER_TYPE)
            const userName = await AsyncStorage.getItem(api.USER_NAME)
            const userDesignation = await AsyncStorage.getItem(api.USER_DESIGNATION)
            this.setState({value: userType, name: userName, designation: userDesignation });
        } catch (error) {
            console.log(error)
        }
    }

   
     


    render() {
       
        const repitems = <View style={styles.container}><DrawerNavigatorItems {...this.props} /></View>
        const managerItems =  <View>
            <DrawerItems iconName='home' text='Home' route={0} />
            <DrawerItems iconName='file' text='DCR Report' route='DcrList' /> 
            <DrawerItems iconName='list' text='Rep List' route='RepList' /> 
            <DrawerItems iconName='mail' text='Mail' route='Mail' />
            <DrawerItems iconName='calendar' text='View TP' route='Events' /> 
            <DrawerItems iconName='log-out' text='Log Out' route= {null} />
             </View>;
             
        return (

            <ScrollView style={styles.container}>

                <View style={{marginVertical: 20}} ></View>
                    <View style={{paddingLeft: 10}}>
                    <Image source={require('../assets/logo3.png')} style={styles.profile} />
                    </View>
                    <Text style={styles.name}>{this.state.name}</Text>
                    <Text style={styles.designation}>{this.state.designation}</Text>
                    <View style={{marginVertical: 10}} ></View>
                
 
                {this.state.value == '0' ? repitems : managerItems}

            </ScrollView>
             
        );
    }
}

export default withNavigation(SideBar);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE

    },
    imageBG: {
        width: undefined,
        padding: 16,
        paddingTop: 30
    },
    profile: {
        width: 120,
        height: 120,
    },
    name: {
        color: colors.DRW_TINT,
        fontSize: 20,
        fontWeight: '800',
        paddingLeft: 10,
        marginVertical: 5
    },
    designation: {
        color: colors.DRW_TINT,
        fontSize: 15,
        marginRight: 4,
        paddingLeft: 10,
        fontWeight: '500'
    },
    itemsContainer: {
        paddingTop: 5,
        margin: 5,  
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.DRW_ITEMS,

    },
    btnStyle: {
        height: 45,
        padding: 5,
        paddingLeft: 20,
        paddingTop: 7,
        //backgroundColor: colors.ALMOND
        //width: 60
    },
    textContainer: {
        //backgroundColor: colors.ALMOND,
        paddingBottom: 7,
        paddingLeft: 7,
        justifyContent:'center',
    },
    textStyle: {
        fontSize: 17,
        fontWeight: '600'
    }
});