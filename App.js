import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import store from './src/store/index';
import { Provider } from 'react-redux';
import Navigator from './src/navigator';
import AsyncStorage from '@react-native-community/async-storage';

class App extends Component {

  state = {  }
  componentDidMount() {
    this._checkAuthenticationStatus();
  }
  _checkAuthenticationStatus = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({ userToken: userToken});
   // console.log('inside App screen',userToken);

    //this.props.navigation.navigate(userToken ? 'Dashboard' : 'Login');
  };
  render() {
    return (
      <Provider store={store}>
      <Navigator userToken={this.state.userToken} />
      </Provider>
    );
  }
}
export default App;

