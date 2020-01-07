import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Picker
} from "react-native";

const Picker = (props) => (
    <View style={styles.container}>
        <Text>Picker</Text>
    </View>
    )
export default Picker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});