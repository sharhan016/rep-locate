import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import colors from "../config/colors";



class Button extends Component {
  render() {
    const { style, label, onPress, textStyle } = this.props;
    return (
      <TouchableHighlight style={[styles.container, style]} onPress={onPress}>
        <Text style={[styles.text,textStyle]}>{label}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.DODGER_BLUE,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)",
    elevation: 1,
  },
  text: {
    color: colors.WHITE,
    textAlign: "center",
    height: 23,
    fontSize: 15
  }
});

export default Button;