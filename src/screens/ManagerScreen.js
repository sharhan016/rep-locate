import React, { Component } from "react";
import { View,Text,StyleSheet, TouchableWithoutFeedback} from "react-native";
import colors from '../config/colors';

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
        this.props.navigation.navigate('RepList');
    }

    showTP = () => {
        this.props.navigation.navigate('MgrTp');
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.buttonContainer}>
                    
                <TouchableWithoutFeedback  onPress={this.showDCR}>
                    <Text style={styles.textStyle}>Approve Pending DCR</Text>
                </TouchableWithoutFeedback >

                </View>
                <View style={{paddingVertical: 20}}></View>
                <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={this.showRep} >
                    <Text style={styles.textStyle}>Show Reps</Text>
                </TouchableWithoutFeedback>
                </View>
                <View style={{paddingVertical: 20}}></View>

                <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={this.showTP} >
                    <Text style={styles.textStyle}>View TP</Text>
                </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}
export default ManagerScreen;

const styles = StyleSheet.create({
    container: {
        height: 600,
        marginTop: 70,
        padding:10,
        //flex: 1,
        backgroundColor: colors.BG_LOGIN,
    },
    buttonContainer: {
        height: 150,
        backgroundColor: colors.GREY_ICON,
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
    }
});