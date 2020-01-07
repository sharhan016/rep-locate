import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, ImageBackground, ActivityIndicator, ToastAndroid } from "react-native";
import { connect } from 'react-redux';
import Header from '../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../components/Button';
import { ListItem } from 'react-native-elements';
import axios from "axios";
import * as api from '../config/api';
import UserAvatar from 'react-native-user-avatar';
import colors from '../config/colors';



class EventList extends Component {
    state = {
        data : [],
        loading: false,
        tokenId: ''
    }
    componentDidMount(){
        this.getToken();
    }

    getToken = async () => {
        try {
            let token = await AsyncStorage.getItem(api.TOKEN);
            this.setState({tokenId: token});
            console.log("token in EVENTLIST ",token)
        } catch (error) {
            console.log(error)
        }
    }
    renderItem(event) {
        return <View style={styles.contain}>
            <ListItem
            roundAvatar
            containerStyle={styles.listStyle}
            titleStyle={{color: 'white'}}
            subtitleStyle={{color: 'white'}}
            title={event.item.event}
            //itemSeperatorComponent={this.renderSeperator()}
            subtitle={'January  ' + event.item.date}
            leftAvatar={<UserAvatar size="50" name={event.item.date} color="#000" />}
            bottomDivider
        />
        </View>
    }

    renderSeperator = () => {
        return(
            <View style={{
                height: 1,
                backgroundColor: colors.WHITE
            }}>

            </View>
        );
    }

    compare = (a, b) => {
        const bandA = a.date;
        const bandB = b.date;
        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }
    submitTP = async () => {
        console.log('inside SUBMIT TP', this.state.data)
        const TPData = this.props.events.sort(this.compare);
      
        let data = TPData.filter((thing, index, self) =>
             index === self.findIndex((t) => (
                 t.date === thing.date && t.event === thing.event
             ))
         )
        //console.log('This is data ',data)
        await axios.post(api.SUBMIT_TP, {
            APIToken: this.state.tokenId,
            TPData: data
        })
            .then(response => {
                console.log('RESPONSE SUBMITION ',response)
                if(response.status == 200){
                    this.setState({loading: false});
                    ToastAndroid.show("Submitted Successfully", ToastAndroid.LONG);
                    this.props.navigation.navigate('Dashboard')
                }else{
                    ToastAndroid.show("Please try again", ToastAndroid.SHORT);
                    this.setState({loading: false});
                }
            })
            .catch(error => {
                ToastAndroid.show("Submission Failed", ToastAndroid.SHORT);
                this.setState({loading: false});
                console.log(error)
            }
            );
    }



    render() {
        const data = this.props.events.sort(this.compare);
      
       let datas = data.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.date === thing.date && t.event === thing.event
            ))
        )
        const Indicator = <ActivityIndicator animating = {this.state.loading} color = {colors.BT_ORANGE} size = "large"/>
        let length = datas.length;
        const SubmitButton = <Button style={styles.buttonStyle} label='SUBMIT' onPress={this.submitTP} />
        const TextDisplay = <View style={styles.emptyContainer}><Text style={{color: 'white', fontSize: 17}}>Add event in TP to display data here</Text></View>

        return (
            <ImageBackground
            source={require('../assets/calender-image.jpg')}
            style={styles.backgroundContainer}
        >
            <View style={styles.container}>
                <Header
                    heading='Belt List'
                    onPress={() => this.props.navigation.openDrawer()} />
                <Text style={{ marginLeft: 10, fontSize: 18, marginTop: 10 }}></Text>

                {length == 0 ? TextDisplay : null}

                <View style={styles.inView}>
                    <FlatList
                        data={datas}
                        renderItem={this.renderItem}
                        keyExtractor={event => event.id.toString()}
                    />
     
                </View>
                <View style={{alignItems: 'center'}}>
                { this.state.loading ? Indicator : length >=5 ? SubmitButton : null }
                </View>
            </View>
            </ImageBackground>
        );
    }
}


const mapStateToProps = state => {
    return { events: state.events };
}

const mapDispatchToProps = dispatch => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(EventList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG_LOGIN,
        paddingTop: 50
    },
    inView: {
        alignItems: 'stretch',
        marginLeft: 5,
        marginRight: 2,
        marginBottom: 20,
        marginTop: 10,
        //padding:5,
        paddingLeft: 5,
        paddingRight: 5,
        flex: 9,
        //backgroundColor: 'grey'
        //paddingTop: 15,
    },
    contain: {
        //flex: 1,
        marginLeft:4,
        marginRight:4,
        marginBottom: 3,
        //backgroundColor: colors.BG_LOGIN
    },
    backgroundContainer: {
        //flex: 1,
        width: '100%',
        height: '100%',
    },
    listStyle: {
        borderRadius: 8,
        borderBottomWidth: 0,
        backgroundColor: '#FFFFFF2b',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 },
    },
    buttonStyle :{
        width: '50%',
        backgroundColor: colors.BT_ORANGE,
        marginTop: 5
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '20%'
    }
});

  /*
                var len = data.length;
                var obj = {};
                console.log('data and len ',len,data)
                for (var i = 0; i < len; i++)
                    obj[data[i]['date']] = data[i];
                let datas = new Array();
                for (var key in obj)
                    datas.push(obj[key]);
                    console.log('data',datas)
        */

/*




const EventList = ({ events }) => (

    <View style={styles.container}>
     {console.log('Inside EventList ',events)}
    {
    events.map( event => {

        <View>
            <Text>
                Hello
            </Text>
             </View>
    })}

    <Button
    style={{width:'50%'}}
    title='retrieve'
    onPress={() => {
        //console.log('props ',this.props)
        console.log('store ',store.getState())
    }}
    />
     </View>

)







*/