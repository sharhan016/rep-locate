import React, { Component } from "react";
import {  View, Text, StyleSheet} from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import DCRScreen from './screens/DCRScreen';
import TPScreen from './screens/TPScreen';
import MailScreen from './screens/MailScreen';
import AuthScreen from './screens/AuthScreen';
//import TpPage from './screens/TpPage';
import DcrPage from './screens/DcrPage';
//import AlertCheck from './screens/res';
//import Events from './screens/Events';
import colors from './config/colors';

class Navigator extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Navigator</Text>
            </View>
        );
    }
}
const DashStack = createStackNavigator({
    Dashboard: DashboardScreen,
    DCR: DCRScreen,
    Report: DcrPage
  
  },{
    defaultNavigationOptions: ({navigation}) => {
      let IconComponent = Ionicons;
      return{
        headerLeft: ( <IconComponent style= {{paddingLeft:10}} name= "md-menu" size={30} color={colors.WHITE} /> ),
        headerStyle: { backgroundColor: colors.HEADER_BLUE },
        headerTitleStyle: { color: colors.WHITE },
      } } }
  );
  
  const LoginStack = createStackNavigator({
    SignIn: LoginScreen ,
    SignUp: RegisterScreen
  });
  
  const AppDrawer = createDrawerNavigator({
    Home: { screen: DashStack},
    TourPlan: { screen: TPScreen},
    Mail: { screen: MailScreen},
    //Tour: { screen: TpPage },
    //Test: { screen: AlertCheck },
    //Report: { screen: DcrPage},
    //Events: { screen: Events},
    //EventList: { screen: EventList}
  }
  ,{
    initialRouteName: 'Home',
    headerMode: 'screen'
  }
  );
  
  const AppSwitchScreens = createSwitchNavigator({
  
    Auth: AuthScreen,
    Login: LoginStack,
    Dashboard: AppDrawer
  });


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//export default Navigator;
export default createAppContainer(AppSwitchScreens);