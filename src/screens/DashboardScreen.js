import React, { Component } from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';
import colors from "../config/colors";

class DashboardScreen extends Component {
    state = {  }
    goToDCR = () => {
        this.props.navigation.navigate('DCR', {
            otherParam: 'DCR',
          });
    }
    goToTP = () => {
        this.props.navigation.navigate('TourPlan', {
            otherParam: 'DCR',
          });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Welcome to Dashboard Seperate
                </Text>
                <View style={{ height: 30 }} ></View>
                <Button title='Submit DCR' onPress={this.goToDCR} />
                <View style={{ height: 30 }} ></View>
                <Button title='Submit TP' onPress={this.goToTP} />
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
    text: {fontSize: 25},
    padding: { padding: 10 }
});

export default DashboardScreen;