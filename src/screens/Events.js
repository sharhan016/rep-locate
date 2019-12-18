import React, { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Data: []
        }
        console.log(this.state)
       
        this.getDataFromStorage();
    }
    // componentDidMount(){
    //     console.log('inside did update')
    //     this.getDataFromStorage();
    // }
    // componentWillMount(){
    //     console.log('inside will mount')
    //     this.getDataFromStorage();
    // }
    getDataFromStorage = async () => {
        console.log('reached 1');
        let keys = ['01', '02', '03'];
        //if (this.state.data.length > 1)
        //this.setState({data: []});
        try {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    let key = store[i][0];
                    let data = [];
                    let value = store[i][1];
                    let multiget = result;
                    if(value[i][0] === !null){
                        data.push(value);
                    }
                    //data.push(multiget);
                    //console.log(typeof value);
                    //data.push(value);
                })
                this.setState({Data: data});
                console.log(this.state.Data);
            })
        } catch (error) {
            console.log(error)
        }
        
        
        //console.log('length of data ', this.state.data.length);
        

    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Data:</Text>
                <Text>{this.state.data['0']}</Text>
                <View style={{paddingVertical: 50}}></View>
                <TouchableOpacity onPress={this.getDataFromStorage}>
                    <Text>Retrieve</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles= StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center'
    }
});
export default Events;