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
            post: '',
            data: []
        };
        this.onDateChange = this.onDateChange.bind(this);
        //this.storeItem = this.storeItem.bind(this);
        //this.getMyValue = this.getMyValue.bind(this);
    }
    onDateChange(date) {
        this.setState({ selectedStartDate: date })
    }

    getDataFromStorage = async () =>{
        let keys = ['01','02','03','04','05','06','07','08','09','10'];
        //if (this.state.data.length > 1)
        //this.setState({data: []});
        AsyncStorage.multiGet(keys,(err,stores) => {
            stores.map((result,i,store) => {
                let key = store[i][0];
                let value = store[i][1];
                let multiget = result;
                //console.log('result ',result);
                //console.log('key, value ',key,value);
                //let data = [];
                this.state.data.push(multiget);
            })
        })
        console.log('length of data ',this.state.data.length);
        console.log(this.state.data);
    }
    storeItem = async (key, item) => {
        try{
          var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
          return jsonOfItem;
        }
        catch(error){
          console.log('Storing error '+ error)
        }
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


    // getMyValue = async () => {
    //     //for (let i=0; i < 9; i++){
    //     try {
    //         //var value = await AsyncStorage.getItem('0'+i.toString);
    //         var value = await AsyncStorage.getItem('01');
    //         console.log(value);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // //}
    //     //return value;

    // }


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
                    onPress={() => this.getDataFromStorage()}
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