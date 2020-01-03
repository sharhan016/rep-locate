import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions, TouchableHighlight,Image } from 'react-native';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as api from '../config/api';
import RepDisplay from './RepDisplay';
import ManagerScreen from './ManagerScreen';

import colors from "../config/colors";

const width = Dimensions.get('screen').width - 50;
const ZERO = "0";
class DashboardScreen extends Component {
    state = {
        tokenId: '',
        userType: 0
    }
    static navigationOptions = {
        title: 'Dashboard',
      };
    // static navigationOptions = {
    //     title: 'Home',
    //     headerTintColor: '#ffffff',
    //     headerStyle: {
    //       backgroundColor: '#2F95D6',
    //       borderBottomColor: '#ffffff',
    //       borderBottomWidth: 3,
    //     },
    //     headerTitleStyle: {
    //       fontSize: 18,
    //     },
    //};
    goToDoctor = () => {
        this.props.navigation.push('DCR', {
            id: '01',
        });
    }

    goToChemist = () => {
        this.props.navigation.navigate('DCR', {
            id: '02',
        });

    }

    goToStockist = () => {
        this.props.navigation.navigate('DCR', {
            id: '03',
        });
    }
    componentDidMount(){
        this.getToken();
    }

    getToken = async () => {
        try {
            let token = await AsyncStorage.getItem(api.TOKEN);
            let userType = await AsyncStorage.getItem(api.USER_TYPE)
            this.setState({tokenId: token, userType: userType});
            console.log("token inside dashboard and userType ",token, userType)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const RepView = <RepDisplay token={this.state.tokenId} navigation={this.props.navigation} />
        const ManagerView = <ManagerScreen token={this.state.tokenId} navigation={this.props.navigation}/>
        return (
            
            <View style={styles.container}>
                <StatusBar barStyle = "light-content" hidden = {false} backgroundColor={colors.STATUS_BAR_GRN}/>
                
                

        {this.state.userType === ZERO ? RepView : ManagerView }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.BG_LOGIN,
        flex: 1,
    },
    // btnContainer:{
    //     height: 200,
    //     width: width,
    //     //alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: colors.DASH_BTN,
    //     borderRadius: 14

    // },
    // image: {
    //     width: width,
    //     height: 150,
    //     resizeMode: 'stretch'
    // },
    // fontStyle: {
    //     fontSize: 20,
    //     fontWeight: "500",
    //     fontStyle: 'italic'
    // },
    // text: { fontSize: 25 },
    // padding: { padding: 10 },
    // btnStyle: { width: "80%" }
});

export default DashboardScreen;

/*


  <View style={{ height: 30 }} ></View>
                <Button title='Submit DCR' onPress={this.goToDCR} />
                <View style={{ height: 30 }} ></View>
                <Button title='Submit TP' onPress={this.goToTP} />
                <View style={{ height: 30 }} ></View>
                <Button style={{width: "100%"}} title='    Mails    ' onPress={this.goToMail}></Button>
                <View style={{ height: 50 }} ></View>




    }
    goToTP = () => {
        this.props.navigation.navigate('TourPlan', {
            otherParam: 'DCR',
          });
    }
    goToMail = () => {
        this.props.navigation.navigate('Mail');
    }
*/