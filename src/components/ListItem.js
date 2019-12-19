import React, { Component } from 'react';
import { View,Text, StyleSheet } from 'react-native';
class ListItem extends Component {

     

    render() {
        {console.log('props in list', this.props.events)}
        return(
            
            <View style={styles.container} >
                <View style={styles.monthView}>
                <Text style={styles.textStyle}> January  {this.props.events.item.date} </Text>
                </View>
                <View style={{paddingHorizontal: 20}}></View>
                <View style={styles.monthView}>
                <Text style={styles.textStyle}> {this.props.events.item.event} </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center'
    },
    monthView: {
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        width: "45%",
        
    }
});

export default ListItem;