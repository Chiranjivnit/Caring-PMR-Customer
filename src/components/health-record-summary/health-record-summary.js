import React, { Component } from 'react';
import { Card, Row, Col, Button, Collapse } from 'antd';
import HealthBlock from '../healthRecordBlock/health-record-block';
import MobileBlock from '../mobileHealthRecordBlock/mobileHealthRecordBlock';
import LipidGluBlock from '../lipidGluBlock/lipid-glu-block';
import "../../index.css";
import Moment from 'react-moment';
import API from '../../app/_shared/_services/api-services';


const { Panel } = Collapse;

class HealthRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [],
            latestHistory: [],
            bloodPressure: '',
            editHealthRecord: false,
            addHealthRecord: false,
            height: "",
            weight: "",
            sp: "",
            dp: "",
            pulse: "",
            ua: "",
            fat: "",
            waist: "",
            pfr: "",
            TC: "",
            HDL: "",
            Triglyceride: "",
            LDL: "",
            FBS: "",
            RBS: "",
            HbA1c: "",
            bmi: "",
            num1: "",
            num2: "",
            result: "",
            patientId: "",
            x: ["1", "2", "3", "4", "5", "6"],
            popOpen: false
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.patientData !== this.state.patientId) {
            this.setState({ patientId: nextProps.patientData }, () => {
                this.getPatient();
            })
        }
    }

    getPatient() {
        API.get(`healthrecord?patientId=${this.state.patientId || 1}`)
            .then(res => {
                this.setState({ history: res.data.result });
                let length = this.state.history.length - 1;
                let latestHistory = this.state.history[length];
                this.setState({
                    latestHistory: this.state.history[length],
                    height: latestHistory.height,
                    weight: latestHistory.weight,
                    sp: latestHistory.systolic_pressure,
                    dp: latestHistory.diastolic_pressure,
                    pulse: latestHistory.pulse,
                    ua: latestHistory.ua,
                    fat: latestHistory.body_fat,
                    waist: latestHistory.waist_circumference,
                    pfr: latestHistory.peak_flow_rate,
                    TC: latestHistory.total,
                    HDL: latestHistory.hdl,
                    Triglyceride: latestHistory.trigrlyceride,
                    LDL: latestHistory.ldl,
                    FBS: latestHistory.fbs,
                    RBS: latestHistory.rbs,
                    HbA1c: latestHistory.hbc1,
                    bmi: latestHistory.bmi
                });
            })
            .catch(function (error) {
                console.log(error, "##error##");
            });
    }

    _addHealthRecord = () => {

        let latestHistory = this.state.latestHistory;
        this.setState({
            addHealthRecord: !this.state.addHealthRecord,
            height: latestHistory.height,
            weight: latestHistory.weight,
            sp: "",
            dp: "",
            pulse: "",
            ua: "",
            fat: "",
            waist: "",
            pfr: "",
            TC: "",
            HDL: "",
            Triglyceride: "",
            LDL: "",
            FBS: "",
            RBS: "",
            HbA1c: "",
            popOpen: !this.popOpen
        });
    }

    _editHealthRecord = () => {
        let latestHistory = this.state.latestHistory;
        this.setState({
            editHealthRecord: !this.state.editHealthRecord,
            height: latestHistory.height ? latestHistory.height : "",
            weight: latestHistory.weight,
            sp: latestHistory.systolic_pressure,
            dp: latestHistory.diastolic_pressure,
            pulse: latestHistory.pulse,
            ua: latestHistory.ua,
            fat: latestHistory.body_fat,
            waist: latestHistory.waist_circumference,
            pfr: latestHistory.peak_flow_rate,
            TC: latestHistory.total,
            HDL: latestHistory.hdl,
            Triglyceride: latestHistory.trigrlyceride,
            LDL: latestHistory.ldl,
            FBS: latestHistory.fbs,
            RBS: latestHistory.rbs,
            HbA1c: latestHistory.hbc1,
            popOpen: !this.popOpen
        });
    }

    _cancel = () => {
        this.setState({ editHealthRecord: false, addHealthRecord: false });
    }

    _onChangeheight(event) {
        this.setState({ height: event.target.value });
    }

    _onChangeWeight(event) {
        this.setState({ weight: event.target.value });
    }

    _onChangeSP(event) {
        this.setState({ sp: event.target.value });
    }
    _onChangeDP(event) {
        this.setState({ dp: event.target.value });
    }

    _onChangePulse(event) {
        this.setState({ pulse: event.target.value });
    }

    _onChangeUA(event) {
        this.setState({ ua: event.target.value });
    }

    _onChangeFat(event) {
        this.setState({ fat: event.target.value });
    }

    _onChangeWaist(event) {
        this.setState({ waist: event.target.value });
    }

    _onChangePFR(event) {
        this.setState({ pfr: event.target.value });
    }
    _onChangeTC(event) {
        this.setState({ TC: event.target.value })
    }
    _onChangeHDL(event) {
        this.setState({ HDL: event.target.value })

    }
    _onChangeTriglyceride(event) {
        this.setState({ Triglyceride: event.target.value })
    }
    _onChangeLDL(event) {
        this.setState({ LDL: event.target.value })
    }
    _onChangeFBS(event) {
        this.setState({ FBS: event.target.value })
    }
    _onChangeRBS(event) {
        this.setState({ RBS: event.target.value })
    }

    _onChangeHbA1c(event) {
        this.setState({ HbA1c: event.target.value })
    }

    _bmical(weight, height) {
        return (weight / Math.pow(height / 100, 2)).toFixed(2);
    }

    _editSubmit(id) {
        let patientId = localStorage.getItem("userdata");
        let request = {
            "patientId": parseInt(patientId),
            "height": parseInt(this.state.height),
            "weight": parseInt(this.state.weight),
            "systolic_pressure": parseInt(this.state.sp),
            "diastolic_pressure": parseInt(this.state.dp),
            "pulse": parseInt(this.state.pulse),
            "ua": parseInt(this.state.ua),
            "body_fat": parseInt(this.state.fat),
            "waist_circumference": parseInt(this.state.waist),
            "peak_flow_rate": parseInt(this.state.pfr),
            "total": parseInt(this.state.TC),
            "hdl": parseInt(this.state.HDL),
            "trigrlyceride": parseInt(this.state.Triglyceride),
            "ldl": parseInt(this.state.LDL),
            "fbs": parseInt(this.state.FBS),
            "rbs": parseInt(this.state.RBS),
            "hbc1": parseInt(this.state.HbA1c),
            "bmi": parseFloat(this._bmical(this.state.weight, this.state.height))

        }
        let filReq = this.getOnlyFilledObjects(request);
        API.put(`healthrecord/${id}`, (filReq), {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((respone) => {
            if (respone.status === 200) {
                this.setState({ editHealthRecord: false, addHealthRecord: false });
                this.getPatient();
            }
        }).catch((error) => {
            console.log(error, "#####error")
        });
    }
    /*=======* removes empty keys which has null values =========*/
    getOnlyFilledObjects(val) {
        let mainData = Object.keys(val);
        let newData = {};
        mainData.map(key => {
            if (val[key]) {
                let value = {};
                value[key] = val[key]
                newData = Object.assign(newData, value);
            }
        });
        return newData;
    }

    _addSubmit = () => {
        let patientId = localStorage.getItem("userdata");
        let request = {
            "patientId": parseInt(patientId),
            "height": parseInt(this.state.height),
            "weight": parseInt(this.state.weight),
            "systolic_pressure": parseInt(this.state.sp),
            "diastolic_pressure": parseInt(this.state.dp),
            "pulse": parseInt(this.state.pulse),
            "ua": parseInt(this.state.ua),
            "body_fat": parseInt(this.state.fat),
            "waist_circumference": parseInt(this.state.waist),
            "peak_flow_rate": parseInt(this.state.pfr),
            "total": parseInt(this.state.TC),
            "hdl": parseInt(this.state.HDL),
            "trigrlyceride": parseInt(this.state.Triglyceride),
            "ldl": parseInt(this.state.LDL),
            "fbs": parseInt(this.state.FBS),
            "rbs": parseInt(this.state.RBS),
            "hbc1": parseInt(this.state.HbA1c),
            "bmi": parseFloat(this._bmical(this.state.weight, this.state.height))

        }
        let filReq = this.getOnlyFilledObjects(request);

        API.post(`healthrecord`, filReq, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((respone) => {
            if (respone.status === 200) {
                this.setState({ editHealthRecord: false, addHealthRecord: false });
                this.getPatient();
            }
        }).catch((error) => {
            console.log(error, "#####error")
        });
    }
    // ---mobile view accordian onchange---
    callback = (key) => {
        console.log(key, "key");
    }
    genExtraHeight = () => {
        return <img className="RecordIcon" src={require("../../assets/images/icon1.png")}></img>
    }

    genExtraLipid = () => {
        return <img className="RecordIcon" src={require("../../assets/images/icon7.png")}></img>
    }

    genExtraGlucose = () => {
        return <img className="RecordIcon" src={require("../../assets/images/icon2.png")}></img>
    }

    genExtraBP = () => {
        return <img className="RecordIcon" src={require("../../assets/images/icon3.png")}></img>
    }

    genExtraUric = () => {
        return <img className="RecordIcon" src={require("../../assets/images/icon5.png")}></img>
    }

    genExtraLung = () => {
        return <img className="RecordIcon" src={require("../../assets/images/icon8.png")}></img>
    }

    popOut(x) {
        return x;
    }

    render() {
        const { latestHistory } = this.state;

        if (latestHistory) {
            return (
                <div>
                    <div className="HealthRecordSummary">
                        <Card hoverable className="HealthSummary">
                            <Row>
                                <Col md={20} xs={16} className="padding0"> <h1>Health Summary</h1></Col>
                                <Col md={4} xs={8} className="padding0"> <Button className="viewHistory" onClick={this.props.OnClick}>VIEW HISTORY</Button></Col>
                            </Row>

                            <Row>
                                <Col md={5} xs={7} className="padding0">
                                    <Row>
                                        <Col span={1} className="padding0">
                                            {/* <span className="round"></span> */}
                                            <Button className="healthButton" onClick={this._editHealthRecord}> EDIT</Button>
                                        </Col>
                                        <Col md={20} xs={23}>
                                            {/* <h5>Pharmacist's entry</h5> */}

                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={7} xs={12} className="padding0">
                                    <Row>
                                        <Col span={1} className="padding0">
                                            {/* <span className="round1"></span> */}
                                            <Button className="healthButton" onClick={this._addHealthRecord}>ADD</Button>
                                        </Col>
                                        <Col md={20} xs={23}>
                                            {/* <h5>patient's entry</h5> */}

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div className="health1" >
                                <Row className="healthRow1">
                                    <Col md={6} xs={12} className="padding0">
                                        <HealthBlock
                                            num={latestHistory && latestHistory.height ? `${latestHistory.height}` : "NA"}
                                            measure="cm"
                                            src={require("../../assets/images/icon1.png")}
                                            content={"Height as on"}
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeheight(e)}
                                            value={this.state.height ? `${this.state.height}` : ""} />
                                    </Col>
                                    <Col md={6} xs={12} className="padding0">
                                        <HealthBlock
                                            num={latestHistory && latestHistory.weight ? `${latestHistory.weight}` : "NA"}
                                            measure="kg"
                                            src={require("../../assets/images/icon2.png")}
                                            content="Weight as on"
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeWeight(e)}
                                            value={this.state.weight} />
                                    </Col>
                                    <Col md={6} xs={12} className="padding0">
                                        <HealthBlock
                                            num={latestHistory && latestHistory.systolic_pressure && latestHistory.diastolic_pressure ? `${latestHistory.systolic_pressure}/${latestHistory.diastolic_pressure}` : "NA"}
                                            measure="mmHg"
                                            src={require("../../assets/images/icon3.png")}
                                            content="BP as on "
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange1={(e) => this._onChangeSP(e)}
                                            onChange2={(e) => this._onChangeDP(e)}
                                            value1={this.state.sp}
                                            value2={this.state.dp}
                                            term="bp" />
                                    </Col>
                                    <Col md={6} xs={12} className="padding0">
                                        <HealthBlock
                                            num={latestHistory && latestHistory.pulse ? `${latestHistory.pulse}` : "NA"}
                                            measure="bpm"
                                            src={require("../../assets/images/icon4.png")}
                                            content="Pulse as on"
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangePulse(e)}
                                            value={this.state.pulse} />
                                    </Col>
                                </Row>
                                <Row className="healthRow2">
                                    <Col md={6} xs={12} className="padding0">
                                        <HealthBlock
                                            num={latestHistory && latestHistory.ua ? `${latestHistory.ua}` : "NA"}
                                            measure="mmol/L"
                                            src={require("../../assets/images/icon5.png")}
                                            content="Uric Acid as on"
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeUA(e)}
                                            value={this.state.ua} />
                                    </Col>
                                    <Col md={6} xs={12} className="padding0">

                                        <HealthBlock
                                            num={latestHistory && latestHistory.body_fat ? `${latestHistory.body_fat}` : "NA"}
                                            measure="%"
                                            src={require("../../assets/images/icon6.png")}
                                            content="Body Fat % as on"
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeFat(e)}
                                            value={this.state.fat} />
                                    </Col>
                                    <Col md={6} xs={12} className="padding0">
                                        <HealthBlock
                                            num={latestHistory && latestHistory.waist_circumference ? `${latestHistory.waist_circumference}` : "NA"}
                                            measure="cm"
                                            src={require("../../assets/images/icon7.png")}
                                            content="Waist as on"
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeWaist(e)}
                                            value={this.state.waist} />
                                    </Col>
                                    <Col md={6} xs={12} className="padding0">
                                        <HealthBlock
                                            num={latestHistory && latestHistory.peak_flow_rate ? `${latestHistory.peak_flow_rate}` : "NA"}
                                            measure="L/min"
                                            src={require("../../assets/images/icon8.png")}
                                            content="Peak Flow Rate on"
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangePFR(e)}
                                            value={this.state.pfr} />
                                    </Col>
                                </Row>
                                <Row className="healthRow3">
                                    <Col md={6} xs={12} className="padding0">
                                        <HealthBlock
                                            num={latestHistory ? this._bmical(latestHistory.weight, latestHistory.height) : "NA"}
                                            measure=""
                                            src={require("../../assets/images/icon7.png")}
                                            content="BMI as on"
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            value={this._bmical(latestHistory.weight, latestHistory.height)} />
                                    </Col>
                                </Row>
                            </div>

                            
                            {/* Blood Glucose */}

                            <div className="lipidProfile">
                                <div className="lipHeading">
                                    <p className="lipid">Blood Glucose</p>
                                    <span>as on <Moment format="DD/MM/YYYY">{`${latestHistory.updated_at}`}</Moment></span>
                                </div>

                                <Row className="lipidRow1">
                                    <Col md={6} xs={12} className="padding0">
                                        <LipidGluBlock
                                            text="FBS"
                                            range=" 4.4 to 6.1 mmol/L"
                                            num={latestHistory && latestHistory.fbs ? `${latestHistory.fbs}` : "NA"}
                                            measure="mmol/L"
                                            // type={"patient"}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeFBS(e)}
                                            value={this.state.FBS || ''} />

                                    </Col>
                                    <Col md={6} xs={12} className="padding0">
                                        <LipidGluBlock
                                            text="RBS"
                                            range="4.4 to 8.0 mmol/L"
                                            num={latestHistory && latestHistory.rbs ? `${latestHistory.rbs}` : "NA"}
                                            measure="mmol/L"
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeRBS(e)}
                                            value={this.state.RBS || ''} />

                                    </Col>
                                    <Col md={6} xs={12} className="padding0">
                                        <LipidGluBlock
                                            text="HbA1c"
                                            range=" <6.5%"
                                            num={latestHistory && latestHistory.hbc1 ? `${latestHistory.hbc1}` : "NA"}
                                            measure="%"
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeHbA1c(e)}
                                            value={this.state.HbA1c || ''} />

                                    </Col>
                                    <Col md={6} xs={12} className="padding0">

                                    </Col>
                                </Row>
                            </div>
                            
                            {/* Lipid profile */}

                            <div className="lipidProfile">
                                <div className="lipHeading">
                                    <p className="lipid">Cholesterol / Lipid Profile:</p>
                                    <span>as on <Moment format="DD/MM/YYYY">{`${latestHistory.updated_at}`}</Moment></span>
                                </div>

                                <Row className="lipidRow1">
                                    <Col md={6} xs={12} className="padding0">
                                        <LipidGluBlock
                                            text="Total Cholesterol"
                                            range=" <5.2 mmol/L"
                                            num={latestHistory && latestHistory.total ? `${latestHistory.total}` : "NA"}
                                            measure="mmol/L"
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeTC(e)}
                                            value={this.state.TC || ''}
                                        />
                                    </Col>
                                    <Col md={6} xs={12} className="padding0">
                                        <LipidGluBlock
                                            text="HDL"
                                            range=" >= 1.1mmol/L"
                                            num={latestHistory && latestHistory.hdl ? `${latestHistory.hdl}` : "NA"}
                                            measure="mmol/L"
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeHDL(e)}
                                            value={this.state.HDL || ''} />

                                    </Col>
                                    <Col md={6} xs={12} className="padding0">
                                        <LipidGluBlock
                                            text="Triglyceride"
                                            range="<= 1.7mmol/L"
                                            num={latestHistory && latestHistory.trigrlyceride ? `${latestHistory.trigrlyceride}` : "NA"}
                                            measure="mmol/L"
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeTriglyceride(e)}
                                            value={this.state.Triglyceride || ''} />

                                    </Col>
                                    <Col md={6} xs={12} className="padding0">
                                        <LipidGluBlock
                                            text="LDL "
                                            range=" >= 1.1mmol/Ll"
                                            num={latestHistory && latestHistory.ldl ? `${latestHistory.ldl}` : "NA"}
                                            measure="mmol/L"
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeLDL(e)}
                                            value={this.state.LDL || ''} />

                                    </Col>
                                </Row>

                            </div>

                            {(this.state.editHealthRecord || this.state.addHealthRecord) && <div>
                                <Button className="healthButton cancel" onClick={this._cancel}>CANCEL</Button><span></span>
                                <Button className="healthButton update" onClick={this.state.editHealthRecord ? this._editSubmit.bind(this, latestHistory.id) : this._addSubmit}>{this.state.editHealthRecord ? "UPDATE" : "SUBMIT"}</Button>
                            </div>}
                        </Card>

                    </div>
                    <div className="HealthRecordSummaryMobile HealthRecordSummary">
                        <div className="HealthSummary">
                            <Row>
                                <Col md={20} xs={16} className="padding0"> <h1>Health Summary</h1></Col>
                                <Col md={4} xs={8} className="padding0"> <Button className="viewHistory" onClick={this.props.OnClick}>VIEW HISTORY</Button></Col>
                            </Row>
                            <div>
                                {(this.state.editHealthRecord || this.state.addHealthRecord) ? (<span>
                                    <Button className="healthButton cancel" onClick={this._cancel}>CANCEL</Button><span></span>
                                    <Button className="healthButton update" onClick={this.state.editHealthRecord ? this._editSubmit.bind(this, latestHistory.id) : this._addSubmit}>{this.state.editHealthRecord ? "UPDATE" : "SUBMIT"}</Button>
                                </span>) :
                                    (<span>
                                        <Button className="healthButton" onClick={this._editHealthRecord}> EDIT</Button><span></span>
                                        <Button className="healthButton" onClick={this._addHealthRecord}>ADD</Button>
                                    </span>)}
                            </div>

                        </div>
                        <Collapse expandIconPosition={"right"} defaultActiveKey={this.popOpen ? ((x) => this.popOut(x)) : ("1")} onChange={this.callback}>
                            <Panel header="ANTHROPOMETRIC MEASUREMENTS" key="1" extra={this.genExtraHeight()}>
                                <Row>
                                    <Col xs={12}>
                                        <MobileBlock
                                            num={latestHistory && latestHistory.height ? `${latestHistory.height}` : "NA"}
                                            measure="cm"
                                            content={"Height"}
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeheight(e)}
                                            value={this.state.height ? `${this.state.height}` : ""} />
                                    </Col>
                                    <Col xs={12}>
                                        <MobileBlock
                                            num={latestHistory && latestHistory.weight ? `${latestHistory.weight}` : "NA"}
                                            measure="kg"
                                            content="Weight"
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeWeight(e)}
                                            value={this.state.weight} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <MobileBlock
                                            num={latestHistory && latestHistory.body_fat ? `${latestHistory.body_fat}` : "NA"}
                                            measure="%"
                                            content="% of Body Fat "
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeFat(e)}
                                            value={this.state.fat} />
                                    </Col>
                                    <Col xs={12}>
                                        <MobileBlock
                                            num={latestHistory && latestHistory.waist_circumference ? `${latestHistory.waist_circumference}` : "NA"}
                                            measure="cm"
                                            content="Waist-Length"
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            addHealthRecord={this.state.addHealthRecord}
                                            editHealthRecord={this.state.editHealthRecord}
                                            onChange={(e) => this._onChangeWaist(e)}
                                            value={this.state.waist} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24}>
                                        <MobileBlock
                                            num={latestHistory ? this._bmical(latestHistory.weight, latestHistory.height) : "NA"}
                                            measure=""
                                            content="Body Mass Index(BMI)"
                                            date={`${latestHistory && latestHistory.updated_at ? latestHistory.updated_at : "-"}`}
                                            value={this._bmical(latestHistory.weight, latestHistory.height)} />
                                    </Col>
                                </Row>

                            </Panel>
                            <Panel header="LIPID PROFILE" key="2" extra={this.genExtraLipid()} className="mobileLipids">
                                <article>
                                    <MobileBlock
                                        limit=" <5.2 mmol/L"
                                        num={latestHistory && latestHistory.total ? `${latestHistory.total}` : "NA"}
                                        measure="mmol/L"
                                        content="Total CHOLESTEROL"
                                        addHealthRecord={this.state.addHealthRecord}
                                        editHealthRecord={this.state.editHealthRecord}
                                        onChange={(e) => this._onChangeTC(e)}
                                        value={this.state.TC || ''} />
                                    <MobileBlock
                                        limit=" >= 1.1mmol/L"
                                        num={latestHistory && latestHistory.hdl ? `${latestHistory.hdl}` : "NA"}
                                        measure="mmol/L"
                                        content="HDL CHOLESTEROL"
                                        addHealthRecord={this.state.addHealthRecord}
                                        editHealthRecord={this.state.editHealthRecord}
                                        onChange={(e) => this._onChangeHDL(e)}
                                        value={this.state.HDL || ''} />
                                    <MobileBlock
                                        limit="<= 1.7mmol/L"
                                        num={latestHistory && latestHistory.trigrlyceride ? `${latestHistory.trigrlyceride}` : "NA"}
                                        measure="mmol/L"
                                        content="Triglyceride"
                                        addHealthRecord={this.state.addHealthRecord}
                                        editHealthRecord={this.state.editHealthRecord}
                                        onChange={(e) => this._onChangeTriglyceride(e)}
                                        value={this.state.Triglyceride || ''} />
                                    <MobileBlock
                                        limit=" >= 2.6mmol/Ll"
                                        num={latestHistory && latestHistory.ldl ? `${latestHistory.ldl}` : "NA"}
                                        measure="mmol/L"
                                        content="LDL CHOLESTEROL"
                                        addHealthRecord={this.state.addHealthRecord}
                                        editHealthRecord={this.state.editHealthRecord}
                                        onChange={(e) => this._onChangeLDL(e)}
                                        value={this.state.LDL || ''} />
                                </article>
                            </Panel>

                            <Panel header="BLOOD GLUCOSE PROFILE" key="3" extra={this.genExtraGlucose()} className="mobileLipids">
                                <MobileBlock
                                    limit="  5.6 to 6.9 mmol/L"
                                    num={latestHistory && latestHistory.fbs ? `${latestHistory.fbs}` : "NA"}
                                    measure="mmol/L"
                                    content="Fasting Blood Sugar"
                                    addHealthRecord={this.state.addHealthRecord}
                                    editHealthRecord={this.state.editHealthRecord}
                                    onChange={(e) => this._onChangeFBS(e)}
                                    value={this.state.FBS || ''} />
                                <MobileBlock
                                    limit="5.6 to 6.9 mmol/L"
                                    num={latestHistory && latestHistory.rbs ? `${latestHistory.rbs}` : "NA"}
                                    measure="mmol/L"
                                    content="Random Blood Sugar"
                                    addHealthRecord={this.state.addHealthRecord}
                                    editHealthRecord={this.state.editHealthRecord}
                                    onChange={(e) => this._onChangeRBS(e)}
                                    value={this.state.RBS || ''} />
                                <MobileBlock
                                    limit=" <4.5%"
                                    num={latestHistory && latestHistory.hbc1 ? `${latestHistory.hbc1}` : "NA"}
                                    measure="mmol/L"
                                    content="HbA1c"
                                    addHealthRecord={this.state.addHealthRecord}
                                    editHealthRecord={this.state.editHealthRecord}
                                    onChange={(e) => this._onChangeHbA1c(e)}
                                    value={this.state.HbA1c || ''} />
                            </Panel>
                            <Panel header="VITAL SIGNS" key="4" extra={this.genExtraBP()} className="mobileLipids">
                                <MobileBlock
                                    num={latestHistory && latestHistory.systolic_pressure && latestHistory.diastolic_pressure ? `${latestHistory.systolic_pressure}/${latestHistory.diastolic_pressure}` : "NA"}
                                    measure="mmHg"
                                    content="BP as on"
                                    addHealthRecord={this.state.addHealthRecord}
                                    editHealthRecord={this.state.editHealthRecord}
                                    onChange1={(e) => this._onChangeSP(e)}
                                    onChange2={(e) => this._onChangeDP(e)}
                                    value1={this.state.sp}
                                    value2={this.state.dp}
                                    term="bp" />
                                <MobileBlock
                                    num={latestHistory && latestHistory.pulse ? `${latestHistory.pulse}` : "NA"}
                                    measure="bpm"
                                    content="Pulse as on"
                                    addHealthRecord={this.state.addHealthRecord}
                                    editHealthRecord={this.state.editHealthRecord}
                                    onChange={(e) => this._onChangePulse(e)}
                                    value={this.state.pulse} />
                            </Panel>
                            <Panel header="OTHER TEST" key="5" extra={this.genExtraUric()} className="mobileLipids">
                                <MobileBlock
                                    num={latestHistory && latestHistory.ua ? `${latestHistory.ua}` : "NA"}
                                    measure="mmol/L"
                                    content="Uric Acid"
                                    addHealthRecord={this.state.addHealthRecord}
                                    editHealthRecord={this.state.editHealthRecord}
                                    onChange={(e) => this._onChangeUA(e)}
                                    value={this.state.ua} />
                                     <MobileBlock
                                    num={latestHistory && latestHistory.peak_flow_rate ? `${latestHistory.peak_flow_rate}` : "NA"}
                                    measure="L/min"
                                    content="Peak Flow Rate"
                                    addHealthRecord={this.state.addHealthRecord}
                                    editHealthRecord={this.state.editHealthRecord}
                                    onChange={(e) => this._onChangePFR(e)}
                                    value={this.state.pfr} />
                            </Panel>
                           

                        </Collapse>
                    </div>

                </div>
            );
        }
        return <p>NO HEALTH RECORD FOUND</p>;
    }
}
export default HealthRecord;

