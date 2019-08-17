import React, { Component } from 'react';
import { Card, Row, Col, Icon } from 'antd';
import Image from "../image/Image";
import API from '../../app/_shared/_services/api-services';
import moment from 'moment';
import Item from 'antd/lib/list/Item';
const { Meta } = Card;


class Connection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            connections: [],
            age: "",
            connected_user_lists: [],
            patientId: "",
            error:""
        };

    }

    getConnections() {
        API.get(`patientConnection/search?patientId=${this.state.patientId}`)
        .then(res => {
            this.setState({ connections: res.data.result });
        })
        .catch(function (error) {
            this.setState({error:error})
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.patientData !== this.state.patientId) {
            this.setState({ patientId: nextProps.patientData}, () => {
                this.getConnections();
            })
        }
    }
    render() {
        const { connections } = this.state;
        let getPatientId = localStorage.getItem("userdata");
        const loginUsername = JSON.parse(localStorage.getItem("patients"))
        const getpatientName = localStorage.getItem("patientName");
        const resArray = connections;
        var finalResultArray = resArray.filter(data => data.patientId == getPatientId);
        var twoWayConnectedUsers = resArray.filter(data => data.patientId !== getPatientId);
        finalResultArray.forEach(element => {
            element.is_single = true;
            if (twoWayConnectedUsers.find(item => item.patientId === element.connectionId)) {
                element.is_single = false;
            }
        });
        if (connections.length > 0) {
            return (
                <div className="connections" id="section3" >
                    <Row>
                        <Col md={6}>
                            <h1 className="ConnectionsTitle">Connections</h1>
                            <p>Add or modify your connections at the pharmacy.</p>
                        </Col>
                        <Col md={18} >
                            <Row className="connection-cards" type="flex" justify="start">
                               
                                {finalResultArray.filter(connected => (true))
                                    .map((connection => {
                                        console.log("connection",connection)
                                        return <Col md={6} className="scrollCards" key={connection.id}>
                                            <Card className="ConnectionCards">
                                                <div className="profileIcon" key={connection.id}>
                                                    {connection.connectedUser.genderId === 1 ?
                                                        (<i className="mdi mdi-human-male genderIco"></i>)
                                                        : (<i className="mdi mdi-human-female genderIco"></i>)}
                                                    <div className="swapIcon">
                                                        {connection.is_single == false ? <Icon type="swap" /> : <Icon type="swap-right" />}
                                                    </div>
                                                </div>
                                                <div className="connectionsName">

                                                    <label key={connection.id} style={{textTransform: 'capitalize'}} >{`${connection.connectedUser.id !== getPatientId && connection.patientID !== getPatientId ? connection.connectedUser.first_name : null} ${connection.connectedUser.id !== getPatientId && connection.patientID !== getPatientId ? connection.connectedUser.last_name : null}`}</label>
                                                    <p>{connection.connectmobileedUser}</p>
                                                    <Row>
                                                        <Col md={12} xs={12} className="gender">
                                                            {connection.connectedUser.genderId === 1 ? (<p >Male</p>) : (<p >Female</p>)}
                                                        </Col>

                                                        <Col md={12} xs={12} className="age">
                                                            <p key={connection.id}>{moment().diff(connection.connectedUser.dob, 'years')}</p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>
                                        </Col>
                                    }))

                                }

                            </Row>
                        </Col>
                    </Row>
                </div>

            );
        }
        return (
            <div className="connections" id="section3">
                <Row>
                    <Col md={6}>
                        <h1 className="ConnectionsTitle">Connections</h1>
                        <p>Add or modify your connections at the pharmacy.</p>
                    </Col>
                    <Col md={18} >
                        <h1 className="noConnection">NO CONNECTIONS ESTABLISHED</h1>
                    </Col>
                </Row>
            </div>

        );
    }
}
export default Connection;