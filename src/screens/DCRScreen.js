import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, TextInput,Button,PermissionsAndroid } from 'react-native';
import colors from "../config/colors";
import { Dropdown } from "react-native-material-dropdown";
import RadioForm from 'react-native-simple-radio-button';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';


///

//  CURRENTLY NOT USING

///


class DCRScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAccompanied: false,

            granted: false,
            fetching: false,
            currentLongitude: '',
            currentLatitude: '',
        };
        
    }

    // getData(){

    //     //Geocoder.getFromLatLng(41.89, 12.49)
    //     Geocoder.from(41.89, 12.49)
    //     .then(json => {
    //         var addressComponent = json.results[0].address_components[0];
    //     console.log(addressComponent);
    // })
    // .catch(error => console.warn(error));
    // }


    // need componentDidMount
    // submitButton
    // getLatLng


    componentDidMount = () => {
        var that =this;
 
          async function requestLocationPermission() {
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
                that.setState({granted: true});
              } else {
                alert("Permission Denied");
              }
            } catch (err) {
              alert("err",err);
              console.warn(err)
            }
          }
          requestLocationPermission();
       }

       submitButton = () => {
           if(this.state.granted == true){
               this.setState({fetching: true});
               this.getLatLng(this);
           }
           //if(this.state.fetching)
       }

       tmpbtn = () => {
            console.log(this.state.currentLatitude)
            this.getData();
       }

       getLatLng(that){
        //alert("callLocation Called");
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



    render() {
        let data = [{
            value: 'Banana',
        }, {
            value: 'Mango',
        }, {
            value: 'Pear',
        }];

        let mgr = [{
            value: 'Suresh',
        }, {
            value: 'Ramesh',
        }, {
            value: 'Ratheesh',
        }];

        const pickManager = <Dropdown label='Choose' data={mgr}/>;

        return (
            <View style={styles.background}>
                <View>
                    <Dropdown
                        label='Choose Belt'
                        data={data}
                    />
                    <View style={{ height: 5 }} ></View>
                    <Dropdown
                        label='Choose Doctor'
                        data={data}
                    />
                </View>
                <View style={{ height: 30 }} ></View>

                <View style={styles.textAreaContainer} >
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Feedback"
                        placeholderTextColor="grey"
                        numberOfLines={10}
                        multiline={true}
                    />
                </View>
                <View style={{ height: 30 }} ></View>

                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={true}
                    animation={false}
                    buttonColor={colors.MISCHKA}
                    selectedButtonColor= {colors.GREENISH}
                    onPress={(value) => { 
                        if(value == 1) {
                        this.setState({ 
                            value: value,
                            isAccompanied: true
                         }) } else {
                             this.setState({
                                 value: value,
                                 isAccompanied:false
                             })
                         }
                    
                    }}
                />

                <View>
                    {this.state.isAccompanied ? pickManager : null}
                </View>
                <View style={{padding: 20,margin: 10}}>
                    <Button title='Submit' onPress={this.submitButton}/>
                </View>
                
                <Text style={{fontSize: 20}} >
                    itemId: {this.props.navigation.getParam('navigationParams', 'No-ID')}
          {/*itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))} */}
        </Text>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.WHITE,
        flex: 1,
        margin: 10,
        padding: 10,
    },
    container: {
        margin: 10,
        padding: 10,
        backgroundColor: colors.MISCHKA,
        flex: 1

    },
    textAreaContainer: {
        borderColor: colors.MISCHKA,
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        //flexDirection: 'row-reverse',
        justifyContent: "center",
        alignItems: 'center'
    }
});

export default DCRScreen;



// AIzaSyCgXoHLYMyUQu55vQ9rw4WPJGZfqoQBmvE