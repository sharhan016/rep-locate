import React, { Component } from "react";
import { Button, View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { NavigationActions,withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import colors from "../config/colors";
import DrawerItems from './DrawerItems.js';
import AsyncStorage from '@react-native-community/async-storage';


//const SideBar = props => {
class SideBar extends Component {
    state ={
        value: 0
    }
    componentDidMount() {
        this._getData();
    }
    _getData = async () => {
        const userValue = await AsyncStorage.getItem('userValue');
        if(userValue == 0){
        this.setState({value: 0})
        }else{
            this.setState({value: 1});
        }
    
    }

   
     


    render() {
       
        const repitems = <View style={styles.container}><DrawerNavigatorItems {...this.props} /></View>
        const managerItems =  <View>
            <DrawerItems iconName='home' text='Home' route='Dashboard' />
              <DrawerItems iconName='file' text='DCR Report' route='DCR' /> 
              <DrawerItems iconName='list' text='Rep List' route='DCR' /> 
              <DrawerItems iconName='calendar' text='View TP' route='DCR' /> 
             </View>;
             
    
        console.log('reached  Class SideBar')
        return (

            <ScrollView style={styles.container}>
                <ImageBackground
                    source={require('../assets/background-green.jpg')}
                    style={styles.imageBG}
                >
                    <Image source={require('../assets/inner-bg.jpg')} style={styles.profile} />
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.designation}>Medical Representative</Text>
                </ImageBackground>
                

                {this.state.value == 0 ? repitems : managerItems}

                {/* <TouchableOpacity style={styles.itemsContainer}
    //onPress={ () => nav.navigate('DCR') }
     onPress={ () => {
         console.log('I am hererrer')
         this.navigateToScreen('DCR')
     } }
    >

              <Icon
                type='feather'
                size={18}
                name= 'home'
                containerStyle={styles.btnStyle}
                />
                <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Home</Text>
                </View>
              </TouchableOpacity> */}


            </ScrollView>
             
        );
    }
}

export default withNavigation(SideBar);


{/*
                
               */}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG_LOGIN
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    imageBG: {
        width: undefined,
        padding: 16,
        paddingTop: 48
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    name: {
        color: colors.DRW_TINT,
        fontSize: 20,
        fontWeight: '800',
        marginVertical: 5
    },
    designation: {
        color: colors.DRW_TINT,
        fontSize: 15,
        marginRight: 4,
        fontWeight: '500'
    },
    itemsContainer: {
        paddingTop: 5,
        margin: 5,  
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.DRW_ITEMS,
        //borderWidth: 1,
        //borderRadius: 40
        //alignItems: 'flex-start'
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