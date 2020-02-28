import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, FlatList, ActivityIndicator } from "react-native";
import Header from '../components/HeaderBack';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import colors from "../config/colors";
import * as api from '../config/api';
import Axios from "axios";


class RepList extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        loading: true,
        data: [],
        token: ''
    }

    componentDidMount() {
        const tokenId = this.props.navigation.getParam("token");
        this.setState({ token: tokenId })
        this.getRepList();
    }
    getRepList = async () => {
        let token = await AsyncStorage.getItem(api.TOKEN);
        const response = await Axios.post(api.LIST_REP, {
            APIToken: token
        });
        this.setState({ loading: false, data: response.data.RepDetails, token: token });
        console.log('Response ', this.state.data)
    }
    renderItem(event) {
         return <View style={styles.listContainer}>
             <ListItem
            containerStyle={styles.listStyle}
            titleStyle={{ color: 'white' }}
            subtitleStyle={{ color: 'white' }}
            roundAvatar
            title={ event.item.RepName}
            subtitle={event.item.RepEmail}
            leftAvatar={<UserAvatar size="50" name={event.item.RepName} color="#000" />}
        />
         </View>
    }
    renderSeperator = () => {
        return (
            <View style={{
                height: .5,
                width: "80%",
                backgroundColor: colors.WHITISH,
                marginLeft: '14%'
            }}>

            </View>
        );
    }

    render() {
        const Indicator = <ActivityIndicator animating = {this.state.loading} color = '#bc2b78' size = "large" style = {styles.activityIndicator}/>
        return (
            <ImageBackground style={styles.container}
                source={require('../assets/healthcare.jpg')}
            >
                <View style={{backgroundColor: colors.BG_LOGIN, flex: 1}}>
                <Header
                    heading='Rep List'
                    onPress={() => this.props.navigation.goBack()}
                />
                
                {this.state.loading ? Indicator : 
                    <View style={{paddingTop: 10}}>
                        <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        //keyExtractor={item.RepID}
                        //ItemSeparatorComponent={this.renderSeperator}
                />
                    </View> }
                    </View>
                
            </ImageBackground>
        );
    }
}
export default RepList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG_LOGIN
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
});