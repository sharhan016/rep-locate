import React, { Component } from "react";
import { View,Text,StyleSheet} from "react-native";

class Submit extends Component {
    render() {
        
        return (
            <View style={styles.container}>
                <Text>Submit</Text>
            </View>
        );
    }
}
export default Submit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});