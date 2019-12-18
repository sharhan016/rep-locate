import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Fab } from 'native-base';
import CalendarPicker from 'react-native-calendar-picker';
import colors from "../config/colors";

// Currently not using 


class TpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            active: false
        };
        this.onDateChange = this.onDateChange.bind(this);
    }
    onDateChange(date) {
        this.setState({ selectedStartDate: date })
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tour Plan</Title>
                    </Body>
                    <Right>
            <Button hasText transparent>
              <Text>Submit</Text>
            </Button>
          </Right>
                </Header>

                <CalendarPicker
                    onDateChange={this.onDateChange}
                    selectedDayColor={colors.DODGER_BLUE}
                />



            <Fab
            active={this.state.active}
            //direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="add" />
          </Fab>

            </Container>
        );
    }
}

export default TpPage;