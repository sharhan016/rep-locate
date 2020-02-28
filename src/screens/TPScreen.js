import React, { Component } from 'react';
import { View, Modal, ImageBackground, TouchableOpacity, Alert, StyleSheet, Dimensions, StatusBar, Text } from 'react-native';
import Header from '../components/Header';
import colors from "../config/colors";
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import { ADD_EVENT, ADD_LEAVE } from '../actions/actionTypes';
import { connect } from 'react-redux';
import * as api from '../config/api';
const axios = require('axios');
import { Form, FormPicker, Picker } from "@99xt/first-born";

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
            chooseBelt: [{ label: 'Choose Belt ', value: 0 }],
            post: '',
            data: [],
            categoryList: [],
            pickerValue: ''
        };
        this.getData();
        this.onDateChange = this.onDateChange.bind(this);

    }
    componentWillUnmount() {
        this.setModalVisible(!this.state.modalVisible);
    }
    getData = async () => {
        var temp = [];
        try {
            const res = await axios.post(api.BELT_API, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            });
            let responseJSON = res.data.BeltList;
            var len = responseJSON.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    var data = responseJSON[i];
                    var joined = { label: data.BeltName, value: data.BeltName, id: data.BeltID };
                    temp.push(joined);
                }
            }
            this.setState({
                categoryList: [...this.state.chooseBelt, ...temp]
            });
        } catch (e) {
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

    

    saveEvent() {
        if (this.state.belt === '' && !this.state.holiday) {
            Alert.alert('Please enter belt location');
        }
        this.submit();
    }
    saveLeave() {
        const { selectedStartDate, belt, holiday } = this.state;
        const HOLIDAY = 'Holiday'
        const month = selectedStartDate.format('MMMM');
        const year = selectedStartDate.format('YYYY');
        const date = selectedStartDate.format('D');
        const text = {
            day: date,
            text: HOLIDAY,
            month: month,
            year: year,
        }
        const action = {
            type: ADD_EVENT,
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
        const month = selectedStartDate.format('MMMM');
        const year = selectedStartDate.format('YYYY');
        const date = selectedStartDate.format('D');
        const Date = selectedStartDate ? selectedStartDate.toString().slice(0, 16) : '';
        const text = {
            day: date,
            text: belt,
            month: month,
            year: year,
        }
    
        const action = {
            type: ADD_EVENT,
            payload: text
        };
        this.props.dispatch(action)
        this.clear()


    }

    clear = () => {
        this.setState({
            belt: '',
            selectedStartDate: null
        });
    }




    render() {
        const { categoryList } = this.state;
        let today = moment();
        let day = today.clone();
        //let selectedDates = ['2019-12-26T06:41:26.445Z', '2019-12-27T06:41:26.445Z'];
        //console.log('dates ', day)
        // let customDateStyles = [];
        // for (var i = 0; i < selectedDates.length; i++) {
        //     customDateStyles.push({
        //         date: customDateStyles[i],
        //         style: { backgroundColor: '#1c4f3f' },
        //         textStyle: { color: 'black' }
        //     })
        // }
        const pickBelt = <FormPicker 
        style={styles.pickerContainer}
        onValueChange={value => {
            this.setState({
                belt: value
            })}} 
         selectedValue={this.state.pickerValue} 
         label=" Belt List"  
         data={this.state.categoryList} />
         const picker = <Picker itemStyle={{width: 50}} selectedValue={this.state.pickerValue} onValueChange={value => {
            this.setState({
                belt: value
            })}}  >
             {categoryList.map((dataElement, key) => (
                              <Picker.Item {...dataElement} key={key} />
                          ))}
         </Picker>
       
        return (
            <ImageBackground
                source={require('../assets/calender-image.jpg')}
                style={styles.backgroundContainer}
            >
                <View style={styles.mainContainer}>

                {/* <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.LIGHT_GRAY} /> */}
                    <Header
                        heading='Tour Plan'
                        style={{position: 'absolute', top: 0}}
                        onPress={() => this.props.navigation.openDrawer()} />


                    <View style={styles.customView}>
                        <CalendarPicker
                            minDate={today}
                            //customDatesStyles={customDateStyles}
                            startFromMonday={true}
                            onDateChange={this.onDateChange}
                        />
                    </View>


                    <View style={{ paddingVertical: 10 }}></View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>Select a date to set an event</Text>
                        <View style={{paddingVertical: 3}}></View>
                        <TouchableOpacity onPress={ () => this.props.navigation.navigate('Events')}>
                        <Text style={{fontSize: 18, color: colors.BT_ORANGE, textDecorationLine: 'underline' }}>Already Submitted? Click to view</Text>
                        </TouchableOpacity>
                    </View>


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
                                {picker}
                            

                                <View style={{ marginTop: 10 }}></View>
                                <View style={styles.checkBox}>
                                    <Text style={{ fontSize: 17 }}>Personal Leave</Text>
                                    <View style={{ paddingHorizontal: 30 }}></View>
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


                </View>
            </ImageBackground>
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
    customView: {
        backgroundColor: colors.WHITE,
        marginTop: 15,
        marginLeft: 10,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 10
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
        backgroundColor: colors.STATUS_BAR_BLUE,
        //backgroundColor: colors.ORANGE_TINT,
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
        backgroundColor: colors.BG_LOGIN,
        paddingTop: 50
    },
    backgroundContainer: {
        //flex: 1,
        width: '100%',
        height: '100%',
    },
    bottomBtn: {
        flexDirection: 'row',
        paddingBottom: 4,
        backgroundColor: colors.STATUS_BAR_BLUE,
        //backgroundColor: colors.ORANGE_TINT,
        width: screenWidth,
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: 30,
        borderRadius: 4

    },
    middleContainer: {
        height: 120,
        backgroundColor: colors.WHITE,
        padding: .5,
        flex: 3,
        width: screenWidth,
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    header: {
        alignItems: 'center',
        padding: 2,
        justifyContent: 'center',
        backgroundColor: colors.STATUS_BAR_BLUE,
        //backgroundColor: colors.ORANGE_TINT,
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
        paddingVertical: 2,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
    infoBox: {
        alignItems: 'center',
        marginTop: 15
        //justifyContent: 'flex-start',
        //flex: 1
    },
    infoText: {
        fontSize: 15,
        color: colors.WHITE,
        fontWeight: '300'
    }
});

export default connect()(TPScreen);