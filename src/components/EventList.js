import React from "react";
import { View,Text,StyleSheet,Button} from "react-native";
import {connect} from 'react-redux';
import DisplayEvents from '../containers/DisplayEvents';
import store from '../store/index';

const EventList = ({ events }) => (
   
        <View>
         
        {/* {events.map( event => {
            <Text> {event.event} </Text>
        })} */}
    
        <Button 
        title='retrieve'
        onPress={() => {
            //console.log('props ',this.props)
            console.log('store ',store.getState())
        }}
        />
         </View>

    )
    const mapStateToProps = state => ({
        events: state.events
    })
    
    const mapDispatchToProps = dispatch => ({
        dispatch
    })

export default connect(mapStateToProps,mapDispatchToProps)(EventList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

