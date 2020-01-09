import React, { Component } from "react";
import { View,Text,StyleSheet, ImageBackground} from "react-native";
import Header from '../components/HeaderBack';
import colors from '../config/colors';

class ManagerTP extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
          <ImageBackground
          source={require('../assets/healthcare.jpg')}
          style={styles.container}
          >
              <View style={styles.innerContainer}>
                <Header heading='View TP' onPress={() => this.props.navigation.goBack()} />
                
              </View>
          </ImageBackground>  
        );
    }
}
export default ManagerTP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    innerContainer: {
        flex: 1,
        backgroundColor: colors.BG_LOGIN
    }
});