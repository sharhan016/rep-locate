import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, Image, ImageBackground, StatusBar } from "react-native";
import Header from '../components/Header';
import moment from 'moment';
import colors from "../config/colors";

const width = Dimensions.get('screen').width - 50;
const height = Dimensions.get('screen').height / 4;



class RepDisplay extends Component {



    goToDoctor = () => {
        this.props.navigation.navigate('DCR', {
            name: 'Doctor',
            type: "D",
            token: this.props.navigation.getParam('token')
        });
    }
    goToChemist = () => {
        this.props.navigation.navigate('DCR', {
            name: 'Chemist',
            type: "C",
            token: this.props.navigation.getParam('token')
        });
    }
    componentDidMount() {
        let today = moment();
        today.format('DD')
    }

    render() {
        return (           
            <View style={styles.container}>
                <View style={{ marginVertical: 20 }}></View>
                <Header  onPress={() => this.props.navigation.openDrawer()} /> 
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableHighlight onPress={this.goToDoctor}>
                <ImageBackground source={require('../assets/doctor-logo.jpg')} imageStyle={{ borderRadius: 20 }} style={styles.btnContainer}>
                    <View style={styles.textImage}>
                        <Text style={styles.imageText}>DOCTOR</Text>
                    </View>
                </ImageBackground>
                </TouchableHighlight>

                <View style={{ marginBottom: 50}}></View>
                <TouchableHighlight style={styles.btnContainer} onPress={this.goToChemist}>
    
                        <ImageBackground source={require('../assets/chemist-logo.jpg')} imageStyle={{ borderRadius: 20 }} style={styles.btnContainer}>
                    <View style={styles.textImage}>
                    <Text style={styles.imageText}>CHEMIST</Text>
                    </View>
                </ImageBackground>

                </TouchableHighlight>

                </View>

                <View style={{ marginBottom: 50}}></View>

            </View>
            // </ImageBackground>
        );
    }
}


export default RepDisplay;

const styles = StyleSheet.create({
    container: {

        padding:100,
        flex: 1,
        backgroundColor: colors.BG_LOGIN,
    },
    btnContainer: {
        height: height,
        width: width,
        borderRadius: 10,
        alignItems: 'center'

    },
    backgroundContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0
    },
    image: {
        width: width,
        height: 200,
        resizeMode: 'stretch',
        borderRadius: 20
    },
    fontStyle: {
        fontSize: 20,
        fontWeight: "500",
        fontStyle: 'italic'
    },
    text: { fontSize: 25 },
    padding: { padding: 10 },
    btnStyle: { width: "80%" },
    textPosition: {
        position: 'absolute'
    },
    textImage: { 
        position: 'absolute', 
        top: "70%", 
        left: 5, 
        right: 20, 
        bottom: 0,
        paddingLeft: 10

    },
    imageText:{
        fontSize: 25,
        fontWeight: '700',
        fontFamily: 'Foundation',
        color: '#3d3d3d',
        marginLeft: 15
    }
});





