import React, { Component } from 'react';
import { StyleSheet, TextInput, TextInputProps,Dimensions } from "react-native";
import colors from "../config/colors";


const ScreenWidth = Dimensions.get('screen').width - 50;
class FormTextInput extends Component {
  render() {
    const { style, ...otherProps } = this.props;
    return (
      <TextInput
        selectionColor={colors.DODGER_BLUE}
        style={[styles.textInput, style]}
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderColor: colors.BLACK,
    //borderColor: colors.SILVER,
    borderWidth: 1.5,
    borderRadius: 5,
    width: ScreenWidth,
    // borderTopWidth:  StyleSheet.hairlineWidth,
    // borderLeftWidth: StyleSheet.hairlineWidth,
    // borderRightWidth: StyleSheet.hairlineWidth,
    //borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  }
});

export default FormTextInput;