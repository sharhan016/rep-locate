import React, { Component } from 'react';
import { View, StyleSheet,FlatList} from "react-native";
import {connect} from 'react-redux';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Content } from 'native-base';

import DisplayEvents from '../containers/DisplayEvents';
import store from '../store/index';
import ListItem from './ListItem';
//import Header from './Header';

class EventList extends Component {
    renderItem( event ) {
        return <ListItem events={event} />
    }
    compare = (a, b) => {
        const bandA = a.date;
        const bandB = b.date;
        console.log('bandA and bandB ',bandA,bandB)
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
        console.log('Sorted Data is ', data)
        return(
            <View style={styles.container}>
            <Container>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title> EventList </Title>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                </Container>
                <Text style={{marginLeft:10,fontSize: 18}}>Belt wise report</Text>
            <View style={styles.inView}>
            <FlatList 
            data={data}
            renderItem={this.renderItem}
            keyExtractor={event => event.id}
            />
            <Button disabled>
                <Text>Submit</Text>
            </Button>
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

export default connect(mapStateToProps,mapDispatchToProps)(EventList)

const styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    inView: {
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 5,
        marginBottom: 20,
        marginTop:10,
        padding:10,
        flex: 8,
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