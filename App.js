import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import DCRScreen from './src/screens/DCRScreen';
import TPScreen from './src/screens/TPScreen';
import MailScreen from './src/screens/MailScreen';
import AuthScreen from './src/screens/AuthScreen';

// 95:EF:24:4C:27:7E:12:0B:D7:C0:DF:6F:C8:4A:67:84:A4:80:8C:00

class App extends Component {
  state = {  }
  render() {
    return (
      <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
        <Text> Hello This is the App.js file </Text>
      </View>
    );
  }
}

// class WelcomeScreen extends Component {
//   handleClick () {
//     console.log('thsis');
//     //this.props.navigation.navigate('dashboard');
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>This is the welcome Screen!</Text>
//         <View style={{height: 40}}></View>
//         <Button title="Sign In" onPress={ () => {this.props.navigation.navigate('SignIn')}} />
//         <View style={{height: 40}}></View>
//         <Button title="Sign Up"  />
//       </ View>
//     );
//   }
// }
// class DashboardPage extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Welcome to DashBoard</Text>
//       </View>
//     );
//   }
// }

// class LoginPage extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>This is the Login Page</Text>
//       </View>
//     );
//   }
// }

class RegisterPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Register Page</Text>
      </View>
    );
  }
}

const DashStack = createStackNavigator({
  Dashboard: DashboardScreen,
  DCR: DCRScreen
  //TourPlan: TPScreen,
  //Mail: MailScreen
},{
  defaultNavigationOptions: ({navigation}) => {
    let IconComponent = Ionicons;
    return{
      headerLeft: ( <IconComponent style= {{paddingLeft:10}} name= "md-menu" size={30}  /> ),
      title: 'Dashboard'
    } } }
);

const LoginStack = createStackNavigator({
  SignIn: LoginScreen ,
  SignUp: RegisterScreen
});

const AppDrawer = createDrawerNavigator({
  Home: { screen: DashStack},
  TourPlan: { screen: TPScreen},
  Mail: { screen: MailScreen}
}
,{
  initialRouteName: 'Home',
  headerMode: 'screen'
}
);

const AppSwitchScreens = createSwitchNavigator({
  //welcome: WelcomeScreen,
  Auth: AuthScreen,
  Login: LoginStack,
  Dashboard: AppDrawer
});

const styles= StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default createAppContainer(AppSwitchScreens);