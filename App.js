import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import store from './src/store/index';
import { Provider } from 'react-redux';
import Navigator from './src/navigator';
import AsyncStorage from '@react-native-community/async-storage';

class App extends Component {
  
  state = {  }
  // componentDidMount() {
  //   this._checkAuthenticationStatus();
  // }
  // _checkAuthenticationStatus = async () => {
  //   const userToken = await AsyncStorage.getItem('userToken');
  //   this.setState({ userToken: userToken});
  //   console.log('inside App.js screen',userToken);

  //   //this.props.navigation.navigate(userToken ? 'Dashboard' : 'Login');
  // };
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
      <Navigator />
      </Provider>
    );
  }
}
export default App;

