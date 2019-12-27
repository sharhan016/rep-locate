import React, { Component } from 'react';
import { View,  Modal, TouchableOpacity, Alert, StyleSheet, Dimensions,StatusBar,Text } from 'react-native';
//import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, } from 'native-base';
import Header from '../components/Header';
import colors from "../config/colors";
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { FloatingAction } from "react-native-floating-action";
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DisplayEvents } from "../containers/DisplayEvents";
import EventList from '../components/EventList';
import { addEvent } from '../actions';
import {connect} from 'react-redux';
import * as api from '../config/api';
const axios = require('axios');

const screenHeight = Dimensions.get('screen').height / 3;
const screenWidth = Dimensions.get('screen').width - 25;

class TPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            modalVisible: false,
            holiday: false,
            belt: '',
            active: false,
            placeholder: {
                label: 'Choose Belt',
                value: null,
                color: '#9EA0A4',
            },
            visible: false,
            post: '',
            data: [],
            categoryList:[],
        };
        this.getData();
        this.onDateChange = this.onDateChange.bind(this);
        //this.storeItem = this.storeItem.bind(this);
        //this.getMyValue = this.getMyValue.bind(this);
    }
    componentWillUnmount(){
        this.setModalVisible(!this.state.modalVisible);
    }
    getData = async () => {
        //console.log('inside getdata')
        var temp = [];
        try {
        const res = await axios.post(api.BELT_API,{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
        });
        console.log('axio data inside getData ',res.data.BeltList)
        let responseJSON = res.data.BeltList;
        var len = responseJSON.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              var data = responseJSON[i];
              var joined = { label: data.BeltName,value: data.BeltName,id: data.BeltID};
              temp.push(joined);
            }
          }
          //console.log('catelgory List Data=',JSON.stringify(temp));
          this.setState({
            categoryList: temp
          });
       }catch(e){
       console.log(e)
       }
    }
    onDateChange(date) {
        this.setState({ 
            selectedStartDate: date,
            modalVisible: true
        })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    getDataFromStorage = async () => {
        let keys = ['01', '02', '03'];
        //if (this.state.data.length > 1)
        //this.setState({data: []});
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
                let key = store[i][0];
                let value = store[i][1];
                let multiget = result;
                //let data = [];
                this.state.data.push(multiget);
            })
        })
        console.log('length of data ', this.state.data.length);
        console.log(this.state.data);
    }
    
    saveEvent() {
        if(this.state.belt === '' && !this.state.holiday){
            Alert.alert('Please enter belt location');
    }
        this.submit();
    }
    saveLeave() {
        const { selectedStartDate, belt, holiday } = this.state;
        const date = selectedStartDate.format('DD');
        const text = {
            day: date,
            text: 'Holiday'
        }
        const action = {
            type: 'ADD_LEAVE',
            payload: text
        };
        this.props.dispatch(action);
        this.setState({
            holiday: false,
            selectedStartDate: null,
        });
    }

    submit() {
        const { selectedStartDate, belt } = this.state;
        const month = selectedStartDate.format('MMM YYYY');
        const date = selectedStartDate.format('DD');
        const Date = selectedStartDate ? selectedStartDate.toString().slice(0, 16) : '';
        const text = {
            day: date,
            text: belt
        }
        const action = {
            type: 'ADD_EVENT',
            payload: text
        };
        this.props.dispatch(action)
        //this.props.dispatch({ type: 'ADD_EVENT', text });
        // this.props.dispatch(addEvent,text)
        this.clear()
    
 
    }

    clear = () => {
        this.setState({
            belt: '',
            selectedStartDate: null
        });
        //console.log('belt and date ',this.state.belt,this.selectedStartDate)
    }

    // storeItem = async (key, item) => {

    //     try {
    //         var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    //         return jsonOfItem;
    //     }
    //     catch (error) {
    //         console.log('Storing error ' + error)
    //     }
    
    // }




    render() {
            let today = moment();
            let day = today.clone();
            let selectedDates = ['2019-12-26T06:41:26.445Z', '2019-12-27T06:41:26.445Z'];
            //console.log('dates ', day)
            let customDateStyles = [];
            for (var i=0; i < selectedDates.length;i++){
                customDateStyles.push({
                    date: customDateStyles[i],
                    style: {backgroundColor: '#1c4f3f'},
                    textStyle: { color: 'black' }
                })
            }
          /*
            2019-12-23T06:41:26.445Z
            let today = moment();
            let day = today.clone().startOf('month');
            let customDatesStyles = [];
            while(day.add(1, 'day').isSame(today, 'month')) {
            customDatesStyles.push({
                date: day.clone(),
                // Random colors
                style: {backgroundColor: '#'+('#00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)},
                textStyle: {color: 'black'}, // sets the font color
                containerStyle: [], // extra styling for day container
            });
            }
            
            render() {
            return (
                <CalendarPicker
                todayTextStyle={{fontWeight: 'bold'}}
                todayBackgroundColor={'transparent'}
                customDatesStyles={customDatesStyles}
                minDate={today}
                />
            );
            }


          */
        return (
            
            <View style={styles.mainContainer}>
        
                <StatusBar barStyle = "light-content" hidden = {false} backgroundColor={colors.STATUS_BAR_GRN}/>
                <Header 
                heading='Tour Plan'
                onPress={() => this.props.navigation.openDrawer() } />
              

                <CalendarPicker
                    //minDate={today}
                    //customDatesStyles={customDateStyles}
                    startFromMonday={true}
                    onDateChange={this.onDateChange}
                />
                <View style={styles.infoBox}>
                <Text style={styles.infoText}>Select a date to set an event</Text>
                </View>

                <View style={{paddingVertical: 50}}></View>

    
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View style={styles.container}>
                        {/* <View> */}
                        <View style={styles.header}>
                            <Text style={styles.textStyle}>Choose your Belt</Text>
                        </View>
                        <View style={styles.middleContainer}>
                            <RNPickerSelect
                                style={styles.pickerContainer}
                                placeholder={this.state.placeholder}
                                placeholderTextColor={colors.BLACK}
                                onValueChange={value => {
                                    this.setState({
                                        belt: value
                                    })
                                    //console.log('value of belt ',this.state.belt)
                                    // this.setModalVisible(!this.state.modalVisible);
                                    // this.submit();
                                }}
                                items={this.state.categoryList}
                            />
                            <View style={{paddingVertical:15}}></View>
                            <View style={styles.checkBox}>
                                <Text style={{fontSize:17}}>Personal Leave</Text>
                                <View style={{paddingHorizontal:30}}></View>
                                <CheckBox
                                    value={this.state.holiday}
                                    disabled={false}
                                    onValueChange={value => {
                                        
                                       
                                        this.saveLeave();
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.bottomBtn}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                   // console.log('Picker value ', this.state.belt)
                                   // console.log('Holiday value ', this.state.holiday)
                                    this.saveEvent();
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text style={styles.textStyle}>Submit</Text>
                            </TouchableOpacity>

                            {/* </View> */}
                        </View>
                    </View>
                </Modal>



                <View style={{ height: 30 }} ></View>

{/* </Container> */}
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        //backgroundColor: colors.DODGER_BLUE
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
    container: {
        marginTop: screenHeight,
        padding: 2,
        margin: 10,
        backgroundColor: colors.ORANGE_TINT,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 200,
        // borderColor: colors.BLACK,
        borderWidth: 1,
        borderRadius: 7
    },
    textStyle: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.WHITE
    },
    mainContainer: {
        //alignItems: 'center',
        //justifyContent: 'center',
        flex: 1,
        backgroundColor: colors.WHITE
    },
    bottomBtn: {
        flexDirection: 'row',
        paddingBottom: 4,
        backgroundColor: colors.ORANGE_TINT,
        width: screenWidth,
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: 30,
        borderRadius: 4

    },
    middleContainer: {
        height: 120,
        backgroundColor: colors.WHITE,
        padding: 1,
        flex: 2,
        width: screenWidth,
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    header: {
        alignItems: 'center',
        padding: 2,
        justifyContent: 'center',
        backgroundColor: colors.ORANGE_TINT,
        width: screenWidth,
        paddingBottom: 10,
        borderRadius: 3
    },
    checkBox: {
        width: screenWidth,
        flexDirection: "row",
        marginLeft: 10,

        //backgroundColor: colors.SILVER,
        //justifyContent: 'space-evenly'

    },
    pickerContainer: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
    infoBox: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1
    },
    infoText: {
        fontSize: 18,
        fontWeight: '300'
    }
});

export default connect()(TPScreen);