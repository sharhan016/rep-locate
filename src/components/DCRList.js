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
                        "Rep": event.item.Rep,
                        "Belt": event.item.Belt,
                        "VisitedUserType": event.item.VisitedUserType,
                        "Doctor": event.item.Doctor,
                        "Chemist": event.item.Chemist,
                        "IsAccompanied": event.item.IsAccompanied,
                        "Manager": event.item.Manager,
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
                        <ListItem
                            roundAvatar
                            title={' ' + event.item.Rep}
                            subtitle={!event.item.Doctor ? ' ' + 'Chemist ' + event.item.Chemist : ' ' + 'Doctor ' + event.item.Doctor}
                            leftAvatar={<UserAvatar size="50" name={event.item.VisitedUserType} color="#000" />}
                            chevron
                        />
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
        flex: 1,
    }
});






/*


this.state = {
           data: [
            { "ID": "3", "Rep": "3", "Belt": "2", "VisitedUserType": "C", "Doctor": null, "Chemist": "1", "IsAccompanied": "1", "Manager": "1", "Feedback": "As per the discussion, meeting postponed to Dec 16 2019 at 2 pm. Earlier it was scheduled on Dec 12 2019", "Expense": "300", "IsManagerApproved": "0", "Location": "12121", "IP": "::1", "CreatedOn": "2019-12-12 17:00:00", "UpdatedOn": "0000-00-00 00:00:00" },
            { "ID": "2", "Rep": "5", "Belt": "3", "VisitedUserType": "D", "Doctor": "2", "Chemist": null, "IsAccompanied": "0", "Manager": "0", "Feedback": "Meeting was on 11\/12\/2019 at 11 AM at Calicut.", "Expense": "450", "IsManagerApproved": "1", "Location": "12344", "IP": "::1", "CreatedOn": "2019-12-11 11:00:00", "UpdatedOn": "0000-00-00 00:00:00" },
            { "ID": "1", "Rep": "2", "Belt": "2", "VisitedUserType": "D", "Doctor": "2", "Chemist": null, "IsAccompanied": "1", "Manager": "2", "Feedback": "Meeting was on 11\/12\/2019 at 10 AM at Calicut.", "Expense": "100", "IsManagerApproved": "1", "Location": "123", "IP": "::1", "CreatedOn": "2019-12-11 10:00:00", "UpdatedOn": "0000-00-00 00:00:00" },
            { "ID": "5", "Rep": "2", "Belt": "3", "VisitedUserType": "D", "Doctor": "1", "Chemist": "0", "IsAccompanied": "0", "Manager": null, "Feedback": "Last meeting for the month November 2019", "Expense": "430", "IsManagerApproved": "0", "Location": "121254", "IP": ":1", "CreatedOn": "2019-11-30 15:50:00", "UpdatedOn": "0000-00-00 00:00:00" },
            { "ID": "4", "Rep": "5", "Belt": "1", "VisitedUserType": "C", "Doctor": "0", "Chemist": "1", "IsAccompanied": "1", "Manager": "2", "Feedback": "First meeting for the month October 2019", "Expense": "720", "IsManagerApproved": "1", "Location": "123123", "IP": ":1", "CreatedOn": "2019-10-01 09:30:00", "UpdatedOn": "0000-00-00 00:00:00" }
        ],
        }




renderItem(event) {
       const navigation = this.props.navigation

        return <TouchableOpacity  onPress={ () => this.navigateToScreen('Report') }>
            <ListItem
        roundAvatar
        title={' ' + event.item.Rep}
        subtitle={!event.item.Doctor ? ' ' +'Chemist ' + event.item.Chemist : ' ' +'Doctor '+ event.item.Doctor}
        leftAvatar={<UserAvatar size="50" name={event.item.VisitedUserType} color="#000" />}
        chevron
         />
        </TouchableOpacity>
    }





return (
            <View style={styles.container}>
                <FlatList
                        data={data}
                        renderItem={this.renderItem}
                        keyExtractor={event => event.ID}
                    />
            </View>
        );



*/