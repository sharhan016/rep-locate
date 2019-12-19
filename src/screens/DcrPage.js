import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Form, FormPicker } from "@99xt/first-born";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, } from 'native-base';
import RadioForm from 'react-native-simple-radio-button';
import colors from "../config/colors";
import * as api from '../config/api';
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
            isAccompanied: false,
            pickerValue: '',
            categoryList:[],
            subCategoryList:[]
        };
        console.log('Here in Constructor')
        //this.getData = this.getData.bind(this);

    }
    componentDidMount(){
        console.log('I am in didMount')
        this.getData();
      }
    // getData(){
    //     var temp = [];
    //     fetch(BELT_API, {
    //         method: "Post",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         }
    //     }).then( (response) => {
    //         console.log('response.json() =',response.json())
    //         //temp = response.json()
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
       
    // }
    getData = async () => {
        var temp = [];
        try {
        const res = await axios.post(api.BELT_API,{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
        });
        console.log('axio data ',res.data.BeltList)
        let responseJSON = res.data.BeltList;
        var len = responseJSON.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              var data = responseJSON[i];
              var joined = { label: data.BeltName,value: data.BeltID};
              temp.push(joined);
            }
          }
          console.log('catelgory List Data=',JSON.stringify(temp));
          this.setState({
            categoryList: temp
          });
       }catch(e){
       console.log(e)
       }
    }


    handleValueChange = async (value) => {
        var docs = [];
        console.log('value before axios ',value)
        const obj = { BeltID: value };
        const res = await axios.post(api.DOCTOR_API, obj)
          .then(function (response) {
            console.log('This is the response ',response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
          console.log(res)
        
        // try {
        // const res = await axios.post(BELT_API,{
        //     BeltID: value,
        // // headers: {
        // //     Accept: "application/json",
        // //     "Content-Type": "application/json"
        // // }
        // });
        //console.log('SubData ',res.data.DoctorList)
        // let responseJSON = res.data.BeltList;
        // var len = responseJSON.length;
        //   if (len > 0) {
        //     for (let i = 0; i < len; i++) {
        //       var data = responseJSON[i];
        //       var joined = { label: data.BeltName,value: data.BeltID};
        //       temp.push(joined);
        //     }
        //   }
        //   console.log('catelgory List Data=',JSON.stringify(temp));
        //   this.setState({
        //     categoryList: temp
        //   });
    //    }catch(e){
    //    console.log(e)
    //    }
        console.log(value)
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
            { label: "Select", type: "picker", onValueChange: (value) => this.handleValueChange(value), pickerData: this.state.pickerData },
            { label: "Feedback", type: "textarea", onChangeText: (value) => this.handleTextChange(value) },
        ];
        const pickManager = <FormPicker style={{width: "100%"}} onValueChange={this.handleValueChange} selectedValue={this.state.pickerValue} label="Managers" data={this.state.pickerData} />
        return (
            
            <View style={styles.container}>
                <View style={{ paddingVertical: 15 }}></View>
                <View style={styles.formContainer} >
                <Form formElements={formElements} />

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
                                isAccompanied: true
                            })
                        } else {
                            this.setState({
                                value: value,
                                isAccompanied: false
                            })
                        }

                    }}
                />

                <View style={{width: "80%"}}>
                    {this.state.isAccompanied ? pickManager : null}
                </View>
                </View>
                <View style={{ paddingVertical: 15 }}></View>
                <View style={styles.btnContainer}>
                <Button style={{width: "80%"}}onPress={this.handleButtonClick} block >
                <Text>Submit</Text>
                </Button>
                </View>
    
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flex: 1
    },
    formContainer: {
        alignItems: 'center',
        padding: 10,
        height: 500
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default DcrPage;