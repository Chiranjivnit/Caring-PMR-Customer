import React, { Component } from 'react';
import { Row, Col, Card, Button, } from 'antd';
import './symptomCard.css';
import medicine from '../../assets/medicine-2.png';
import allergy from '../../assets/aadc-47389-e.png';
import healthreport from '../../assets/health-report.png';
import { Link } from 'react-router-dom';

class SymptomCard extends Component {
    render() {
        return (
            <div className="backgroundPink" id="section2">
                <section className="container-for-symptomCard  symptomsBlock">
                    <Row type="flex" justify="center" className="symptomCard">
                        <Col xxl={8} xl={8} lg={10} md={13} sm={15} xs={24}>
                            <Card hoverable className="cardsImageBackground">
                                <div className="symptomsTopContent">
                                    <Row>
                                        <Col className="card-images" span={10}>
                                            <img src={medicine} alt="medicine"/>
                                        </Col>
                                        <Col span={12}>
                                            <p className="symptom-title">Medication</p>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="cardContent">
                                    <p className="card-para">Check your current list of your medications here.</p>
                                    <Link to="/medicaionCards"> <Button className="view-btn">VIEW</Button></Link>
                                </div>
                            </Card>
                        </Col>
                        <Col xxl={8} xl={8} lg={10} md={13} sm={15} xs={24}>
                            <Card hoverable className="cardsImageBackground">
                                <div className="symptomsTopContent">
                                    <Row>
                                        <Col className="card-images" span={10}>
                                            <img className="allergy-image" src={allergy} alt="allergy" />
                                        </Col>
                                        <Col span={12}>
                                            <p className="symptom-title">Allergy</p>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="cardContent">
                                    <p className="card-para">Check your currently known allergies here.</p>
                                    <Link to="/allergyCard"><Button className="view-btn">VIEW</Button></Link>
                                </div>
                            </Card>
                        </Col>
                        <Col xxl={8} xl={8} lg={10} md={13} sm={15} xs={24}>
                            <Card hoverable className="cardsImageBackground">
                                <div className="symptomsTopContent">

                                    <Row >
                                        <Col className="card-images" span={10}>
                                            <img src={healthreport} alt="healthreport" />
                                        </Col>
                                        <Col span={12}>
                                            <p className="symptom-title">Pharmacy Test</p>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="cardContent">
                                    <p className="card-para">Check your previously done pharmacy tests here.</p>
                                    <Link to="./pharmacy"><Button className="view-btn">VIEW</Button></Link>
                                </div>
                            </Card>
                        </Col>

                    </Row>
                </section>
            </div>

        );
    }
}
export default SymptomCard;
