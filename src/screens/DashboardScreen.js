import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions, TouchableHighlight,Image } from 'react-native';
import { StatusBar } from 'react-native';

import Button from '../components/Button';

import colors from "../config/colors";

const width = Dimensions.get('screen').width - 50;

class DashboardScreen extends Component {
    state = {}
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

    render() {
        return (
            
            <View style={styles.container}>
                <StatusBar barStyle = "light-content" hidden = {false} backgroundColor={colors.STATUS_BAR_GRN}/>
                {/* <Button style={styles.btnStyle} label='Doctor' onPress={this.goToDoctor} /> */}
                <TouchableHighlight onPress={this.goToDoctor}>
                <View style={styles.btnContainer}>
                <Image 
                style={styles.image}
                source={require('../assets/doctor-logo.jpg')}
                />
                </View>
                </TouchableHighlight>
                <View style={{ height: 30 }} ></View>
                {/* <Button style={styles.btnStyle} label='Chemist' onPress={this.goToChemist} /> */}
                <TouchableHighlight onPress={this.goToChemist}>
                <View style={styles.btnContainer}>
                <Image 
                style={styles.image}
                source={require('../assets/doctor-logo.jpg')}
                />
                </View>
                </TouchableHighlight>
                <View style={{ height: 30 }} ></View>
                {/* <Button style={styles.btnStyle} label='Stockist' onPress={this.goToStockist} /> */}
                <View style={{ height: 30 }} ></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.BG_LT_GREEN
        //backgroundColor:'#E7E2C5'
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
    },
    text: { fontSize: 25 },
    padding: { padding: 10 },
    btnStyle: { width: "80%" }
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