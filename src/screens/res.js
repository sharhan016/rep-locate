import React, {Component} from 'react';
import { View,StyleSheet,TextInput,Button} from 'react-native';
import DialogInput from 'react-native-dialog-input';

export default class App extends Component {
  constructor(props) {
  super(props);
  this.state = { isAlertVisible:false };
}
  submit(inputText){
    console.log(inputText);
    this.setState({isAlertVisible:false})
  }
    render() {
     return (
       <View style={styles.container}>
         <Button title="Open" onPress={()=>this.setState({isAlertVisible:true})} />
         
         <DialogInput isDialogVisible={this.state.isAlertVisible}
                     title={"Event"}
                     message={"Your belt name"}
                     hintInput ={"calicut"}
                     submitInput={ (inputText) => {this.submit(inputText)} }
                     closeDialog={ () =>this.setState({isAlertVisible:false})}>
         </DialogInput>
       </View>
       );
   }
}

const styles = StyleSheet.create({
  myInput: {
    backgroundColor: 'rgb(232, 232, 232)',
    borderRadius: 30,
    height: 40,
    width: '90%'},

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8ee3ab',
  },
});