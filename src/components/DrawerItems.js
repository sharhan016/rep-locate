import React, {Component} from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { NavigationActions, withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import colors from "../config/colors";
import * as api from '../config/api';
import AsyncStorage from '@react-native-community/async-storage';




class DrawerItems extends Component {
    navigateToScreen = async (route) => {
        if(!route){
            const keys = [api.LOGGED_IN, api.TOKEN, api.USER_TYPE]
            try {
                await AsyncStorage.multiRemove(keys)
            } catch (error) {
                console.log('error in removeItem',error)
            }
            return this.props.navigation.navigate('SignIn');
        }
        const navigate = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigate);
      }
    constructor(props){
        super(props);
    }
      render(){
    return(
    <TouchableOpacity style={styles.itemsContainer}
    onPress={ () => this.navigateToScreen(this.props.route) }>

              <Icon
                type='feather'
                size={18}
                name= {this.props.iconName} 
                containerStyle={styles.btnStyle}
                />
                <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{this.props.text}</Text>
                </View>
              </TouchableOpacity>
    );
    }
}
export default withNavigation(DrawerItems);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemsContainer: {
        paddingTop: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 2,
        marginBottom:0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.DRW_ITEMS
        //alignItems: 'flex-start'
    },
    btnStyle: {
        height: 45,
        padding: 5,
        paddingLeft: 35,
        paddingTop: 11,
        //backgroundColor: colors.ALMOND
        //width: 60
    },
    textContainer: {
        //backgroundColor: colors.ALMOND,
        paddingBottom: 7,
        paddingLeft: 15,
        justifyContent:'center',
    },
    textStyle: {
        fontSize: 14,
        fontWeight: '400'
    }
});