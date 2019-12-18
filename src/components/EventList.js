import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import DisplayEvents from '../containers/DisplayEvents';


const EventList = ({ events }) => (
   
        <View><Text>{events}</Text>
        <Button 
        title='retrieve'
        onPress={() => {console.log(events.event)}}
        />

</View>

    )
export default EventList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


{/* <View >
        {events.map( event => {
            <Text> {event.event} </Text>
        })}
    </View> */}