import React, { Component } from 'react';
import { View,  Modal, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, } from 'native-base';
import { insertNewEventList } from '../../databases/allSchemas';
import colors from "../config/colors";
import CalendarPicker from 'react-native-calendar-picker';
import { FloatingAction } from "react-native-floating-action";
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import RNPickerSelect from 'react-native-picker-select';
import { DisplayEvents } from "../containers/DisplayEvents";
import EventList from '../components/EventList';
import { addEvent } from '../actions';
import {connect} from 'react-redux';

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
            data: []
        };
        this.onDateChange = this.onDateChange.bind(this);
        //this.storeItem = this.storeItem.bind(this);
        //this.getMyValue = this.getMyValue.bind(this);
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
        console.log('belt and date ',this.state.belt,this.selectedStartDate)
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
        //const { selectedStartDate } = this.state;
        //const startDate = selectedStartDate ? selectedStartDate.toString().slice(0, 16) : '';
        return (
            
            <View style={styles.mainContainer}>
                {/*     Header Starts Here         */}
               <Container> 
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tour Plan</Title>
                    </Body>
                    <Right>
            <Button hasText transparent>
              <Text>Submit</Text>
            </Button>
          </Right>
                </Header>
                {/*     Header Ends Here         */}

                <CalendarPicker
                    onDateChange={this.onDateChange}
                />
                <View style={styles.infoBox}>
                <Text style={styles.infoText}>Select a date to set an event</Text>
                </View>

                <View style={{paddingVertical: 50}}></View>

                {/*     Insert belt here         */}
                {/* <EventList /> */}

                {/* <DisplayEvents /> */}

                {/*              */}
             
    
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
                                    this.setState({ belt: value })
                                }}
                                items={[
                                    { label: 'Calicut', value: 'calicut' },
                                    { label: 'Koyilandi', value: 'koyilandi' },
                                    { label: 'Thalassery', value: 'thalassery' },
                                ]}
                            />
                            <View style={{paddingVertical:15}}></View>
                            <View style={styles.checkBox}>
                                <Text style={{fontSize:17}}>Personal Leave</Text>
                                <View style={{paddingHorizontal:30}}></View>
                                <CheckBox
                                    value={this.state.holiday}
                                    disabled={false}
                                    onValueChange={value => {
                                        this.setState({
                                            holiday: value
                                        })
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
                                    console.log('Picker value ', this.state.belt)
                                    console.log('Holiday value ', this.state.holiday)
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

</Container>
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
        backgroundColor: colors.SKY_BLUE,
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
        backgroundColor: colors.SKY_BLUE,
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
        backgroundColor: colors.SKY_BLUE,
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