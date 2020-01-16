import React, { Component } from "react";
import {  View, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator, NavigationAction } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import DCRScreen from './screens/DCRScreen';
import TPScreen from './screens/TPScreen';
import MailScreen from './screens/MailScreen';
import AuthScreen from './screens/AuthScreen';
import EventList from '../src/components/EventList';
//import TpPage from './screens/TpPage';
//import DashboardPage from '../src/screens/DashboardPage';
import DcrPage from './screens/DcrPage';
import DisplayTP from './screens/DisplayTP';
import LoginPage from './screens/LoginPage';
import LogOut from './screens/LogOut';
import RegisterPage from './screens/RegisterPage';
import DcrListView from './screens/DcrListView';
import ManagerTP from './screens/ManagerTP';
import RepList from './screens/RepList';
import ReportView from './components/ReportView';
import SideBar from './components/SideBar';
import colors from './config/colors';

class Navigator extends Component {
  state = {
    userType: 1
  }
    render() {
      //console.log('inside navigator ', this.props.userToken)
        return (
            <View style={styles.container}>
                <Text>Navigator</Text>
            </View>
        );
    }
}
iconOpener = () => {
  console.log('Nan ethi')
}
//const BurgerIcon = <Ionicons style= {{paddingLeft:10}} name= "md-menu" size={30} color={colors.WHITE} /> ;
const DashStack = createStackNavigator({
    Dashboard: DashboardScreen,
    DCR: DcrPage,
    DcrList: DcrListView,
    MgrTp: ManagerTP,
    RepList: RepList,
    Report: ReportView,
    Display: DisplayTP
    //DCR: DCRScreen,
    //TP: TPScreen,
    //Report: DcrPage
  
  },{
    defaultNavigationOptions: ({navigation}) => {
      let IconComponent = Ionicons;
      return{
        headerLeft: ( 
        <TouchableOpacity onPress={()=> {
          navigation.openDrawer();
          //console.log('Entha cheyya nan etheetta ',navigation)
        }}> 
        <IconComponent style= {{paddingLeft:15}} name= "md-menu" size={30} color={colors.WHITE} />
        </TouchableOpacity> ),
        headerStyle: { 
          backgroundColor: colors.HEADER_GREEN,
         },
        headerTitleStyle: { color: colors.WHITE },
      } } }
  );
  
  const LoginStack = createStackNavigator({
    //SignIn: LoginScreen ,
    SignIn: LoginPage,
    SignUp: RegisterPage
    //SignUp: RegisterScreen
  });
  
  const AppDrawer = createDrawerNavigator({
    Home: { 
      screen: DashStack,
      navigationOptions: {
        title: 'Home',
        drawerIcon: ({tintColor}) => <Feather name="home" size= {18} color={tintColor} />
      } },
    TourPlan: {
       screen: TPScreen,
       navigationOptions: {
        title: 'Tour Plan',
        drawerIcon: ({tintColor}) => <Feather name="calendar" size= {18} color={tintColor} />
      } },
    Mail: { 
      screen: MailScreen,
      navigationOptions: {
       title: 'Check Mail',
       drawerIcon: ({tintColor}) => <Feather name="mail" size= {18} color={tintColor} />
     }},
    Events: {
       screen: EventList ,
       navigationOptions: {
        title: 'Belt List',
        drawerIcon: ({tintColor}) => <Feather name="list" size= {18} color={tintColor} />
      }},
    Logout: { 
      screen: LogOut,
      navigationOptions: {
       title: 'Sign Out',
       drawerIcon: ({tintColor}) => <Feather name="log-out" size= {18} color={tintColor} />
     } }
    //Tour: { screen: TpPage },
    //Test: { screen: AlertCheck },
    //Report: { screen: DcrPage},
    //Events: { screen: Events},
    //EventList: { screen: EventList}
  }
  ,{
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: Dimensions.get('window').width * 0.7,
    hideStatusBar: false,
    contentOptions: {
      activeBackgroundColor: 'rgb(197,235, 184)',
      activeTintColor: colors.DRW_TINT,
      itemsContainerStyle: {
        marginTop: 4,
        marginHorizontal: 8
      },
      itemStyle: {
        borderRadius: 4
      }       // RGB(197, 235, 184)
    },
    initialRouteName: 'Home',
    headerMode: 'screen'
  }
  );

  const managerDrawer = createDrawerNavigator({
    Home: DashStack
  });
  
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