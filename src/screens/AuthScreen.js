import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class AuthScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  componentDidMount() {
    this._checkAuthenticationStatus();
  }
  _checkAuthenticationStatus = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('inside welcome screen',userToken);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Dashboard' : 'Login');
  };

  render() {
    return (
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthScreen;