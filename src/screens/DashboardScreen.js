import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, Image, ImageBackground } from 'react-native';
import { StatusBar } from 'react-native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import * as api from '../config/api';
import RepDisplay from './RepDisplay';
import ManagerScreen from './ManagerScreen';

import colors from "../config/colors";



const width = Dimensions.get('screen').width - 50;
const ZERO = "0";
class DashboardScreen extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        tokenId: '',
        userType: 0
    }


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
    componentDidMount() {
        this.getToken();
    }

    getToken = async () => {
        try {
            let token = await AsyncStorage.getItem(api.TOKEN);
            let userType = await AsyncStorage.getItem(api.USER_TYPE)
            this.setState({ tokenId: token, userType: userType });
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const RepView = <RepDisplay token={this.state.tokenId} navigation={this.props.navigation} />
        const ManagerView = <ManagerScreen token={this.state.tokenId} navigation={this.props.navigation} />
        return (

            <ImageBackground
                    source={require('../assets/healthcare.jpg')}
                    style={styles.backgroundContainer}
                >
                    <Header heading='Dashboard' onPress={() => this.props.navigation.openDrawer()} />
            <View style={styles.container}>
                <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.BG_LOGIN} />

                {this.state.userType === ZERO ? RepView : ManagerView}
            </View>
             </ImageBackground>  
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BG_LOGIN,
        flex: 1,
    },
    backgroundContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000'

    },

});

export default DashboardScreen;

