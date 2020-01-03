import React, { Component } from "react";
import { View,Text,StyleSheet, ActivityIndicator,StatusBar} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import * as api from '../config/api';

class LogOut extends Component {
    state = {  }
    componentDidMount() {
        this.logOut();
      } 
      

    // logOut = async () => {
    //         const keys = [api.LOGGED_IN, api.TOKEN, api.USER_TYPE]
    //         try {
    //             await AsyncStorage.multiRemove(keys)
    //         } catch (error) {
    //             console.log('error in removeItem',error)
    //         }
    //         this.props.navigation.navigate('SignIn');
        
    // }
      logOut = async () => {
          const FALSE = 'false';
          const EMPTY = '';
          try{
              await AsyncStorage.setItem(api.LOGGED_IN,FALSE)
              await AsyncStorage.setItem(api.TOKEN,EMPTY)
              await AsyncStorage.setItem(api.USER_TYPE,EMPTY)

          } catch(error){
              console.log('error in remove Item from LOGOUT PAGE')
          }
          this.props.navigation.navigate('SignIn');
      }

    render() {
        //const Indicator = <ActivityIndicator animating = {this.state.loading} color = '#bc2b78' size = "large" style = {styles.activityIndicator}/>

        return (
            <View style={styles.container}>
               <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
export default LogOut;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
     }
});