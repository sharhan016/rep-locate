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
                    <Text style={{textAlign: 'center'}}>Approve Pending DCR</Text>
                </TouchableWithoutFeedback >
                </View>
                <View style={{paddingVertical: 20}}></View>
                <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={this.showRep} >
                    <Text>Show Reps</Text>
                </TouchableWithoutFeedback>
                </View>
                <View style={{paddingVertical: 20}}></View>

                <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={this.showTP} >
                    <Text>View TP</Text>
                </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}
export default ManagerScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BG_LOGIN
        //flex: 1
    },
    buttonContainer: {
        height: 150,
        backgroundColor: colors.BG_LT_GREEN,
        alignItems: 'center',
        justifyContent: 'center'
    },
    alignJustify: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});