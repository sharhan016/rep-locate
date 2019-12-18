import React, { Component } from 'react';
import Realm from 'realm';
import { Modal, Text, TouchableOpacity, View, Alert, StyleSheet, Dimensions } from 'react-native';
import colors from "../config/colors";
import { CustomPicker } from 'react-native-custom-picker'
import CheckBox from '@react-native-community/checkbox';
import RNPickerSelect from 'react-native-picker-select';

const screenHeight = Dimensions.get('screen').height / 3;
const screenWidth = Dimensions.get('screen').width - 25;
//const Realm = require('realm');
const EventSchema = {
  name: 'events',
  properties: {
    id:  'int',
    event: 'string',
    date: 'string',
  }
};
class AlertCheck extends Component {
  
  constructor(props){
    super(props);
    this.state ={
      placeholder: {
        label: 'Choose Belt',
        value: null,
        color: '#9EA0A4',
      },
      modalVisible: false,
    holiday: false,
    belt: '',

    };
    Realm.open({schema: [EventSchema]}).then( realm => {
      realm.write( () => {
        const anEvent = realm.create('events', {
          id: 1,
          event: 'Civic',
          date: '21',
        });
      });
    })
  }
  

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const cars = realm.objects('events');
    console.log(cars.length);
    return (
      <View style={styles.mainContainer}>
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
                  { label: 'Football', value: 'football' },
                  { label: 'Baseball', value: 'baseball' },
                  { label: 'Hockey', value: 'hockey' },
                ]}
              />
              <View style={styles.checkBox}>
                <Text>Personal Leave</Text>
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
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log('Picker value ', this.state.belt)
                  console.log('Holiday value ', this.state.holiday)
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Submit</Text>
              </TouchableOpacity>

              {/* </View> */}
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Set Belt Location</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight,
    padding: 2,
    margin: 10,
    backgroundColor: colors.SILVER,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 200,
    // borderColor: colors.BLACK,
    borderWidth: 1,
    borderRadius: 7
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '400'
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.ALMOND
  },
  bottomBtn: {
    flexDirection: 'row',
    paddingBottom: 4,
    backgroundColor: colors.SILVER,
    width: screenWidth,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 30,
    borderRadius: 3

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
    backgroundColor: colors.SILVER,
    width: screenWidth,
    paddingBottom: 10,
    borderRadius: 3
  },
  checkBox: {
    width: screenWidth,
    flexDirection: "row",
    //backgroundColor: colors.SILVER,
    justifyContent: 'space-evenly'

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
  }
});

export default AlertCheck;