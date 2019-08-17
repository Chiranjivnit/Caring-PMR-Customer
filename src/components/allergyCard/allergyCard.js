import React, { Component } from 'react';
import { Row, Card, Col, Spin, Alert } from 'antd';
import "./allergyCard.css";
import Navbar from '../Navbar/Navbar';
import Banner from '../banner/banner';
import { BackTop } from 'antd';
// import Axios from 'axios';
import API from '../../app/_shared/_services/api-services'


class AllergyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allergies: [],
            symptoms: [],
            loading: false,
            error: ""
        };
    }
    componentDidMount() {
        let getPatientId = localStorage.getItem("userdata");
        this.setState({ loading: true }, () => {
            API.get(`allergies/search?patientId=${getPatientId}`)

                .then(res => {
                    console.log("allerige res",res)
                    this.setState({ allergies: res.data.result, loading: false });
                })
                .catch(function (error) {
                    //this.setState({ error: error })
                })
        })

    }

    renderColor = (alergy) => {
        if (alergy && alergy.tbl_outcome && alergy.tbl_outcome.name === "Resolved") {
            return <p className="outComeText" style={{ color: '#008973' }}>{`${alergy.tbl_outcome.name}`}</p>
        } else if (alergy && alergy.tbl_outcome && alergy.tbl_outcome.name === "Pending Follow") {
            return <p className="outComeText" style={{ color: '#96961c' }}>{`${alergy.tbl_outcome.name}`}</p>
        } else if (alergy && alergy.tbl_outcome && alergy.tbl_outcome.name === "Worse") {
            return <p className="outComeText" style={{ color: '#ea1a02' }}>{`${alergy.tbl_outcome.name}`}</p>
        } else {
            return <p className="outComeText">{alergy && alergy.tbl_outcome ? alergy.tbl_outcome.name : "-"}</p>
        }
    }

    render() {
        const { allergies, loading } = this.state;
        console.log("allergies", allergies);
        if (allergies.length > 0) {
            return (
                <div>
                    <Navbar history={this.props.history} />
                    <BackTop />
                    <Banner heading='Allergy'
                        content='Check your currently known allergies here'
                        src={require('../../assets/allergy-icon.png')} />
                    <section className="container">
                        <Row type="flex" justify="start">
                            {allergies.map(allergy =>{
                             if(allergy.tbl_patient_allergy_symptoms.length > 0)
                             return(
                                <Col className="cardsMargin" xxl={8} xl={7} lg={6} md={8} sm={11} xs={24} key={allergy.id}>
                                    <Card className="allergyCards">
                                        <div className="allergyCardTopContent">
                                            <p className="allergyTopText">{allergy && allergy.tbl_allergy.name ? `${allergy.tbl_allergy.name}` : "-"}&nbsp;<span className="subText">
                                            </span></p>
                                        </div>
                                        <div className="allergyCardContent">
                                            <Row className="allergyCardMargin" type="flex" justify="space-between">
                                                <Col span={12}>
                                                    <p className="severity">severity(%)</p>
                                                </Col>
                                                <Col span={12}>
                                                    <p className="percentage">{allergy && allergy.severity ? `${allergy.severity} %` : "0 %"}</p>
                                                </Col>
                                                <Col span={24}>
                                                    <span className="text-grey">SYMPTOMS:</span>
                                                    <p className="subTextTiltes">{allergy && allergy.tbl_patient_allergy_symptoms[0].tbl_symptom ? `${ allergy.tbl_patient_allergy_symptoms[0].tbl_symptom.name}` : "-"}</p>
                                                </Col>
                                                <Col span={24}>
                                                    <span className="text-grey">DESCRIPTION:</span>
                                                    <p className="subTextTiltes">{allergy && allergy.description ? `${allergy.description}` : "-"}</p>
                                                </Col>
                                                <Col span={24}>
                                                    <span className="text-grey">OUTCOME:</span>
                                                    {this.renderColor(allergy)}
                                                    {/* {allergy.tbl_outcome.name =="Resolved" ?(
                                    <p className="outComeText" style={{color:'#008973'}}>{`${allergy.tbl_outcome.name}`}</p>
                                   ):allergy.tbl_outcome.name =="Pending Follow" ?(
                                    <p className="outComeText" style={{color:'#96961c'}}>{`${allergy.tbl_outcome.name}`}</p>
                                   ):allergy.tbl_outcome.name =="Worse" ?(
                                    <p className="outComeText" style={{color:'#ea1a02'}}>{`${allergy.tbl_outcome.name}`}</p>
                                   ):(
                                    <p className="outComeText">{`${allergy.tbl_outcome.name}`}</p>
                                   )} */}
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </Col>
                             )}
                            )}
                        </Row>
                    </section>

                </div>

            );
        }
        return (
            <div>
                <Navbar history={this.props.history} />
                <BackTop />
                <Banner heading='Allergy'
                    content='Check your currently known allergies here '
                    src={require('../../assets/allergy-icon.png')} />
                {loading ? <Spin tip="Loading...">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info" />
                </Spin> :
                    <p className="noData">NO ALLERGIES FOUND</p>
                }
            </div>
        );
    }
}
export default AllergyCard;