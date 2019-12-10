import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import colors from "../config/colors";
import CalendarPicker from 'react-native-calendar-picker';
import DialogInput from 'react-native-dialog-input';
import AsyncStorage from '@react-native-community/async-storage';

class TPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            isAlertVisible: false,
            post: ''
        };
        this.onDateChange = this.onDateChange.bind(this);
        this.storeItem = this.storeItem.bind(this);
        this.getMyValue = this.getMyValue.bind(this);
    }
    onDateChange(date) {
        this.setState({ selectedStartDate: date })
    }


    

    submit(inputText) {
        const { selectedStartDate } = this.state;
        const month = selectedStartDate.format('MMM YYYY');
        const date = selectedStartDate.format('DD');
        const Date = selectedStartDate ? selectedStartDate.toString().slice(0, 16) : '';
        console.log('key ' + date);
        //console.log('month' + month);
        var postData = [{
            "id": date,
            "event": inputText
        }];

        this.storeItem(date, inputText);
        //console.log('StoreData ' +storeData);
        this.setState({ isAlertVisible: false, })
    }
    /*
            getMyValue = async () => {
              //  let i;
               // for(i=00; i < 30; i++){
            try {
              var value = await AsyncStorage.getItem('key');
              console.log(value);
              return value;
            } catch(e) {
                console.log('Storing error '+ e)
            }
          
            //console.log('Done. ' + getMyValue);
          
          } 
    */

    getMyValue = async () => {
        //for (let i=0; i < 9; i++){
        try {
            //var value = await AsyncStorage.getItem('0'+i.toString);
            var value = await AsyncStorage.getItem('01');
            console.log(value);
        } catch (error) {
            console.log(error);
        }
    //}
        //return value;

    }


    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString().slice(0, 16) : '';
        return (
            <View style={styles.body}>

                <CalendarPicker
                    onDateChange={this.onDateChange}
                />
                <Text>{startDate}</Text>

                <Button title="Open" onPress={() => this.setState({ isAlertVisible: true })} />

                <DialogInput isDialogVisible={this.state.isAlertVisible}
                    title={"Event"}
                    message={"Your belt name"}
                    hintInput={"calicut"}
                    submitInput={(inputText) => { this.submit(inputText) }}
                    closeDialog={() => this.setState({ isAlertVisible: false })}>
                </DialogInput>


                <View style={{ height: 30 }} ></View>

                <Button title="Retrieve"
                    onPress={() => this.getMyValue()}
                />
                {/* <View style={{ height: 30 }} ></View>
                <Button title="test"
                    onPress={() => this.getMyValue()}
                />
                <View style={{ height: 30 }} ></View>
                <Button title="temp"
                    onPress={() => this.getMyValue()}
                /> */}


            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: colors.ALMOND
    },
    calenderView: {
        margin: 10,
        padding: 5,
        backgroundColor: colors.SILVER,
        //flex: 1,
        height: 400
    },
    myInput: {
        backgroundColor: 'rgb(232, 232, 232)',
        borderRadius: 30,
        height: 40,
        width: '90%'
    },
});

export default TPScreen;