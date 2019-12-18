import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Content } from 'native-base';


export const HeaderComponent =  () => {
    return(
        <Container>
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Header Title</Title>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                </Container>
    );
};