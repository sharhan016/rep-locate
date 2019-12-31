import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text } from "react-native";
import { connect } from 'react-redux';
//import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Content } from 'native-base';
import Header from '../components/Header';
import { ListItem } from 'react-native-elements';
import DisplayEvents from '../containers/DisplayEvents';
import store from '../store/index';
import UserAvatar from 'react-native-user-avatar';
//import ListItem from './ListItem';
//import Header from './Header';


class EventList extends Component {
    renderItem(event) {
        return <ListItem
            roundAvatar
            title={event.item.event}
            subtitle={'January  ' + event.item.date}
            leftAvatar={<UserAvatar size="50" name={event.item.date} color="#000" />}
            bottomDivider
        />
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



    render() {
        const data = this.props.events.sort(this.compare);
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
       let datas = data.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.date === thing.date && t.event === thing.event
            ))
        )

        return (
            <View style={styles.container}>
                <Header
                    heading='Belt List'
                    onPress={() => this.props.navigation.openDrawer()} />
                <Text style={{ marginLeft: 10, fontSize: 18, marginTop: 10 }}>Belt wise report</Text>
                <View style={styles.inView}>
                    <FlatList
                        data={datas}
                        renderItem={this.renderItem}
                        keyExtractor={event => event.id}
                    />
                    {/* <Button disabled>
                <Text style={{textAlign: 'center'}}>Submit</Text>
            </Button> */}
                </View>
            </View>
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
        backgroundColor: 'transparent'
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

    }
});



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