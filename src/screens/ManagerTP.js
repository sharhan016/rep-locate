import React, { Component } from "react";
import { View,Text,StyleSheet} from "react-native";

class ManagerTP extends Component {
    static navigationOptions = {
        title: 'View TP'
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>ManagerTP</Text>
            </View>
        );
    }
}
export default ManagerTP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});