import React, { Component } from 'react';
import Banner from '../banner/banner';
import Navbar from '../Navbar/Navbar';
import { Button, Row, Col, Card, DatePicker, Icon, Spin, Alert } from 'antd';
import './moreRemainders.css';
import {BackTop} from 'antd';
import API from '../../app/_shared/_services/api-services'
import Moment from 'react-moment';
import moment from 'moment';

class MoreRemainders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reminders:{},
            prescReminders:[],
            testReminders:[],
            totalReminders:[],
            totalRem:[],
            today:moment().toDate(),
            tomorrow:moment().add(1,'days').toDate(),
            dayAfterTmw:moment().add(2,'days').toDate(),
            loading:false,
            first_name:''
        };
    }
    componentDidMount() {
        let getPatientId = localStorage.getItem("userdata");
        this.setState({ loading:true},()=>{
            API.get(`reminder/search?patientId=${getPatientId}`)
            .then(res => {
                let reminders = res.data.result;
                console.log("reminders",reminders)
                            let prescReminders = reminders && reminders.prescription ? reminders.prescription : [];
                            let testReminders = reminders && reminders.test ? reminders.test : [];
                            let totalRem = prescReminders.concat(testReminders);
                            let totalReminders = prescReminders.concat(testReminders);
                            this.setState({ loading: false, 
                                reminders, 
                                prescReminders, 
                                testReminders, 
                                totalRem, 
                                totalReminders,
                                first_name: res.data.result.prescription[0].tbl_patients_entity.first_name
                             });
                            // this.setState({ reminders: res.data.result });
                            // this.setState({ prescReminders: this.state.reminders && this.state.reminders.prescription ? this.state.reminders.prescription : []});
                            // this.setState({ testReminders: this.state.reminders && this.state.reminders.test ? this.state.reminders.test : []});
                            // this.setState({ totalRem:this.state.prescReminders.concat(this.state.testReminders)});
                            // this.setState({ totalReminders:this.state.prescReminders.concat(this.state.testReminders)});

            })
            .catch(function (error) {
                this.setState({loading:false})
                console.log("#########",error);
            })
        })
       

       
    }

    _presc=()=>{
      this.setState({totalReminders:this.state.reminders.prescription})
    }

    _service=()=>{
        this.setState({totalReminders:this.state.reminders.test})
    }

    _All=()=>{
        this.setState({totalReminders:this.state.totalRem})
    }

    _message = (remi) => {
        if(remi.reminderType === "Prescription Reminder"){
            return <p><span style={{textTransform: 'capitalize'}}>{remi.tbl_patients_entity.first_name}'s</span> medicine may be finishing soon. Please be reminded to
                 refill your prescription at CARiNG pharmacy.</p>
        }
        else{
            return<p>Please be remainded of { <span style={{textTransform: 'capitalize'}} >{this.state.first_name}</span> } appointment with CARiNG pharmacist in {remi.tbl_patients_entity.preferredstoreId} is on {' '} 
            <Moment format="DD-MM-YYYY">{remi.reminderDate}</Moment>{" "} at {" "}{remi.followUpTime}
            </p>
        }
    }

    render() {
        const { reminders,today,tomorrow,dayAfterTmw} =this.state;
        const { totalReminders,totalRem,testReminders,loading } =this.state;
        if(reminders && Object.keys(reminders).length >0){
        return(
            <div>
                <Navbar history={this.props.history}/>
                <BackTop/>
                <Banner 
                 heading='Reminders'
                 content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                 Ut pretium pretium tempor. 
                 Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. '
                 src={require("../../assets/reminder-icon.png")}/>

                 {/*remind-me-for-buttons*/}
                 <section className="remindMeButtonsSection">  
                 
                 </section>

                 {/* all-remainder-cards-section */}
                 <section className="container">
                <Row type="flex" justify="start">
                    <Col xxl={4} xl={3} lg={4} md={5} sm={6}  xs={16}>
                    <p className="label">Remind me for:</p>
                    </Col>
                    <Col >
                    <Button className="remindMeButtons" onClick={this._All}>ALL Reminders</Button>
                    <Button className="remindMeButtons" onClick={this._presc}>Prescription Refill</Button>
                    <Button className="remindMeButtons" onClick={this._service}> Appointment</Button>
                    </Col>       
                </Row>

                 <Row type="flex" justify="start" className="moreRemainderCards">
                 {totalReminders.map(remi=>
                 <Col className="cardSections" xxl={7} xl={6} lg={10} md={12} sm={23} xs={24} key={remi.id}>
                        <Card className="cards"
                            hoverable>
                            <div className="card-title">
                                <h2 className="bold-text">{remi.reminderType?<p>Prescription Refill</p>:null}{remi.remindertype && <p className="bold-text">Appointment</p>}</h2>
                            </div>
                            <section className="datePicker">
                                <Row type="flex" justify="space-between">
                                    <Col lg={16} md={20} xs={14}>
                                    <p><Moment format="DD-MM-YYYY">{remi.reminderDate}</Moment></p>
                                    </Col>
                                    <Col lg={8} md={4} xs={8}>
                                        {remi.reminderType==="Prescription Reminder"?
                                    (<p></p>):
                                    (<p>{remi.followUpTime}</p>)
                                    }
                                    </Col>
                                </Row>
                            </section>
                               <div className="messageSection">
                                            <Icon className="message-icon" type="mail" theme="filled" /> Message:
                                            {this._message(remi)}
                            </div>
                         </Card>
                    </Col>
                 )}
                 </Row>
                 </section>
            </div>
        );
    }
    return (<div>
    <Navbar history={this.props.history}/>
    <BackTop/>
    <Banner 
     heading='Remainders'
     content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
     Ut pretium pretium tempor. 
     Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. '
     src={require("../../assets/reminder-icon.png")}/>
    { loading ? <Spin tip="Loading...">
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
    </Spin>:<p className="noData"> REMAINDERS FOUND</p> } 
     </div>
     );
    }
}

export default MoreRemainders;