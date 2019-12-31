import React, {Component} from "react";
import {View, Text, StyleSheet,Dimensions, TouchableHighlight,Image} from "react-native";
import { StatusBar } from 'react-native';

import colors from "../config/colors";

const width = Dimensions.get('screen').width - 50;



class RepDisplay extends Component {

    goToDoctor = () => {
        this.props.navigation.navigate('DCR', {
            name: 'Doctor',
        });
    }
    goToChemist = () => {
        this.props.navigation.navigate('DCR', {
            name: 'Chemist',
        });
    }
    componentDidMount(){
        console.log('inside repDisplay ',this.props.navigation)
    }

    render() {
        return (
            <View>
            <TouchableHighlight style={styles.btnContainer} onPress={this.goToDoctor}>
                <Image 
                style={styles.image}
                source={require('../assets/doctor-logo.jpg')} />
          
                </TouchableHighlight>
                <View style={{paddingVertical: 30}}></View>
                <TouchableHighlight style={styles.btnContainer} onPress={this.goToChemist}>
                <Image 
                style={styles.image}
                source={require('../assets/doctor-logo.jpg')} />
          
                </TouchableHighlight>

                </View>
        );
    }
}
         
    
export default RepDisplay;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.BG_LOGIN
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





