import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, PermissionsAndroid, ToastAndroid, ActivityIndicator } from 'react-native';
import { Form, FormPicker } from "@99xt/first-born";
import { Text, } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../components/Button';
import Geolocation from '@react-native-community/geolocation';
import RadioForm from 'react-native-simple-radio-button';
import colors from "../config/colors";
import * as api from '../config/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Colors } from 'react-native/Libraries/NewAppScreen';
const axios = require('axios');

var radio_props = [
    { label: 'Alone  ', value: 0 },
    { label: 'Accompanied By', value: 1 }
];

class DcrPage extends Component {
    static navigationOptions = {
        title: 'DCR',
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pickerData: [{
                label: 'Calicut',
                value: 'clt'
            },
            {
                label: 'Thalassery',
                value: 'tly'
            }],
            value: '',
            beltId: '',
            doctorId: null,
            chemistId: null,
            feedback: '',
            managerId: null,
            height: 400,
            isAccompanied: false,
            companion: 0,
            pickerValue: '',
            completeList: [],
            categoryList: [],
            list: [{ label: 'Select Belt', value: 0 }],
            chooseBelt: [{ label: 'Choose Belt First', value: 0 }],
            chooseDoctor: [{ label: 'Choose a person', value: 0}],
            chooseManager: [{ label: 'Select Manager', value: 0}],
            subCategoryList: [],
            managerList: [],
            granted: false,
            fetching: false,
            currentLongitude: '',
            currentLatitude: '',
            tokenId: '',
            //// temp values:
            rep: 1,
            userType: 'R',
            expense: '150',
            isManagerApproved: '0'
        };
        this.getData();
        console.log('Here in Constructor')

