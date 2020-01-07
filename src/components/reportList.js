import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";
import colors from '../config/colors';

const screenWidth = Dimensions.get('screen').width - 30;

const ReportList = (props) => (
    
        <View style={styles.miniContainer}>
            <View style={styles.labelContainer}><Text style={styles.label}>{props.label + ':'}</Text></View>
            <View style={styles.hp}></View>
            <View style={styles.reportContainer}><Text style={styles.report}>{props.value} </Text></View>
            <View style={styles.hp}></View>
        </View>
    
)
export default ReportList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    miniContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    labelContainer: {
        paddingLeft: 10,
        paddingTop: 7
    },
    report: {
        fontSize: 18,
        color: colors.WHITE
    },
    reportContainer: {
        padding: 5,
        width: screenWidth - 100,
    },
    miniContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    hp: {
        paddingHorizontal: 5
    },
    label: {
        fontSize: 17,
        color: colors.BT_ORANGE,
        //textDecorationLine: 'underline'
    },
});