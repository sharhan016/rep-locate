import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import TPScreen from './TPScreen' ;
import Button from '../components/Button';

import colors from "../config/colors";


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
        // this.props.navigation.navigate('DCR', {
        //     id: '02',
        // });
        this.props.navigation.navigate('TP');
    }

    goToStockist = () => {
        this.props.navigation.navigate('DCR', {
            id: '03',
        });
    }

    render() {
        return (
            
            <View style={styles.container}>
                <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#324192"/>
                <Button style={styles.btnStyle} label='Doctor' onPress={this.goToDoctor} />
                <View style={{ height: 30 }} ></View>
                <Button style={styles.btnStyle} label='Chemist' onPress={this.goToChemist} />
                <View style={{ height: 30 }} ></View>
                <Button style={styles.btnStyle} label='Stockist' onPress={this.goToStockist} />
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
        backgroundColor: colors.WHITE
        //backgroundColor:'#E7E2C5'
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