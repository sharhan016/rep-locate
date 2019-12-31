import React, { Component } from "react";
import { View,Text,StyleSheet,ActivityIndicator,FlatList, TouchableOpacity} from "react-native";
import DCRList from '../components/DCRList';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import * as api from '../config/api';
import Axios from "axios";

class DCRListView extends Component {
    static navigationOptions = {
        title: 'DCR'
    }
    state = { 
        loading: true,
        data : [],
        token: ''
     }
    componentDidMount(){
        this.getData();
        //console.log('inside DCR ',this.props.navigation.getParam('token'))
    }
    getData = async () => {
        let token = await AsyncStorage.getItem(api.TOKEN);
        const response = await Axios.post(api.PENDING_DCR,{
            APIToken: token
        });
        this.setState({loading: false, data: response.data.PendingDcr, token: token});
        console.log(response.data)
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
        const Indicator = <ActivityIndicator animating = {this.state.loading} color = '#bc2b78' size = "large" style = {styles.activityIndicator}/>
        const data = this.state.data;
        // const List = <FlatList
        // data={data}
        // renderItem={this.renderItem}
        // keyExtractor={event => event.ID}
        
    ///>
    const List = <DCRList data={data} tokenID={this.state.token} nav={this.props.navigation} />
        return (
            <View style={styles.container}>
                {this.state.loading ? Indicator : List}
                {/* {List} */}
            </View>
        );
    }
}
export default DCRListView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
        //alignItems: 'center',
        //justifyContent: 'center'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     }
});

