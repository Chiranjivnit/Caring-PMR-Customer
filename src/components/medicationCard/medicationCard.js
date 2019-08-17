import React, { Component } from 'react';
import './medicationCard.css';
import { Row, Col, Card, Button, Icon, BackTop, Menu, Dropdown, Spin, Alert } from 'antd';
import Navbar from '../Navbar/Navbar';
import Banner from '../banner/banner';
import API from '../../app/_shared/_services/api-services'
import Moment from 'react-moment';

class MedicationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicines: [],
            filterMedices: [],
            loading: false,
            
        };
    }

    componentDidMount() {
        let getPatientId = localStorage.getItem("userdata");
        this.setState({ loading: true }, () => {
            API.get(`medication/search?patientId=${getPatientId}`)

                .then(res => {
                    this.setState({ medicines: res.data.result, filterMedices: res.data.result, loading: false });

                })
                .catch(function (error) {
                    this.setState({ loading: false,  })
                })
        })

    }
    handleMenuClick = (e) => {
        if (e.key === "all") {
            this.setState({ filterMedices: this.state.medicines });
        } else {
            let filter = this.state.medicines.filter((item) => {
                if (e.key === "active") {
                    return item.is_active > 0;
                } else if (e.key === "inactive") {
                    return item.is_active === 0;
                }
            });

            this.setState({ filterMedices: filter });
        }
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="all">
                    <a target="_blank">
                        ALL
                </a>
                </Menu.Item>
                <Menu.Item key="active">
                    <a target="_blank">
                        ACTIVE
                </a>
                </Menu.Item>
                <Menu.Item key="inactive">
                    <a target="_blank">
                        DISCONTINUED
                </a>
                </Menu.Item>
            </Menu>
        );


        const { medicines, filterMedices, loading } = this.state;
        if (medicines.length > 0) {
            return (
                <div>
                    <Navbar history={this.props.history} />
                    <BackTop />
                    <Banner
                        heading='Medication'
                        content='Check your current list of your medications here.  '
                        src={require('../../assets/medication-icon.png')} />

                    <section className="container">
                        <Row type="flex" justify="end">
                            <Col>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Button className="filterButton">Filter<Icon type="filter" theme="filled" /></Button>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row type="flex" justify="start">
                            {filterMedices.map(medi =>
                                <Col className="cardsMargin" xxl={8} xl={8} lg={9} md={10} sm={15} xs={24} key={medi.id}>
                                    <Card className="medicationCard"
                                        style={{
                                            borderBottom: `${medi.is_active}` === "0" ?
                                                ("5px solid #00706347")
                                                : ("5px solid #007063")
                                        }}
                                        hoverable>
                                        <div className="medicationCardTopContent">
                                            {medi && medi.tbl_medicine && medi.tbl_medicine.name ? medi.tbl_medicine.name : "-"}
                                        </div>
                                        <div className="medicationCardContent">
                                            <p className="dosage">{medi && medi.instructions ? medi.instructions : "-"}</p>
                                            <Row type="flex" justify="space-between">
                                                <Col span={12}>
                                                    <p className="dosageTimings"><Icon className="dosageIcon" type="clock-circle" /> {medi && medi.duration ? medi.duration : "-"} <span>{medi && medi.tbl_duration && medi.tbl_duration.durationType ? medi.tbl_duration.durationType : "-"}</span></p>
                                                </Col>
                                                <Col span={12}>
                                                    <p className="dosageTimings"><Icon className="dosageIcon" type="calendar" />&nbsp;
                                <span><Moment format="DD-MM-YYYY">{medi && medi.lastDate ? medi.lastDate : "-"}</Moment></span>
                                                    </p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>
                                </Col>
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
                <Banner
                    heading='Medication'
                    content='Check your current list of your medications here. '
                    src={require('../../assets/medication-icon.png')} />
                {loading ? <Spin tip="Loading...">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin> : <p className="noData">NO MEDICATION FOUND</p>
                }
            </div>
        );
    }
}
export default MedicationCard;