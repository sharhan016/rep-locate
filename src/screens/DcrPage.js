import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Form, FormPicker } from "@99xt/first-born";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, } from 'native-base';
import RadioForm from 'react-native-simple-radio-button';
import colors from "../config/colors";


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
            pickerValue: ''
        };
    }
    handleValueChange = (value) => {
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
            { label: "Choose Belt", type: "picker", onValueChange: (value) => this.handleValueChange(value), pickerData: this.state.pickerData },
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