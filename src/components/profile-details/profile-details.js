import React, { Component } from 'react';
import "../../index.css";
import { Card, Avatar, Icon, Row, Col, Spin, Alert } from 'antd';
import Image from "../image/Image";
import moment from 'moment';
import API from '../../app/_shared/_services/api-services'

const { Meta } = Card;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patient: "",
            age: "",
            patientId: "",
            loading: false,
            error: ""
        };
    }

    getProfile() {
        this.setState({ loading: true }, () => {
            API.get(`patients/${this.state.patientId}`)
                .then(res => {
                    const patients = res.data.result;
                    localStorage.setItem("patients", JSON.stringify(patients))
                    this.setState({ patient: patients[0], loading: false });
                })
                .catch(function (error) {
                    this.setState({ loading: false, error: error })
                })
        })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.patientData != this.state.patientId) {
            this.setState({ patientId: nextProps.patientData }, () => {
                this.getProfile();
            })
        }
    }

    render() {

        const { patient, loading } = this.state;
        let age = "";
        if (patient) {
            age = moment().diff(patient.dob, 'years');
        }

        this.age = moment().diff(patient.dob, 'years');
        if (patient) {
            return (
                <div className="profileDetails">
                    <Card hoverable className="profile">
                        <div className="profileIcon">
                            {patient && patient.tbl_gender && patient.tbl_gender.name ? patient.tbl_gender.name === "Female" ?
                                (<i className="mdi mdi-human-female genderIco"></i>)
                                : (<i className="mdi mdi-human-male genderIco"></i>) : "-"}
                        </div>
                           <Meta style={{textTransform: 'capitalize'}} title={`${patient.first_name ? patient.first_name : "-"} ${patient.last_name ? patient.last_name : null}` } description={`ID: ${patient.id ? patient.id : "-"}`} />
                        <Row className="rowOne">
                            <Col xs={12} md={12}>
                                <label>NRIC no:</label>
                                <p key={patient.id}>{patient.nirc_number ? patient.nirc_number : "-"}</p>
                            </Col>
                            <Col xs={12} md={12}>
                                <label>Age:</label>
                                <p>{this.age} years</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <label>Blood Group:</label>
                                <p key={patient.id}>{patient && patient.tbl_bloodgroup && patient.tbl_bloodgroup.name ? patient.tbl_bloodgroup.name : "-"}</p>
                            </Col>
                            <Col xs={12} md={12}>
                                <label>Sex:</label>
                                <p key={patient.id}>{patient && patient.tbl_gender && patient.tbl_gender.name ? patient.tbl_gender.name : "-"}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <label>Mobile:</label>
                                <p key={patient.id}>{patient.mobile ? patient.mobile : "-"}</p>
                            </Col>
                            <Col xs={12} md={12}>
                                <label>Email:</label>
                                <p key={patient.id}>{patient.email ? patient.email : "-"}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <label>Preferred Store:</label>
                                <p>{patient.preferredstoreId ? patient.preferredstoreId : "-"}</p>
                            </Col>
                            <Col xs={12} md={12}>
                            </Col>
                        </Row>
                    </Card>
                </div>
            );
        }
        return (<div>
            {loading ? <Spin tip="Loading..." size="large">
                <Alert
                    message="Alert message title"
                    description="Further details about the context of this alert."
                    type="info"
                />
            </Spin> : <p className="noData">NO USER PROFILE</p>}
        </div>);
    }
}

export default Profile;
