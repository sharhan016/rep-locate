import React, { Component } from 'react';
import { View, StyleSheet,ScrollView ,PermissionsAndroid,ToastAndroid } from 'react-native';
import { Form, FormPicker } from "@99xt/first-born";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, } from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import RadioForm from 'react-native-simple-radio-button';
import colors from "../config/colors";
import * as api from '../config/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
            pickerValue: '',
            completeList: [],
            categoryList:[],
            subCategoryList:[],
            granted: false,
            fetching: false,
            currentLongitude: '',
            currentLatitude: '',
            //// temp values:
            rep: 1, 
            userType: 'R',
            expense: '150',
            location: '',
            isManagerApproved: '0'
        };
        this.getData();
        console.log('Here in Constructor')
        
        //this.getData = this.getData.bind(this);

    }

    requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
              'title': 'Location Access Required',
              'message': 'This App needs to Access your location'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            //that.callLocation(that);
            this.setState({granted: true});
          } else {
            alert("Permission Denied");
          }
        } catch (err) {
          alert("err",err);
          console.warn(err)
        }
      }

      getLatLng(that){
        ToastAndroid.show("Getting Location", ToastAndroid.SHORT);
        Geolocation.getCurrentPosition(
             (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);
                that.setState({ currentLongitude:currentLongitude });
                that.setState({ currentLatitude:currentLatitude , fetching: false});
             },
             (error) => alert(error.message),
             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
          console.log(this.state.currentLatitude , this.state.currentLongitude)
       }

    componentDidMount () { 
          
          this.requestLocationPermission();
          this.getData();
       }

    getData = async () => {
        console.log('inside getdata')
        var temp = [];
        try {
        const res = await axios.post(api.BELT_API,{
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
              var joined = { label: data.BeltName,value: data.BeltID};
              temp.push(joined);
            }
          }
          this.setState({
            categoryList: temp
          });
       }catch(e){
       console.log(e)
       }
    }

    getSubdata = async ( obj ) => {
        var docs = [];
        if(!this.state.completeList.length){
            try {
                const res = await axios.post(api.DOCTOR_API);
                console.log('data inside subCategory',res.data.DoctorList)
                let response = res.data.DoctorList;
                this.setState({completeList: response})
            }
                catch(e){
                    console.log(e)
                    }
                }
                var len = this.state.completeList.length;
                  if (len > 0) {
                    for (let i = 0; i < len; i++) {
                      var data = this.state.completeList[i];
                      if(data.DoctorBelt === obj){
                        var join = { label: data.DoctorName,value: data.DoctorID};
                        docs.push(join);
                      }
                    //   else{
                    //       docs = [];
                    //   }
                    }
                  }
                  this.setState({
                    subCategoryList: docs
                  });
               }
        
  


    handleBeltChange = (value) => {
        var docs = [];
        console.log('value before axios ',value)
        const obj = { 
            BeltID: value
         };
         this.getSubdata(value);
         this.setState({beltId: value});
    }

    handleSubChange = (value) => {
        console.log('inside picker sub change',value)
        this.setState({doctorId: value});
    }

    handleTextChange = (value) => {
        this.setState({feedback: value});
    }

    handleButtonClick = (value) => {
        console.log(value)
    }

    handleValueChange = (value) => {
     console.log('alone or accompanied ',value)   
    }

    postMethod = () => {
        const { rep, beltId, doctorId, chemistId, isAccompanied, managerId, feedback, userType, expense , location, isManagerApproved  } = this.state;
        console.log(rep, beltId, doctorId, chemistId, isAccompanied, managerId, feedback, userType, expense , location, isManagerApproved);
    }

    render() {
        const pickManager = <FormPicker style={{ marginTop:20, width: "100%" }} onValueChange={this.handleValueChange} selectedValue={this.state.pickerValue} label="Managers" data={this.state.pickerData} />

        formElements = [
            { label: "Choose Belt", type: "picker", onValueChange: (value) => this.handleBeltChange(value), pickerData: this.state.categoryList },
            { label: "Choose "+ this.props.navigation.getParam('name','wait'), type: "picker", onValueChange: (value) => this.handleSubChange(value), pickerData: this.state.subCategoryList },
            { label: "Feedback", type: "textarea", onChangeText: (value) => this.handleTextChange(value) },
        ];
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
                                height: 550
                            })
                        } else {
                            this.setState({
                                value: value,
                                isAccompanied: false,
                                height: 500
                            })
                        }

                    }}
                />
                </View>
                {/* <View style={{ paddingVertical: 10 }}></View> */}
                <View style={{width: "80%"}}>
                    {this.state.isAccompanied ? pickManager : null}
                </View>
                </View>
                <View style={{ paddingVertical: 5 }}></View>
                <View style={styles.btnContainer}>
                <Button style={{width: "60%"}}onPress={this.handleButtonClick} block >
                <Text>Submit</Text>
                </Button>
                </View>
    
            </View>
            </KeyboardAwareScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
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