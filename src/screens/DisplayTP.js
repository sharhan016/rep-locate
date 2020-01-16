import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList, ActivityIndicator, Button } from "react-native";
import Header from '../components/HeaderBack';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import Feather from 'react-native-vector-icons/Feather';
import colors from "../config/colors";
import * as api from '../config/api';
import Axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

class DisplayTP extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        loading: true,
        content: false,
        showReload: false,
        token: '',
        month: '',
        message: 'Sorry, no data available',
        data: []
    }
    componentDidMount() {
        this.getSubmittedTP();
    }

    getSubmittedTP = async () => {
        let token = await AsyncStorage.getItem(api.TOKEN);
        var temp = [];
        try {
            const response = await Axios.post(api.VIEW_TP, { APIToken: token });
            console.log('REQUEST',response)
            if (response.status == 302) {
                console.log('302 Detected')
                this.setState({ loading: false, content: false, showReload: true })
                
            } else {
                console.log('Not 302')
                const month = response.data.UserTPData["TpUserDate"]
                let res = response.data.TPData
                for (let i = 0; i <= 30; i++) {
                    let j = i + 1
                    let event = res[i] == 0 ? 'Not set' : res[i]
                    var joined = { event: ' ' + event, month: month, date: j.toString() }
                    temp.push(joined);
                }
                let newData = temp
                this.setState({ data: newData, loading: false, month: response.data.UserTPData["TpUserDate"], content: true })
                console.log('NEWDATA', newData)
                //this.setState({ loading: false, content: true })
                
            }
        } catch (error) {
            console.log(error)
        }
        //const response = 
        //console.log('STATUS CODE ',response.status)
        //this.setState({ loading: false, data: response.data.TPData,month: response.data.UserTPData["TpUserDate"], token: token });
        // if (response.status == 200) {
        //     const month = response.data.UserTPData["TpUserDate"]
        //     let res = response.data.TPData
        //     for (let i = 0; i <= 30; i++) {
        //         let j = i + 1
        //         let event = res[i] == 0 ? 'Not set' : res[i]
        //         var joined = { event: ' ' + event, month: month, date: j.toString() }
        //         temp.push(joined);
        //     }
        //     let newData = temp
        //     this.setState({ data: newData, loading: false, month: response.data.UserTPData["TpUserDate"], content: true })
        //     console.log('NEWDATA', newData)
            // } else if(response.status == 302){
            //     console.log('REACHED STATUS 302')
            //     this.setState({loading: false, content: false })
            // }
        }
        retryPage = () => {
            this.getSubmittedTP();
            this.setState({loading: true})
        }
        renderItem(event) {
            console.log('EVENT_LENGTH', event.item)
            return <View style={styles.listContainer}>

                <ListItem
                    containerStyle={styles.listStyle}
                    titleStyle={{ color: colors.BT_ORANGE, fontSize: 18 }}
                    subtitleStyle={{ color: colors.WHITISH, paddingLeft: 5 }}
                    roundAvatar
                    title={event.item.event}
                    subtitle={event.item.month}
                    leftAvatar={<UserAvatar size="50" name={event.item.date} color="#000" />}
                />
            </View>
        }
        render() {
            const Indicator = <ActivityIndicator animating={this.state.loading} color='#bc2b78' size="large" style={styles.activityIndicator} />
            const flatlist = <View style={{ paddingBottom: 50 }}><FlatList data={this.state.data} renderItem={this.renderItem}/></View>
            const NoData = <View style={styles.infotext}><Text style={styles.textStyle}>{this.state.message}</Text><TouchableOpacity onPress={this.retryPage} style={styles.inputIcon}><Feather name={'refresh-cw'} size= {24} color={colors.BT_ORANGE}/></TouchableOpacity></View>
            const retry = <View style={styles.inputIcon}><View style={styles.inputIcon}><Feather name={'refresh-cw'} size= {24} color={colors.BT_ORANGE}/></View></View>
            return (
                <ImageBackground style={styles.container}
                    source={require('../assets/healthcare.jpg')}
                >
                    <View style={{ backgroundColor: colors.BG_LOGIN, flex: 1 }}>
                        <Header
                            heading='View Tour Plan'
                            onPress={() => this.props.navigation.goBack()}
                        />
            
                        {this.state.content && !this.state.loading ? flatlist : NoData}
                        {/* {this.state.showReload ? retry : null } */}
                        {/* {this.state.loading ? Indicator : !this.state.content ? flatlist : NoData  } */}
                        {/* {this.state.loading ? Indicator : flatlist } */}
                    </View>

                </ImageBackground>
            );
        }
    }
    export default DisplayTP;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.BG_LOGIN,
            //alignItems: 'center',
            //justifyContent: 'center'
        },
        listContainer: {
            marginLeft: 8,
            marginRight: 8,
            //paddingTop: 10,
            paddingBottom: 2
        },
        listStyle: {
            borderRadius: 7,
            backgroundColor: '#FFFFFF2b',
            shadowOpacity: 0.75,
            shadowRadius: 5,
            shadowColor: 'red',
            shadowOffset: { height: 0, width: 0 },
        },
        activityIndicator: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 80
        },
        infotext: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: colors.BG_LOGIN
        },
        textStyle: {
            fontSize: 19,
            color: colors.BT_ORANGE
        },
        inputIcon: {
            paddingTop: 10
        }
    });