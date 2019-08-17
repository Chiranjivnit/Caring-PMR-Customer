import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Banner from '../banner/banner';
import PharmacyCard from '../pharmacyCard';
import { Row, Col } from 'antd';
import { BackTop, Modal, DatePicker, Table, Icon, Button, Spin, Alert } from 'antd';
// import Axios from 'axios';
import API from '../../app/_shared/_services/api-services';
import { DATE_FORMATE } from '../../constants';
import moment from 'moment';
import "./Pharmacy.css"

const { RangePicker } = DatePicker;

const columns = [
    { title: 'DATE', dataIndex: 'created_at', key: 'date' },
    { title: 'SCORE', dataIndex: 'score', key: 'score' },
    { title: 'OUTCOME', dataIndex: 'outcomeLevel', key: 'outcome' },
    { title: 'NOTES', dataIndex: 'tbl_evaluation_reminders[0].comments', key: 'notes' },
    { title: 'FOLLOW UP DATE', dataIndex: 'tbl_evaluation_reminders[0].followUpDate', key: 'followupdate' },
    { title: 'FOLLOW UP TIME', dataIndex: 'tbl_evaluation_reminders[0].followUpTime', key: 'followuptime' },
];

class PharmacyTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pharmacy: [],
            evalRemLength: '',
            visible: false,
            searchText: "",
            filteredPharmacy: [],
            startDate: '',
            endDate: '',
            rowSelection: {},
            testResults: [],
            filteredTestResults: [],
            testName: "",
            test1Array:[],
            test2Array:[],
            loading: false,
            searchDataResult:[],
            warningDate:false
        }
    }
    componentDidMount() {
        let getPatientId = localStorage.getItem("userdata");
        this.setState({ loading: true }, () => {
            API.get(`questionaryLogger/search?patientId=${getPatientId}`) 
                .then(res => {
                    let pharmacyList = res.data.result;
                    console.log("pharmacylist",pharmacyList)
                    pharmacyList.map((item) => {
                        item.created_at = moment(item.created_at).format(DATE_FORMATE);
                    })
                    this.setState({ pharmacy: pharmacyList, filteredPharmacy: res.data.result });
                    this.setState({
                        evalRemLength: res.data.result.tbl_evaluation_reminders.length
                    });
                })
                .catch(function (error) {
                    console.log(error, "##error##");
                })
        })

    }

    openModal=(testName)=> {
        let getPatientId = localStorage.getItem("userdata");
        this.setState({ visible: true, testName: testName,loading:true },()=>{
            API.get(`questionaryLogger/search?patientId=${getPatientId}&testName=${testName}`)
            .then(res => {
                console.log("res",res)
                this.setState({filteredTestResults:res.data.result,loading:false})
                let testResults = res.data.result;
                console.log("filteredTestResults",this.state.filteredTestResults)
               this.state.filteredTestResults.map((item) => {
                    item.created_at = moment(item.created_at).format(DATE_FORMATE);
                    if (item.tbl_evaluation_reminders.length > 0) {
                        item.tbl_evaluation_reminders[0].followUpTime = moment(item.tbl_evaluation_reminders[0].followUpTime, 'hh:mm:ss').format('hh:mm A');
                        item.tbl_evaluation_reminders[0].followUpDate = moment(item.tbl_evaluation_reminders[0].followUpDate).format(DATE_FORMATE);
                        //item.tbl_evaluation_reminders[0].comments 
                    }else{
                        let followData = {};
                        followData.followUpTime = '-';
                        followData.followUpDate = '-';
                        followData.comments = '-';
                        item.tbl_evaluation_reminders.push(followData)
                        
                    }
                })
                this.setState({ testResults: testResults, filteredTestResults: testResults });
            })
            .catch(function (error) {
                console.log(error, "##error##");
            })
        });
       
    }

    onChange=(date, dateString) =>{
        this.setState({ startDate: dateString[0], endDate: dateString[1] });
        if (dateString[0] === "" && dateString[1] === "") {
            this.setState({ filteredTestResults: this.state.testResults });
        }
        console.log( dateString[0],dateString[1], "dateString")
        //console.log(date,"date")
    }

    // _search=() =>{
    //     console.log("state", this.state)
    //     const { startDate, endDate, testResults }  = this.state ;
    //     if (startDate && endDate) {
    //         let filter = testResults.filter((item) => {
              
    //             let createdTime = moment(item.created_at).format(DATE_FORMATE);
    //             console.log(createdTime,"createdTime")
    //             return moment(createdTime).isBetween(startDate, endDate, null, [])
    //         });
    //         console.log(filter,"filter")
    //         this.setState({ filteredTestResults: filter });
    //     } else {
    //         this.setState({ filteredTestResults: this.state.testResults });
    //     }
    //     let searchStartDate = this.state.testResults.filter(item=>(new Date(item.created_at) >= startDate))
    //     // let searchEndDate = this.state.testResults.filter(item=>(item <= endDate ))
    //     console.log(searchStartDate, "searchStartDate")
    //     //console.log(searchEndDate,"")
    // }

    onSearchResult=()=>{
        let getPatientId = localStorage.getItem("userdata");
        const { startDate, endDate, testName } = this.state
         if ( startDate && endDate !==""){
              this.setState({warningDate:false})
         }else{
             this.setState({warningDate:true})
         }
        API.get(`questionaryLogger/search?patientId=${getPatientId}&testName=${testName}&startdate=${startDate}&enddate=${endDate}`)
        .then(res=>{
            this.setState({filteredTestResults:res.data.result})
            let testResults = res.data.result;
            console.log("search filterresult",this.state.filteredTestResults)
              this.state.filteredTestResults.map(data=>{
                  console.log("data",data)
                data.created_at = moment(data.created_at).format(DATE_FORMATE);
                console.log(data.created_at, "::::::::::::::::::::::data . created")
                if (data.tbl_evaluation_reminders.length > 0) {
                    data.tbl_evaluation_reminders[0].followUpTime = moment(data.tbl_evaluation_reminders[0].followUpTime, 'hh:mm:ss').format('hh:mm A');
                    data.tbl_evaluation_reminders[0].followUpDate = moment(data.tbl_evaluation_reminders[0].followUpDate).format(DATE_FORMATE);
                }else{
                    let followData = {};
                    followData.followUpTime = '-';
                    followData.followUpDate = '-';
                    followData.comments = '-';
                    data.tbl_evaluation_reminders.push(followData)
                    
                }
              })
              this.setState({ testResults: testResults, filteredTestResults: testResults });
            // this.setState({filteredTestResults:searchDataResult})
            // console.log(searchDataResult,"res")
        })
    }


    render() {
        const { pharmacy, filteredTestResults, loading, testResults, searchDataResult,warningDate } = this.state;
        const { rowSelection } = this.state;
        console.log("visible", this.state.visible)
        console.log("pharmacy", pharmacy)
        console.log(this.state.startDate,this.state.endDate, "this.state.startDate,this.state.endDate")
        console.log(this.state.filteredTestResults,"filteredTestResults")
        console.log(this.state.testResults,"testResults")
        console.log(searchDataResult,"this.state.searchDataResult")
        console.log("warningDate",this.state.warningDate)

        let test1Array = pharmacy.filter((item => { 

            return item.testName == "Diabetes Risk Assessment"  
        }
    
        ));
        
        console.log("test1Array",test1Array)
        let length1 = test1Array.length - 1;
        let latestHistory1 = test1Array[length1];
        

        let test2Array = pharmacy.filter((item => {   
            return item.testName == "mQuit Service"
        }
        ));
        console.log("test2Array",test2Array)
        let length2 = test2Array.length - 1;
        let latestHistory2 = test2Array[length2];
        
        console.log("latestHistory2", latestHistory2)
        console.log("latestHistory1", latestHistory1)
        if (pharmacy.length > 0) {
            return (
                <div>
                    <Navbar history={this.props.history} />
                    <BackTop />
                    <Banner
                        heading='Pharmacy Test'
                        content='Check your previously done pharmacy tests here'
                        src={require("../../assets/pharmacy-icon.png")}
                    />
                    <section className="Container">
                        <Row>
                            <Col xxl={8} xl={7} lg={6} md={8} sm={11} xs={24}>
                                <PharmacyCard
                                    h5={`${latestHistory1 && latestHistory1.testName ? latestHistory1.testName : "-"}`}
                                    score={`${latestHistory1 && latestHistory1.score ? latestHistory1.score : "-"}`}
                                    outcome={`${latestHistory1 && latestHistory1.outcomeLevel ? latestHistory1.outcomeLevel : "-"}`}
                                    followUpDate={latestHistory1.tbl_evaluation_reminders.length == 0 ?
                                        <div>-</div> :
                                        (<div>
                                            {`${moment(latestHistory1.tbl_evaluation_reminders[0].followUpDate).format('DD-MM-YYYY')} ${moment(latestHistory1.tbl_evaluation_reminders[0].followUpTime,'hh:mm:ss').format('hh:mm A')}`}</div>)}
                                    currentStatus={latestHistory1.tbl_evaluation_reminders.length == 0 ?
                                        (<p>-</p>) :
                                        (<div>
                                            {`${latestHistory1.tbl_evaluation_reminders[0].status}`}</div>)}
                                    openModal={this.openModal.bind(this, latestHistory1.testName)} />
                            </Col>
                            <Col xxl={8} xl={7} lg={6} md={8} sm={11} xs={24}>
                                <PharmacyCard
                                    h5={`${latestHistory2 && latestHistory2.testName ? latestHistory2.testName : "-"}`}
                                    score={`${latestHistory2 && latestHistory2.score ? latestHistory2.score : "-"}`}
                                    outcome={`${latestHistory2 && latestHistory2.outcomeLevel ? latestHistory2.outcomeLevel : "-"}`}
                                    followUpDate={latestHistory2.tbl_evaluation_reminders.length == 0 ?
                                        (<p>-</p>) :
                                        (<div>
                                            {`${moment(latestHistory2.tbl_evaluation_reminders[0].followUpDate).format('DD-MM-YYYY')} ${moment(latestHistory2.tbl_evaluation_reminders[0].followUpTime,'hh:mm:ss').format('hh:mm A')}`}</div>)}
                                    currentStatus={latestHistory2.tbl_evaluation_reminders.length == 0 ?
                                        (<p>-</p>) :
                                        (<div>
                                            {`${latestHistory2.tbl_evaluation_reminders[0].status}`}</div>)}
                                    openModal={this.openModal.bind(this, latestHistory2.testName)} />
                            </Col>

                        </Row>
                    </section>

                    <Modal
                         maskClosable = {false}
                        visible={this.state.visible}
                        // onOk={() => this.setState({ visible: false })}
                        onCancel={() => this.setState({ visible: false })}
                        // okText="Ok"
                        // cancelText="Cancel"
                        width="1115px"
                        className="wholeCard"
                    >
                        <div className="pharCard">
                            <h1 className="title">{this.state.testName}</h1>
                            <Row className="pharmacy">
                                <Col md={9}>
                                    <RangePicker  onChange={this.onChange.bind(this)} disabledDate={this.disabledDate} /> 
                                    {warningDate === true ? <h2 className="warningDate">Please add startdate and enddate</h2>:null }
                                     
                                </Col>
                                <Col md={6}>
                                    <Button type="primary"
                                       onClick={this.onSearchResult}
                                       >
                                        Search<Icon type="arrow-right" />
                                    </Button>
                                </Col>
                                {/* <Col md={6} style={{float: 'right'}}>
                     <span><i className="mdi mdi-printer"></i></span><button type="button"
                      onClick="printPage()" id="printRecord" className="btn uncheck" disabled>PRINT</button>
                     </Col> */}
                            </Row>
                        </div>
                        <div className="pharTable">
                            <Table columns={columns} dataSource={filteredTestResults} />
                        </div>
                    </Modal>
                </div>

            );
        }
        return (
            <div>
                <Navbar history={this.props.history} />
                <BackTop />
                <Banner
                    heading='Pharmacy Test'
                    content='Check your previously done pharmacy tests here '
                    src={require("../../assets/pharmacy-icon.png")}
                />
                {loading ? <Spin tip="Loading...">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin> :
                    <p className="noData">NO PHARMACY TESTS FOUND</p>
                }
            </div>
        );
    }

    // rowSelection = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //     },
    // };
}
export default PharmacyTest;