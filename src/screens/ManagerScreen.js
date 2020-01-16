import React, { Component } from "react";
import { View,Text,StyleSheet, TouchableWithoutFeedback, Dimensions, ImageBackground} from "react-native";
import Header from '../components/Header';

import colors from '../config/colors';

const width = Dimensions.get('screen').width - 50;

class ManagerScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            tokenID: props.token
        }
        
    }
  
    showDCR = () => {
        this.props.navigation.navigate('DcrList',{
            token : this.state.tokenID
        });
    }

    showRep = () => {
        this.props.navigation.navigate('RepList',{
            token: this.state.tokenID
        });
    }

    showTP = () => {
        this.props.navigation.navigate('TourPlan')
        //this.props.navigation.navigate('MgrTp');
    }

    render() {
        return (
            <View style={styles.container}>
                <Header  onPress={() => this.props.navigation.openDrawer()} /> 
                <View style={{marginVertical: 10}}></View>

                <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback  onPress={this.showDCR}>
                <ImageBackground source={require('../assets/doctor-logo.jpg')} imageStyle={{ borderRadius: 20 }} style={styles.btnContainer}>
                    <View style={styles.textImage}>
                        <Text style={styles.imageText}>APPROVE DCR</Text>
                    </View>
                </ImageBackground>
                </TouchableWithoutFeedback>
                </View>

                <View style={{marginVertical: 20}}></View>

                <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback  onPress={this.showRep}>
                <ImageBackground source={require('../assets/doctor-logo.jpg')} imageStyle={{ borderRadius: 20 }} style={styles.btnContainer}>
                    <View style={styles.textImage}>
                        <Text style={styles.imageText}>SHOW REPS</Text>
                    </View>
                </ImageBackground>
                </TouchableWithoutFeedback>
                </View>

                <View style={{marginVertical: 20}}></View>

                <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback  onPress={this.showTP}>
                <ImageBackground source={require('../assets/doctor-logo.jpg')} imageStyle={{ borderRadius: 20 }} style={styles.btnContainer}>
                    <View style={styles.textImage}>
                        <Text style={styles.imageText}>SET TP</Text>
                    </View>
                </ImageBackground>
                </TouchableWithoutFeedback>
                </View>

                {/* <View style={styles.buttonContainer}>
                    
                <TouchableWithoutFeedback  onPress={this.showDCR}>
                    <Text style={styles.textStyle}>Approve Pending DCR</Text>
                </TouchableWithoutFeedback >

                </View> */}

                {/* <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={this.showRep} >
                    <Text style={styles.textStyle}>Show Reps</Text>
                </TouchableWithoutFeedback>
                </View>
                <View style={{paddingVertical: 20}}></View>

                <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={this.showTP} >
                    <Text style={styles.textStyle}>View TP</Text>
                </TouchableWithoutFeedback>
                </View> */}
            </View>
        );
    }
}
export default ManagerScreen;

const styles = StyleSheet.create({
    container: {
        //height: 700,
        //marginTop: 70,
        padding:100,
        flex: 1,
        backgroundColor: colors.BG_LOGIN,
    },
    buttonContainer: {
        height: 150,
        backgroundColor: colors.GREY_ICON,
        //padding:30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    alignJustify: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 18
    },
    btnContainer: {
        height: 150,
        width: width - 50,
        borderRadius: 10,
    },
    textImage: { 
        position: 'absolute', 
        top: "65%", 
        left: 10, 
        right: 20, 
        bottom: 0,
        paddingLeft: 10
        //justifyContent: 'center', 
        //alignItems: 'center' 
    },
    imageText:{
        fontSize: 22,
        fontWeight: '700',
        fontFamily: 'Foundation',
        color: '#3d3d3d'
    }
});