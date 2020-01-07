import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground, ToastAndroid } from "react-native";
import { Card, ListItem, Icon } from 'react-native-elements'
import Button from '../components/Button.js';
import Header from '../components/HeaderBack';
import colors from '../config/colors';
import * as api from '../config/api';
import axios from "axios";
import ReportList from '../components/reportList';
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
            DcrId: '',
            message: 'DCR Approval Success',
            dialogVisible: false
        }


    }
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        const TokenID = this.props.navigation.getParam('TOKEN')
        const paramID = this.props.navigation.getParam('ID')
        this.setState({ tokenId: TokenID, DcrId: paramID });
    }
    approveReport = async () => {
        console.log('Token Id inside approve report ', this.state.tokenId)
        
        const reportStat = await axios.post(api.APPROVE_DCR, {
            APIToken: this.state.tokenId,
            DcrID: this.state.DcrId
        }).then(res => {
            console.log('response ', res)
            if (res.status == 200){
                this.setState({ message: res.data.Message, progressVisible: false })
                ToastAndroid.show("Approval Success", ToastAndroid.LONG);
                this.props.navigation.navigate('Dashboard')
            }               
        })
            .catch(error => {
                this.setState({ progressVisible: false })
                this.props.navigation.navigate('DcrList')
                console.log('error occured during approval of DCR ', error)
            })
    }
    render() {


        const paramRep = this.props.navigation.getParam('Rep')
        const paramBelt = this.props.navigation.getParam('Belt')
        const paramDoctor = this.props.navigation.getParam('Doctor')
        const paramManager = this.props.navigation.getParam('Manager')
        const paramChemist = this.props.navigation.getParam('Chemist')
        const paramFeedback = this.props.navigation.getParam('Feedback')
        const paramExpense = this.props.navigation.getParam('Expense')
        const paramLocation = this.props.navigation.getParam('Location')
        const paramIsAccompanied = this.props.navigation.getParam('IsAccompanied')


        return (
            <ImageBackground
            source={require('../assets/report-image.jpg')}
            style={styles.backgroundContainer}
            >
                <Header 
                heading='Report'
                onPress={ () => this.props.navigation.goBack()}
                />
            {/* <View style={styles.container}> */}

                <Card 
                title="Report" 
                titleStyle={styles.title}
                containerStyle={styles.cardContainer}
                >

                   <ReportList label='Belt' value={paramBelt} />
                   <ReportList label='Representative' value={paramRep} />
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
                        <View style={styles.reportContainer}><Text style={styles.report}>{paramIsAccompanied == 1 ? paramManager : 'No' } </Text></View>
                        <View style={styles.hp}></View>
                    </View>
                   <ReportList label='Feedback' value={paramFeedback} />
                   <ReportList label='Expense' value={paramExpense} />
                   {/* <ReportList label='Location' value={paramLocation} /> */}

                   <View style={styles.buttonContainer}>
                        <Button label='Approve' onPress={() => {
                            this.setState({ progressVisible: true })
                            this.approveReport()
                        }} style={{ width: '45%', backgroundColor: 'green' }} />
                    </View>

                </Card>

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


                <Dialog
                    visible={this.state.dialogVisible}
                    title={this.state.message}
                    dialogStyle={styles.dialogStyle}
                    titleStyle={styles.dialogTitleStyle}
                    onTouchOutside={() => {
                        this.setState({ dialogVisible: false })
                        this.props.navigation.navigate('Dashboard')}
                        } >
                    <View style={{alignItems: 'center',}}>
                        <View style={{marginTop: 45}}></View>
                        <Button label='OK'
                         onPress={() => this.props.navigation.navigate('Dashboard') } 
                         style={{width: '40%', backgroundColor: colors.BT_ORANGE,}} />
                    </View>
                </Dialog>

                <ProgressDialog
                    visible={this.state.progressVisible}
                    title="Approving Report"
                    message="Please wait..."
                    dialogStyle={styles.dialogStyle}
                    titleStyle={styles.dialogTitleStyle}
                    messageStyle={{color: colors.WHITISH}}
                />



                
                {/* <View style={styles.inView}>

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
                        <View style={styles.reportContainer}><Text style={styles.report}>{paramIsAccompanied == 1 ? paramManager : 'No' } </Text></View>
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
                    onTouchOutside={() => {
                        this.setState({ dialogVisible: false })
                        this.props.navigation.navigate('Dashboard')}
                        } >
                    <View>
                        <Text>Success</Text>
                    </View>
                </Dialog>

                <ProgressDialog
                    visible={this.state.progressVisible}
                    title="Progress Dialog"
                    message="Please, wait..."
                /> */}

            {/* </View> */}
            </ImageBackground>
        );
    }
}
export default ReportView;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //alignItems: 'center',
        backgroundColor: colors.GREY_ICON,
        //justifyContent: 'flex-start'
    },
    inView: {
        width: screenWidth,
        //backgroundColor: colors.BG_LOGIN,
        marginTop: 20,
        paddingLeft: 3,
        paddingTop: 10,
        justifyContent: 'space-evenly',
        height: 500
    },
    label: {
        fontSize: 17,
        color: colors.BT_ORANGE,
        //textDecorationLine: 'underline'
    },
    labelContainer: {
        paddingLeft: 10,
        paddingTop: 7
    },
    report: {
        fontSize: 18,
        color: colors.WHITE
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        marginRight: 10,
        marginLeft: 10
    },
    title: {
        backgroundColor: colors.INPUT_LABEL,
        height: 50,
        fontSize: 18,
        paddingRight: 20,
        paddingTop: 10
        
    },
    cardContainer: {
        backgroundColor: colors.BG_LOGIN,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight:0,
        paddingBottom: 0,
        marginTop: 60
    },
    backgroundContainer: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    dialogStyle: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        backgroundColor: colors.BG_LOGIN,
        borderColor: colors.WHITISH,
        color: colors.WHITISH
    },
    dialogTitleStyle: {
        textAlign: 'center',
        backgroundColor: colors.GREY_ICON,
        padding: 0,
        paddingTop: 5,
        margin: 0,
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        //borderTopLeftRadius: 10,
        //borderWidth: 1
    },
    messageStyle: {
        fontSize: 18,
        fontFamily: 'muli',
        textAlign: 'center'
    },

});














{/* <Button label='Reject' onPress={() => { this.setState({ rejectDialogVisible: true }) }} style={{ width: '45%', backgroundColor: '#d42424' }} /> */ }
