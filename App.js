import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import store from './src/store/index';
import { Provider } from 'react-redux';
import Navigator from './src/navigator';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import LoginScreen from './src/screens/LoginScreen';
// import RegisterScreen from './src/screens/RegisterScreen';
// import DashboardScreen from './src/screens/DashboardScreen';
// import DCRScreen from './src/screens/DCRScreen';
// import TPScreen from './src/screens/TPScreen';
// import MailScreen from './src/screens/MailScreen';
// import AuthScreen from './src/screens/AuthScreen';
// import TpPage from './src/screens/TpPage';
// import DcrPage from './src/screens/DcrPage';
// import AlertCheck from './src/screens/res';
// import Events from './src/screens/Events';
//import EventList from './src/components/EventList';
//import 'react-native-gesture-handler';

class App extends Component {
  state = {  }
  render() {
    return (
      <Provider store={store}>
      <Navigator />
      </Provider>
    );
  }
}
export default App;

// const DashStack = createStackNavigator({
//   Dashboard: DashboardScreen,
//   DCR: DCRScreen

// },{
//   defaultNavigationOptions: ({navigation}) => {
//     let IconComponent = Ionicons;
//     return{
//       headerLeft: ( <IconComponent style= {{paddingLeft:10}} name= "md-menu" size={30} color={colors.WHITE} /> ),
//       headerStyle: { backgroundColor: colors.HEADER_BLUE },
//       headerTitleStyle: { color: colors.WHITE },
//     } } }
// );

// const LoginStack = createStackNavigator({
//   SignIn: LoginScreen ,
//   SignUp: RegisterScreen
// });

// const AppDrawer = createDrawerNavigator({
//   Home: { screen: DashStack},
//   TourPlan: { screen: TPScreen},
//   Mail: { screen: MailScreen},
//   Tour: { screen: TpPage },
//   Test: { screen: AlertCheck },
//   Report: { screen: DcrPage},
//   Events: { screen: Events},
//   //EventList: { screen: EventList}
// }
// ,{
//   initialRouteName: 'Home',
//   headerMode: 'screen'
// }
// );

// const AppSwitchScreens = createSwitchNavigator({

//   Auth: AuthScreen,
//   Login: LoginStack,
//   Dashboard: AppDrawer
// });

// const styles= StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });

//export default createAppContainer(AppSwitchScreens);