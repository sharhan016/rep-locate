import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, PermissionsAndroid, ToastAndroid, ActivityIndicator, ImageBackground, Dimensions } from 'react-native';
import { Form, FormPicker } from "@99xt/first-born";
import { Text, } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../components/Button';
import Header from '../components/HeaderBack';
import Geolocation from '@react-native-community/geolocation';
import RadioForm from 'react-native-simple-radio-button';
import colors from "../config/colors";
import * as api from '../config/api';
const axios = require('axios');
axios.defaults.timeout = 10000

var radio_props = [
    { label: 'Alone     ', value: 0 },
    { label: 'Accompanied By', value: 1 }
];
const screenWidth = Dimensions.get('screen').width;

class DcrPage extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            reportloading: true,
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
            // rep: 1,
            // userType: 'R',
            // expense: '150',
            // isManagerApproved: '0'
        };
        this.getData();

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
        Geolocation.getCurrentPosition(
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                this.setState({ currentLongitude: currentLongitude });
                this.setState({ currentLatitude: currentLatitude, fetching: false });
                this.postMethod();
            },
            (error) => {
                this.setState({reportLoading: false})
                alert(error.message)
            },
            { enableHighAccuracy: true, timeout: 30000}
        );
        
    }

    componentDidMount() {

        this.requestLocationPermission();
        this.getManagerData();
        this.getToken();
    }

    getData = async () => {
        this.setState({loading: true});
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
                categoryList: [...this.state.list, ...temp],
                loading: false
            });
        } catch (e) {
            console.log(e)
        }
        this.getSubdata();
    }

    getSubdata = async (obj) => {
        const USER = this.props.navigation.getParam('type');
        var docs = [];
        if (obj === 0) {
            return this.setState({subCategoryList: this.state.chooseBelt});
        }
        if (!this.state.completeList.length) {
            try {
                if( USER == "D"){
                    const res = await axios.post(api.DOCTOR_API);
                    let response = res.data.DoctorList;
                    this.setState({ completeList: response })
                }else{
                    const res = await axios.post(api.CHEMIST_API);
                    let response = res.data.DoctorList;
                    this.setState({ completeList: response })
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
        var tempMGR = [];
        try {
            const res = await axios.post(api.MANAGER_API);
            let responseJSON = res.data.ManagerList;
            var len = responseJSON.length;
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
        } catch (e) {
            console.log(e)
        }
    }

    getToken = async () => {
        try {
            let token = await AsyncStorage.getItem(api.TOKEN);
            this.setState({tokenId: token});
        } catch (error) {
            console.log(error)
        }
    }



    handleBeltChange = (value) => {
        this.getSubdata(value);
        this.setState({ beltId: value });
    }

    handleSubChange = (value) => {
        if(this.props.navigation.getParam('type') == "D"){
        this.setState({ doctorId: value }); }
        else{
            this.setState({chemistId: value})
        }
    }

    handleTextChange = (value) => {
        this.setState({ feedback: value });
    }

    // handleButtonClick = (value) => {
    //     console.log(value)
    // }

    handleValueChange = (value) => {
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
        this.setState({reportLoading: true});
        this.getLatLng();

    }

    postMethod = async () => {
        const { rep, beltId, doctorId, chemistId, companion, managerId, feedback, userType, expense, isManagerApproved,currentLatitude,currentLongitude } = this.state;
        let location = currentLatitude +' '+ currentLongitude
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
                if (res.status == 200)
                    ToastAndroid.show(res.data.Message, ToastAndroid.LONG);
                    this.setState({ reportLoading: false })
            }).catch(error => {
                    this.setState({ reportLoading: false })
                    ToastAndroid.show(error, ToastAndroid.SHORT);
                })
       
        this.setState({reportloading: false});
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
        const Indicator = <ActivityIndicator 
        animating = {this.state.loading} 
        color = {colors.HEADER_BLUE} 
        size = "large" style = {styles.activityIndicator}/>
        const progress = <ActivityIndicator 
        animating = {this.state.reportloading} 
        style={{marginTop: 40}}  
        color = {colors.WHITE} size = "large" />

        return (
            <ImageBackground
            source={require('../assets/report-image.jpg')}
            style={styles.backgroundContainer}
        >
                <ScrollView style={styles.container}>
                <Header 
                heading='DCR'
                onPress={() => this.props.navigation.goBack()}
                />
                    {/* <View style={{height: 20}}></View> */}
                    
                        {this.state.loading ? Indicator : 
                        <View style={styles.formContainer} > 
                        <Form 
                        color='white'
                        formElements={formElements} /> 
                        <View style={styles.radioContainer}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                buttonSize={10}
                                labelColor={colors.INPUT_LABEL}
                                buttonOuterSize={18}
                                selectedLabelColor='#ff971db8'
                                formHorizontal={true}
                                animation={false}
                                buttonColor={colors.INPUT_LABEL}
                                selectedButtonColor='#ff971db8'
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
                        <View style={{ width: "80%" }}>
                            {this.state.isAccompanied ? pickManager : null}
                        </View>
                        <View style={styles.btnContainer}>
             
                    </View>
                    </View>}

                    {this.state.loading ? null : this.state.reportLoading ? progress : <View style={styles.formContainer}><Button 
                        style={styles.btnSubmit}
                        onPress={this.checkEmpty} 
                        label='Submit Report'/></View> }
                    
                    
                    

                    
                    </ScrollView>
                    </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BG_LOGIN,
        flex: 1

    },
    formContainer: {
        width: '95%',
        alignItems: 'center',
        padding: 10,
        marginTop: 50,
        marginLeft: 10,
        height: '70%',
        paddingBottom: 15
    },
    scrollView: {
        flex: 1,
      },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    radioContainer: {
        marginTop: 20,
        // paddingVertical: 30
    },
    activityIndicator: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        marginTop: 30
     },
     backgroundContainer: {
        width: '100%',
        height: '100%',

    },
    btnSubmit: {
        width: screenWidth - 95,
        height: 40,
        borderRadius: 25,
        backgroundColor: colors.BT_ORANGE,
        justifyContent: 'center',
        marginTop: 10,
    },
});

export default DcrPage;