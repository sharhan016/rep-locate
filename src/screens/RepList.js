import React, { Component } from "react";
import { View,Text,StyleSheet} from "react-native";

class RepList extends Component {
    static navigationOptions = {
        title: 'Rep List'
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>RepList</Text>
            </View>
        );
    }
}
export default RepList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});