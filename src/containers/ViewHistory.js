import React from "react";
import Navbar from '../components/Navbar/Navbar';
import Banner from '../components/banner/banner';
import { DatePicker,Row,Col,Icon,Button,Table } from 'antd';
// import Axios from 'axios';
import API from '../app/_shared/_services/api-services'
import moment from 'moment';

const {RangePicker} = DatePicker;

const columns = [ 
    { title: 'Date & Time',dataIndex: 'created_at',key: 'date' },
    { title: 'Height (cm)', dataIndex: 'height', key: 'height' },
    { title: 'Weight (kg)', dataIndex: 'weight', key: 'weight' },
    { title: 'Pulse (bpm)', dataIndex: 'pulse', key: 'pulse' },
    { title: 'Blood Pressure (mmHg)', dataIndex: 'bloodPressure', key: 'bp' },
    { title: 'BMI', dataIndex: 'bmi', key: 'bmi' },
];

export default class HistoryView extends React.Component {
      constructor(props){
            super(props);
            this.state={
                history:[],
                searchText: "",
                filteredHistory: [],
                startDate: "",
                endDate: "",
            };
    }

    componentDidMount(){
        let getPatientId = localStorage.getItem("userdata");
         API.get(`healthrecord?patientId=${getPatientId}`)
            .then(res=>{
                let historyList = res.data.result;
                historyList.map((item) => {
                    item.created_at = moment(item.created_at).format("YYYY-MM-DD, HH:mm:ss");
                    item.bloodPressure = item.systolic_pressure?`${item.systolic_pressure} / ${item.diastolic_pressure}`:"-";
                    item.pulse=item.pulse? item.pulse: "-";
                    item.bmi=item.bmi?item.bmi:"-";
                    
                })
                this.setState({history:historyList, filteredHistory: historyList});
            })
            .catch(function (error) {
                console.log("#########",error);
            })
    }
    

    onChange(date, dateString) {
        this.setState({ startDate: dateString[0], endDate: dateString[1]});
        if (dateString[0] === "" && dateString[1] === "") {
            this.setState({ filteredHistory: this.state.history });
        }
    }

    _search = () => {
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        if (startDate && endDate) {
            let filter = this.state.history.filter((item) => {
                let createdTime = moment(item.created_at).format("YYYY-MM-DD");
                return moment(createdTime).isBetween(startDate, endDate, null, [])
            });
            this.setState({ filteredHistory: filter });
        } else {
            this.setState({ filteredHistory: this.state.history });
        }
    }
    
    disabledDate=(current) =>{
        return current && current > moment().endOf('day');
      }

    render() {
        const {filteredHistory}=this.state;
        return (
            <div className="historyView"  key="Id">
                 <Navbar history={this.props.history}/>
                 <Banner
                 heading='Health Record'
                 content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                 Ut pretium pretium tempor. 
                 Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. '
                 src={require("../assets/health-record-icon.png")}
                 />
                 <section className="Container">
                 <Row className="DatePicker">
                     <Col md={16}>
                        <RangePicker disabledDate={this.disabledDate} 
                        placeholder={["Start Date","End Date"]}
                        onChange={this.onChange.bind(this)} />
                        <Button type="primary"
                        onClick={this._search}
                        >

                            Search<Icon type="arrow-right" />
                        </Button>
                     </Col>
                 </Row>
                 <section className="table-responsive">
                 
                 <Table 
                        rowKey='id'
                        columns={columns}
                        expandedRowRender={record => { 
                            return <div style={{ margin: 0}} key={record.id} className="colDrop"
                        scroll={{ x: true, y: 1000 }}>
                        <Row className="DropContent">
                            <Col md={6} xs={5}>
                                <label>Vitals</label>
                                <p>Waist Circumference:</p>
                                <h4>{record && record.waist_circumference ? `${record.waist_circumference}`: "NA"}</h4>
                                <p>Peak Flow Rate:</p>
                                <h4>{record && record.peak_flow_rate ?`${record.peak_flow_rate}`:"NA"}</h4>
                                <p>Body Fat %:</p>
                                <h4>{record && record.body_fat ?`${record.body_fat}`:"NA"}</h4>
                            </Col>
                            <Col md={6} xs={6}>
                                <label>Blood Glucose</label>
                                <Row>
                                    <Col md={11} xs={10}>
                                    <p>FBS:</p>
                                    <h4>{record && record.fbs ?`${record.fbs}`:"NA"}<span className="unit"> mmol/L</span> </h4>
                                    </Col>
                                    <Col md={11} xs={12}>
                                    <p>RBS:</p>
                                    <h4>{record && record.rbs ?`${record.rbs}`:"NA"}<span className="unit"> mmol/L</span></h4>
                                    </Col>
                                </Row>
                                <p>Hbc1:</p>
                                 <h4>{record && record.hbc1 ?`${record.hbc1}`:"NA"}%</h4>
                            </Col>
                            <Col md={6} xs={7}>
                               <label>Cholesterol/Lipid Profile</label>
                               <Row>
                                    <Col md={11} xs={12}>
                                        <p>Total:</p>
                                        <h4>{record && record.total ?`${record.total}`:"NA"}<span className="unit"> mmol/L</span></h4>
                                    </Col>
                                    <Col md={11} xs={12}>
                                        <p>LDL:</p>
                                        <h4>{record && record.ldl ?`${record.ldl}`:"NA"}<span className="unit"> mmol/L</span></h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={11} xs={13}>
                                        <p>Triglyceride:</p>
                                        <h4>{record && record.trigrlyceride ?`${record.trigrlyceride}`:"NA"}<span className="unit"> mmol/L</span></h4>
                                    </Col>
                                    <Col md={11} xs={11}>
                                        <p>HDL:</p>
                                        <h4>{record && record.hdl ?`${record.hdl}`:"NA"} <span className="unit"> mmol/L</span></h4>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} xs={6}>
                                <label>Uric Acid</label>
                                <p>UA:</p>
                                <h4>{record && record.ua ?`${record.ua}`:"NA"}</h4>
                            </Col>
                         
                        </Row>
                        </div> }}
                        dataSource={filteredHistory}
                        onRow={(record) => console.log("onrow record", record)}
                    />
                    </section>
                 </section>
            </div>
        );
    }
}
