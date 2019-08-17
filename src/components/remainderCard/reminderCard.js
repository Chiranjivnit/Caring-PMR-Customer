import React, { Component } from 'react';
import { Card, Row, Col, Icon, Spin, Alert } from 'antd';
import './remainderCard.css';
import { Link } from 'react-router-dom';
import API from '../../app/_shared/_services/api-services'
import Moment from 'react-moment';
import moment from 'moment';
import { DATE_FORMATE } from '../../constants';

class RemainderCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reminders: [],
            prescReminders: [],
            testReminders: [],
            totalReminders: [],
            today: moment().format(DATE_FORMATE),
            tomorrow: moment().add(1, "days").format(DATE_FORMATE),
            dayAfterTmw: moment().add(2, "days").format(DATE_FORMATE),
            patientId: "",
            loading: false,
            error: "",
            first_name:''
        };
    }

    getReminders=()=> {
        this.setState({ loading: true }, () => {
            API.get(`reminder/search?patientId=${this.state.patientId}`)
                .then(res => {
                    this.setState({ reminders: res.data.result, loading: false, first_name: res.data.result.prescription[0].tbl_patients_entity.first_name });
                    this.setState({ prescReminders: this.state.reminders.prescription });
                    this.setState({ testReminders: this.state.reminders.test });
                    this.setState({ totalReminders: this.state.prescReminders.concat(this.state.testReminders) });

                })
                .catch( (error)=> {
                    this.setState({ loading: false, error: error })

                })
        })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.patientData !== this.state.patientId) {
            this.setState({ patientId: nextProps.patientData }, () => {
                this.getReminders();
            })
        }
    }
    _message = (remi) => {
        if (remi.reminderType === "Prescription Reminder") {
            return <p><span style={{textTransform: 'capitalize'}}>{remi.tbl_patients_entity.first_name}'s</span> medicine may be finishing soon. Please be reminded to
                 refill your prescription at CARiNG pharmacy.</p>
        }
        else {
            return <p>Please be reminded of {<span style={{textTransform: 'capitalize'}}>{this.state.first_name}</span> } appointment with CARiNG pharmacist in {remi.tbl_patients_entity.preferredstoreId} is on {' '}
                <Moment format="DD-MM-YYYY">{remi.reminderDate}</Moment>{" "} at {" "}{remi.followUpTime}
            </p>
        }
    }

    render() {
        const { totalReminders, today, tomorrow, dayAfterTmw, loading } = this.state;
        let filter = this.state.totalReminders.filter((item) => {
            item.created_at = moment(item.reminderDate).format(DATE_FORMATE);
            return (item.created_at === today) || (item.created_at === tomorrow) || (item.created_at === dayAfterTmw);
        });
        if (filter.length > 0) {
            return (
                <div>
                    <Row>
                        <Col xxl={5} xl={5} lg={24} md={24} sm={24} xs={24}>
                            <Row className="dont-miss">
                                <div className="text-for-small-screen">

                                    <Col md={24} xs={15} className="p0">
                                        <h1 className="dont-miss-these">Don't miss these...</h1>
                                    </Col>
                                    <Col md={24} xs={9} className="p0">
                                        <Link className="view-all-remainder text-center" to="/allRemainders"> View all reminders</Link>
                                    </Col>
                                </div>
                            </Row>

                        </Col>
                        <Col xxl={19} xl={19} lg={19} md={19} sm={19} xs={24}>
                            <Row className="remainder-cards" type="flex" justify="start">
                                {filter.map(remi =>
                                    <Col className="scrollCards" xxl={5} xl={6} lg={10} md={12} sm={23} xs={24} key={remi.id} >
                                        <Card className="cards"
                                            style={{
                                                borderBottom: `${remi.tbl_patients_entity.is_active}` === "0" ?
                                                    ("5px solid #00706347")
                                                    : ("5px solid #007063")
                                            }}

                                            hoverable>
                                            <div className="card-title">
                                                <h2 className="bold-text">{remi.reminderType}{remi.remindertype && <p className="bold-text">Appointment</p>}</h2>
                                            </div>
                                            <section className="datePicker">
                                                <Row type="flex" justify="space-between">
                                                    <Col lg={16} md={20} xs={14}>
                                                        <p><Moment format="DD-MM-YYYY">{remi.reminderDate}</Moment></p>
                                                    </Col>
                                                    <Col lg={8} md={4} xs={8}>
                                                        {remi.reminderType === "Prescription Reminder" ?
                                                            (<p></p>) :
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
                        </Col>
                    </Row>

                </div>

            );
        }
        return (
            <div>
                <Row>
                    <Col xxl={5} xl={5} lg={24} md={24} sm={24} xs={24}>
                        <Row className="dont-miss">
                            <div className="text-for-small-screen">

                                <Col md={24} xs={15} className="p0">
                                    <h1 className="dont-miss-these">Don't miss these...</h1>
                                </Col>
                                <Col md={24} xs={9} className="p0">
                                    <Link className="view-all-remainder text-center" to="/allRemainders"> View all remainders</Link>
                                </Col>
                            </div>
                        </Row>

                    </Col>
                    <Col xxl={19} xl={19} lg={19} md={19} sm={19} xs={24}>
                        {loading ? <Spin tip="Loading...">
                            <Alert
                                message="Alert message title"
                                description="Further details about the context of this alert."
                                type="info" />
                        </Spin> :
                            <p className="noData">NO RECENT REMINDER FOUND</p>
                        }
                    </Col>
                </Row>

            </div>
        );
    }
}
export default RemainderCard;
