import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import colors from "../config/colors";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CalendarPicker from 'react-native-calendar-picker';
import DialogInput from 'react-native-dialog-input';

class TPScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            isAlertVisible:false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    onDateChange(date) { 
        this.setState({selectedStartDate: date})
        const { selectedStartDate } = this.state;
        const format = selectedStartDate.format('MMM YYYY');
        const day = selectedStartDate.format('Do');
        console.log(format);
        console.log(day)
     }

    submit(inputText){
        const { selectedStartDate } = this.state;
        const format = selectedStartDate.format('MMM YYYY');
        const Date = selectedStartDate ? selectedStartDate.toString().slice(0, 16) : '';
        console.log(inputText);
        console.log(format);
        this.setState({isAlertVisible:false})
      }
    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString().slice(0, 16) : '';
        return (
            <View style={styles.body}>

                <CalendarPicker
                 onDateChange={this.onDateChange}
                 />
                <Text>{startDate}</Text>

                <Button title="Open" onPress={()=>this.setState({isAlertVisible:true})} />

                <DialogInput isDialogVisible={this.state.isAlertVisible}
                    title={"Event"}
                    message={"Your belt name"}
                    hintInput ={"calicut"}
                     submitInput={ (inputText) => {this.submit(inputText)} }
                     closeDialog={ () =>this.setState({isAlertVisible:false})}>
                </DialogInput>



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
        width: '90%'},
});

export default TPScreen;