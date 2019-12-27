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




class DrawerItems extends Component {
    navigateToScreen = (route) => {
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
        fontSize: 16,
        fontWeight: '500'
    }
});