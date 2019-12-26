import React, { Component } from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import { Form, FormPicker } from "@99xt/first-born";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, } from 'native-base';
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
            height: 400,
            isAccompanied: false,
            pickerValue: '',
            completeList: [],
            categoryList:[],
            subCategoryList:[]
        };
        //this.getData();
        console.log('Here in Constructor')
        
        //this.getData = this.getData.bind(this);

    }
    componentDidMount(){
        console.log('I am in didMount')
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
        
  


    handleValueChange = (value) => {
        var docs = [];
        console.log('value before axios ',value)
        const obj = { 
            BeltID: value
         };
         this.getSubdata(value);
        //  if(!this.state.subCategoryList.length){
        //     console.log('no data ',this.state.subCategoryList)
        //     this.getSubdata(value);
        //  }else{
        //      //this.setState({ subCategoryList: docs });
        //      //console.log('Subcategry inside else ',this.state.subCategoryList)
        //      //this.getSubdata(obj);
        //      let doctors = this.state.completeList;
        //      var length = doctors.length;
        //      if(length > 0){
        //         //  for(var i=0; i < length; i++ ){
        //         //      var doctor = doctors[i];
        //         //      //console.log('doctor[i] ',doctor[i])
        //         //      //doctor.DoctorBelt === value ? docs.push(doctor) : [];
        //         //      console.log('doc inside for loop ',docs)
        //         //  }
        //         //  this.setState({
        //         //      subCategoryList: docs
        //         //  })
        //          console.log('inside else of handleValue ', this.state.subCategoryList)
        //      }
        //  }
        
         /*
        const res = await axios.post(api.DOCTOR_API, { obj })
          .then(function (response) {
            //console.log('This is the post response ',response.data.DoctorList);
            let doctorResponse = response.data.DoctorList;
            var len = doctorResponse.length;
            console.log('length of doctor list ',len)
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                  var data = doctorResponse[i];
                  var doctor = { label: data.DoctorName,value: data.DoctorID};
                  console.log('variable doctor is ',doctor)
                  docs.push(doctor);
                }
                this.setState({
                    subCategoryList: docs,
                  });
              }
              
              console.log('This is the sub category ',subCategoryList)
          })
          .catch(function (error) {
            console.log(error);
          });

        */
   
        console.log(value)
    }
    handleSubChange = (value) => {
        console.log('inside picker sub change',value)
    }
    handleTextChange = (value) => {
        console.log(value)
    }
    handleButtonClick = (value) => {
        console.log(value)
    }
    render() {
        formElements = [
            { label: "Choose Belt", type: "picker", onValueChange: (value) => this.handleValueChange(value), pickerData: this.state.categoryList },
            { label: "Choose Doctor", type: "picker", onValueChange: (value) => this.handleSubChange(value), pickerData: this.state.subCategoryList },
            { label: "Feedback", type: "textarea", onChangeText: (value) => this.handleTextChange(value) },
        ];
        const pickManager = <FormPicker style={{ marginTop:20, width: "100%" }} onValueChange={this.handleValueChange} selectedValue={this.state.pickerValue} label="Managers" data={this.state.pickerData} />
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