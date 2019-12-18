import React, { Component } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Content } from 'native-base';
import Btn from '../components/Button';
import { openInbox } from 'react-native-email-link';
import colors from "../config/colors";

class MailScreen extends Component {
    state = {}
    compose = () => {
        Linking.openURL('mailto:sharhan.sathar@gmail.com?subject=Leave Application&body=');
    }
    render() {
        return (
            <View style={styles.container}>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>MailBox</Title>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                          
                            <View style={styles.btnContainer}>
                        <Btn style={[styles.btnStyle,styles.textStyle]} label=' CHECK MAIL ' onPress={() => openInbox()}/>
                        <View style={{paddingVertical: 40}}></View>
                        <Btn style={[styles.btnStyle,styles.textStyle]} label=' SUBMIT LEAVE ' onPress={this.compose} />
                          <View style={{paddingVertical: 40}}></View>
                        </View>

                </Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        //alignItems: 'center',
        flex: 1,
        backgroundColor: colors.ALMOND
        //backgroundColor:'#E7E2C5'
    },
    btnStyle: {
        width: "60%"
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex:1
    },
    textStyle: {
        fontSize: 17,
        fontWeight: '700'
    }
});

export default MailScreen;