        //this.getData = this.getData.bind(this);

    }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                'title': 'Location Access Required',
                'message': 'This App needs to Access your location'
            }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
                //that.callLocation(that);
                this.setState({ granted: true });
            } else {
                alert("Permission Denied");
            }
        } catch (err) {
            alert("err", err);
            console.warn(err)
        }
    }

    getLatLng = () => {
        this.setState({loading: true});
        ToastAndroid.show("Getting Location Please Wait..", ToastAndroid.SHORT);
        Geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                this.setState({ currentLongitude: currentLongitude });
                this.setState({ currentLatitude: currentLatitude, fetching: false });
                this.postMethod();
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        
    }

    componentDidMount() {

        this.requestLocationPermission();
        this.getManagerData();
        this.getToken();
    }

    getData = async () => {
        console.log('inside getdata')
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
                    var joined = { label: data.BeltName, value: data.BeltID };
                    temp.push(joined);
                }
            }
            this.setState({
                categoryList: [...this.state.list, ...temp]
            });
        } catch (e) {
            console.log(e)
        }
    }

    getSubdata = async (obj) => {
        const USER = this.props.navigation.getParam('type');
        var docs = [];
        if (obj === 0) {
            console.log('NOTHING IS SELECTED ', obj)
            return this.setState({subCategoryList: this.state.chooseBelt});
        }
        if (!this.state.completeList.length) {
            try {
                if( USER == "D"){
                    const res = await axios.post(api.DOCTOR_API);
                    console.log('data inside subCategory', res)
                    let response = res.data.DoctorList;
                    this.setState({ completeList: response })
                    console.log('Moment of truth in DOCTOR ',this.state.completeList)
                }else{
                    const res = await axios.post(api.CHEMIST_API);
                    console.log('data inside subCategory', res.data.DoctorList)
                    let response = res.data.DoctorList;
                    this.setState({ completeList: response })
                    console.log('Moment of truth in CHEMIST ',this.state.completeList)
                }
            }
            catch (e) {
                console.log(e)
            }

        }
        if(USER == "D"){
            var len = this.state.completeList.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                var data = this.state.completeList[i];
                if (data.DoctorBelt === obj) {  
                    var join = { label: data.DoctorName, value: data.DoctorID };
                    docs.push(join);
                }
            }
        }
        return this.setState({
            subCategoryList: [...this.state.chooseDoctor, ...docs]
        });
        }
        else{
            var len = this.state.completeList.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                var data = this.state.completeList[i];
                if (data.ChemistBelt === obj) {  
                    var join = { label: data.ChemistName, value: data.ChemistID };
                    docs.push(join);
                }
            }
        }
        this.setState({
            subCategoryList: [...this.state.chooseDoctor, ...docs]
        });
        }
        
    }

    getManagerData = async () => {
        console.log('inside ManagerData')
        var tempMGR = [];
        try {
            const res = await axios.post(api.MANAGER_API);
            let responseJSON = res.data.ManagerList;
            var len = responseJSON.length;
            console.log('LENGTH OF MANAGER DATA ',len)
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    var data = responseJSON[i];
                    var joined = { label: data.ManagerName, value: data.ManagerID };
                    tempMGR.push(joined);
                }
            }
            this.setState({
                managerList: [...this.state.chooseManager, ...tempMGR]
            });
            console.log('MANAGER LIST ',this.state.managerList)
        } catch (e) {
            console.log(e)
        }
    }

    getToken = async () => {
        try {
            let token = await AsyncStorage.getItem(api.TOKEN);
            this.setState({tokenId: token});
            console.log("token in DCR PAGE ",token)
        } catch (error) {
            console.log(error)
        }
    }



    handleBeltChange = (value) => {
        var docs = [];
        console.log('value before axios in BeltChange ', value)
        const obj = {
            BeltID: value
        };
        this.getSubdata(value);
        this.setState({ beltId: value });
    }

    handleSubChange = (value) => {
        console.log('inside picker handleSubChange', value)
        if(this.props.navigation.getParam('type') == "D"){
            console.log('inside DOCTOR')
        this.setState({ doctorId: value }); }
        else{
            console.log('inside CHEMIST')
            this.setState({chemistId: value})
        }
    }

    handleTextChange = (value) => {
        this.setState({ feedback: value });
    }

    handleButtonClick = (value) => {
        console.log(value)
    }

    handleValueChange = (value) => {
        console.log('alone or accompanied ', value)
        this.setState({managerId: value});
    }
    checkEmpty = () => {
        const { beltId, doctorId, chemistId, feedback,} = this.state;
        if (beltId != 0) {
            if (doctorId != 0 || chemistId != 0) {
                if(feedback != ''){
                }else{
                    return ToastAndroid.show("Enter Feedback", ToastAndroid.SHORT);
                }
            } else { 
                return ToastAndroid.show("Choose Doctor or Chemist", ToastAndroid.SHORT);
            }
        } else {
            return ToastAndroid.show("Choose Belt", ToastAndroid.SHORT);
        }
        this.getLatLng();

    }

    postMethod = async () => {
        const { rep, beltId, doctorId, chemistId, companion, managerId, feedback, userType, expense, isManagerApproved,currentLatitude,currentLongitude } = this.state;
        let location = currentLatitude +' '+ currentLongitude
        // console.log('REP= ',rep) // not needed
        // console.log('BeltID= ',beltId)
        // console.log('DoctorID= ',doctorId)
        // console.log('ChemistID= ',chemistId)
        // console.log('IsAccompanied= ',companion)
        // console.log('ManagerID= ',managerId)
        // console.log('Feedback= ',feedback)
        // console.log('VisitedUserType= ',this.props.navigation.getParam('type', 'D'))
        // console.log('Expense= ',expense)
        // console.log('Location= ',location)
        // console.log('IsManagerApproved= ',isManagerApproved)
        // console.log('Token= ',this.state.tokenId)
        
                await axios.post(api.SUBMIT_DCR_API, {
                APIToken: this.state.tokenId,
                Belt: beltId,
                VisitedUserType: this.props.navigation.getParam('type', 'D'),
                Doctor: doctorId,
                Chemist: chemistId,
                IsAccompanied: companion,
                Manager: managerId,
                Feedback: feedback, // will be REMOVED
                isManagerApproved: isManagerApproved,
                Location: location
            }).then(res => {
                console.log('response ', res)
                if (res.status == 200)
                    ToastAndroid.show(res.data.Message, ToastAndroid.LONG);
                    this.setState({ loading: false })
            }).catch(error => {
                    this.setState({ loading: false })
                    ToastAndroid.show(error, ToastAndroid.SHORT);
                })
       
        this.setState({loading: false});
        this.props.navigation.navigate('Dashboard')
    }

    render() {
        const pickManager = <FormPicker 
        style={{ marginTop: 20, width: "100%" }}
         onValueChange={this.handleValueChange} 
         selectedValue={this.state.pickerValue} 
         label="Managers"  
         data={this.state.managerList} />

        formElements = [
            {
                label: "Choose Belt",
                type: "picker",
                onValueChange: (value) => this.handleBeltChange(value),
                pickerData: this.state.categoryList
            },
            {
                label: "Choose " + this.props.navigation.getParam('name', 'wait'),
                type: "picker",
                onValueChange: (value) => this.handleSubChange(value),
                pickerData: this.state.subCategoryList
            },
            {
                label: "Feedback",
                type: "textarea",
                onChangeText: (value) => this.handleTextChange(value)
            },
        ];
        const Indicator = <ActivityIndicator animating = {this.state.loading} color = {colors.HEADER_BLUE} size = "large" style = {styles.activityIndicator}/>
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    {/* <View style={{ paddingVertical: 15 }}></View> */}
                    <View style={styles.formContainer} >
                        <Form formElements={formElements} />
                        <View style={styles.radioContainer}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                formHorizontal={true}
                                animation={false}
                                buttonColor={colors.MISCHKA}
                                selectedButtonColor={colors.GREENISH}
                                onPress={(value) => {
                                    if (value == 1) {
                                        this.setState({
                                            value: value,
                                            isAccompanied: true,
                                            companion: 1,
                                            height: 550
                                        })
                                    } else {
                                        this.setState({
                                            value: value,
                                            isAccompanied: false,
                                            companion: 0,
                                            height: 500
                                        })
                                    }
                                }}
                            />
                        </View>
                        {/* <View style={{ paddingVertical: 10 }}></View> */}
                        <View style={{ width: "80%" }}>
                            {this.state.isAccompanied ? pickManager : null}
                        </View>
                    </View>
                    <View style={{ paddingVertical: 5 }}></View>
                    <View style={styles.btnContainer}>
                        {this.state.loading ? Indicator : <Button 
                        style={{ width: "50%" }}
                        onPress={this.checkEmpty} 
                        label='Submit Report'/>}
             
                    </View>

                </View>
            </KeyboardAwareScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start', 
        paddingTop: 15
        //flex: 2
    },
    formContainer: {
        alignItems: 'center',
        padding: 10,
        //height: 600
        //height: !this.state.isAccompanied ? 500 : 600
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    radioContainer: {
        marginTop: 20,
        // paddingVertical: 30
    }
});

export default DcrPage;