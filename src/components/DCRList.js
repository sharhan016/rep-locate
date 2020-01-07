import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import { ListItem } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import colors from "../config/colors";



const DCRList = (props) => {
    console.log('inside DCR LIST() ', props);
    const data = props.data;
    const navigation = props.nav;
    const tokenId = props["tokenID"];
    // //function to go to next screen
    // goToNextScreen = () => {
    //     console.log('Inside GoNext')
    //     return navigate('Report');
    // }

    return (

        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={(event) => {
                    const navigationParams = {
                        "ID": event.item.ID,
                        "TOKEN": tokenId,
                        "Rep": event.item.RepName,
                        "Belt": event.item.BeltName,
                        "VisitedUserType": event.item.VisitedUserType,
                        "Doctor": event.item.DoctorName,
                        "Chemist": event.item.ChemistName,
                        "IsAccompanied": event.item.IsAccompanied,
                        "Manager": event.item.ManagerName,
                        "Feedback": event.item.Feedback,
                        "Expense": event.item.Expense,
                        "IsManagerApproved": event.item.IsManagerApproved,
                        "Location": event.item.Location,
                        "CreatedOn": event.item.CreatedOn,
                    }
                    return <TouchableOpacity onPress={() => {
                        console.log('I am clicked', event.item.ID)
                        navigation.navigate('Report', navigationParams)
                    }
                    }>
                        <View style={styles.container}>
                        <ListItem
                            containerStyle={styles.listStyle}
                            titleStyle={{color: 'white'}}
                            subtitleStyle={{color: 'white'}}
                            roundAvatar
                            title={' ' + event.item.RepName}
                            subtitle={!event.item.DoctorName ? ' ' + 'Chemist: ' + event.item.ChemistName : ' ' + 'Doctor: ' + event.item.DoctorName}
                            leftAvatar={<UserAvatar size="50" name={event.item.VisitedUserType} color="#000" />}
                            chevron
                        />
                        </View>
                    </TouchableOpacity>
                }}
                keyExtractor={event => event.ID}
            />
        </View>

    );
}
export default DCRList;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        margin: 4
        //backgroundColor: colors.BG_LOGIN
    },
    listStyle: {
        borderRadius: 7,
        backgroundColor: '#FFFFFF2b',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 },
    },
    shadow: {
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 2.0,
        elevation: 2
    }
});
