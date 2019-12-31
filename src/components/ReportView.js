import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Button from '../components/Button.js';
import colors from '../config/colors';
import * as api from '../config/api';
import axios from "axios";
import { ConfirmDialog, Dialog, ProgressDialog } from 'react-native-simple-dialogs';



const screenWidth = Dimensions.get('screen').width - 30;

class ReportView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDialogVisible: false,
            rejectDialogVisible: false,
            progressVisible: false,
            tokenId: '',
            DcrId: ''
        }

        

    }
    static navigationOptions = {
        title: 'Report Detail'
    }
    componentDidMount() {
        const TokenID = this.props.navigation.getParam('TOKEN')
        const paramID = this.props.navigation.getParam('ID')
        this.setState({tokenId: TokenID, DcrId: paramID});
    }
    approveReport = async () => {
        console.log('Token Id inside approve report ',this.state.tokenId)
        const reportStat = await axios.post(api.APPROVE_DCR, {
            APIToken: this.state.tokenId,
            Data: this.state.DcrId
        }).then(res => {
            console.log('response ', res)
            if (res.status == 200)
                this.setState({ progressVisible: false, dialogVisible: true })
        })
            .catch(error => {
                this.setState({ progressVisible: false })
                console.log('error occured during approval of DCR ', error)
            })
    }
    render() {

        
        const paramRep = this.props.navigation.getParam('Rep')
        const paramBelt = this.props.navigation.getParam('Belt')
        const paramDoctor = this.props.navigation.getParam('Doctor')
        const paramChemist = this.props.navigation.getParam('Chemist')
        const paramFeedback = this.props.navigation.getParam('Feedback')
        const paramExpense = this.props.navigation.getParam('Expense')
        const paramLocation = this.props.navigation.getParam('Location')
        const paramIsAccompanied = this.props.navigation.getParam('IsAccompanied')

        // console.log(str.length)      
        // console.log(str.split(''))
        return (
            <View style={styles.container}>
                <View style={styles.inView}>

                    <View style={styles.miniContainer}>
                        <View style={styles.labelContainer}><Text style={styles.label}>Belt:</Text></View>
                        <View style={styles.hp}></View>
                        <View style={styles.reportContainer}><Text style={styles.report}>{paramBelt} </Text></View>
                        <View style={styles.hp}></View>
                    </View>

                    <View style={styles.miniContainer}>
                        <View style={styles.labelContainer}><Text style={styles.label}>Representative:</Text></View>
                        <View style={styles.hp}></View>
                        <View style={styles.reportContainer}><Text style={styles.report}>{paramRep} </Text></View>
                        <View style={styles.hp}></View>
                    </View>

                    <View style={styles.miniContainer}>
                        <View style={styles.labelContainer}><Text style={styles.label}>{
                            paramDoctor != null ? 'Doctor' : 'Chemist'}
                        </Text></View>
                        <View style={styles.hp}></View>
                        <View style={styles.reportContainer}><Text style={styles.report}>{paramDoctor != null ? paramDoctor : paramChemist} </Text></View>
                        <View style={styles.hp}></View>
                    </View>

                    <View style={styles.miniContainer}>
                        <View style={styles.labelContainer}><Text style={styles.label}>Is Accompanied:</Text></View>
                        <View style={styles.hp}></View>
                        <View style={styles.reportContainer}><Text style={styles.report}>{paramIsAccompanied} </Text></View>
                        <View style={styles.hp}></View>
                    </View>

                    <View style={styles.miniContainer}>
                        <View style={styles.labelContainer}><Text style={styles.label}>Feedback:</Text></View>
                        <View style={styles.hp}></View>
                        <View style={styles.reportContainer}><Text style={styles.report}>{paramFeedback} </Text></View>
                        <View style={styles.hp}></View>
                    </View>

                    <View style={styles.miniContainer}>
                        <View style={styles.labelContainer}><Text style={styles.label}>Expense:</Text></View>
                        <View style={styles.hp}></View>
                        <View style={styles.reportContainer}><Text style={styles.report}>{paramExpense} </Text></View>
                        <View style={styles.hp}></View>
                    </View>

                    <View style={styles.miniContainer}>
                        <View style={styles.labelContainer}><Text style={styles.label}>Location:</Text></View>
                        <View style={styles.hp}></View>
                        <View style={styles.reportContainer}><Text style={styles.report}>{paramLocation} </Text></View>
                        <View style={styles.hp}></View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button label='Reject' onPress={() => { this.setState({ rejectDialogVisible: true }) }} style={{ width: '45%', backgroundColor: '#d42424' }} />
                        <Button label='Approve' onPress={() => {
                            this.setState({ progressVisible: true })
                            this.approveReport()
                        }} style={{ width: '45%', backgroundColor: 'green' }} />
                    </View>
                </View>

                <ConfirmDialog
                    title="Confirmation"
                    message="Approve DCR?"
                    visible={this.state.confirmDialogVisible}
                    onTouchOutside={() => this.setState({ confirmDialogVisible: false })}
                    positiveButton={{
                        title: "YES",
                        onPress: () => alert("Yes touched!")
                    }}
                    negativeButton={{
                        title: "NO",
                        onPress: () => this.setState({ confirmDialogVisible: false })
                    }}
                />

                <ConfirmDialog
                    title="Rejection"
                    message="Reject DCR?"
                    visible={this.state.rejectDialogVisible}
                    onTouchOutside={() => this.setState({ rejectDialogVisible: false })}
                    positiveButton={{
                        title: "YES",
                        onPress: () => alert("Yes touched!")
                    }}
                    negativeButton={{
                        title: "NO",
                        onPress: () => this.setState({ rejectDialogVisible: false })
                    }}
                />

                <Dialog
                    visible={this.state.dialogVisible}
                    title="Custom Dialog"
                    onTouchOutside={() => this.setState({ dialogVisible: false })} >
                    <View>
                        <Text>Success</Text>
                    </View>
                </Dialog>

                <ProgressDialog
                    visible={this.state.progressVisible}
                    title="Progress Dialog"
                    message="Please, wait..."
                />

            </View>
        );
    }
}
export default ReportView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.GREY_ICON,
        justifyContent: 'flex-start'
    },
    inView: {
        width: screenWidth,
        backgroundColor: colors.BG_LOGIN,
        marginTop: 20,
        paddingLeft: 3,
        paddingTop: 10,
        justifyContent: 'space-evenly',
        height: 500
    },
    label: {
        fontSize: 19,
        textDecorationLine: 'underline'
    },
    labelContainer: {
        padding: 5,

    },
    report: {
        fontSize: 18
    },
    reportContainer: {
        padding: 5,
        width: screenWidth - 100,
    },
    miniContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    hp: {
        paddingHorizontal: 5
    },
    buttonContainer: {
        //marginTop: 15,
        justifyContent: 'space-between',
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10
    }
});