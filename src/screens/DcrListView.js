import React, { Component } from "react";
import { View,Text,StyleSheet,ActivityIndicator,Dimensions,FlatList, TouchableOpacity, ImageBackground} from "react-native";
import DCRList from '../components/DCRList';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';
import Header from '../components/HeaderBack'
import UserAvatar from 'react-native-user-avatar';
import * as api from '../config/api';
import Axios from "axios";
import colors from "../config/colors";

Axios.defaults.timeout = 10000
const screenHeight = Dimensions.get('screen').height / 1.5 + 100;

class DCRListView extends Component {
    static navigationOptions = {
        header: null
    }
    state = { 
        loading: true,
        data : [],
        token: '',
        showEmpty: false
     }
    componentDidMount(){
        this.getData();
        //console.log('inside DCR ',this.props.navigation.getParam('token'))
    }
    getData = async () => {
        let token = await AsyncStorage.getItem(api.TOKEN);
        try {
            await Axios.post(api.PENDING_DCR,{ APIToken: token })
            .then( res => {
                let response = res.data.PendingDcr
                console.log('response',response)
                this.setState({loading: false, data: response, token: token})
            })
        } catch (error) {
            this.setState({loading: false, showEmpty: true, data: null, token: token})
            console.log('error occurred',error)
        }
        // const response = await Axios.post(api.PENDING_DCR,{
        //     APIToken: token
        // });
       // this.setState({loading: false, data: response.data.PendingDcr, token: token});
    }
    renderItem(event) { 
        console.log(event.item)
         return <TouchableOpacity  onPress={ () => console.log(this.props.navigation) }>
             <ListItem
         roundAvatar
         title={' ' + event.item.Rep}
         subtitle={!event.item.Doctor ? ' ' +'Chemist ' + event.item.Chemist : ' ' +'Doctor '+ event.item.Doctor}
         leftAvatar={<UserAvatar size="50" name={event.item.VisitedUserType} color="#000" />}
         chevron
          />
         </TouchableOpacity>
     }
    render() {
        const EmptyText = <View style={styles.emptyContainer}><Text style={styles.textStyle}>NO PENDING REPORTS</Text></View>
        const Indicator = <ActivityIndicator animating = {this.state.loading} color = '#bc2b78' size = "large" style = {styles.activityIndicator}/>
        const data = this.state.data;
        // const List = <FlatList
        // data={data}
        // renderItem={this.renderItem}
        // keyExtractor={event => event.ID}
        
    ///>
    const List = <DCRList data={data} tokenID={this.state.token} nav={this.props.navigation} />
        return (
            <ImageBackground
                    source={require('../assets/healthcare.jpg')}
                    style={styles.backgroundContainer}
                >
                <View style={styles.container}>
                <Header heading='Pending DCR' onPress={() => this.props.navigation.goBack()} />
                {this.state.loading ? Indicator : List}
                {this.state.showEmpty ? EmptyText : null}
                </View>
                {/* {List} */}
            </ImageBackground>
        );
    }
}
export default DCRListView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG_LOGIN,
        //padding: 5
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     },
     backgroundContainer: {
        width: '100%',
        height: '100%',
        //backgroundColor: colors.BG_LOGIN,
    },
    textStyle: {
        fontSize: 22,
        color: colors.WHITE
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight
    }
});

