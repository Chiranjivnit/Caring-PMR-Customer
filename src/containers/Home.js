import React,{Component} from "react";
import { Row, Col } from 'antd';
import Navbar from '../components/Navbar/Navbar';
import Profile from '../components/profile-details/profile-details';
import RemainderCard from '../components/remainderCard/reminderCard';
import SymptomCard from '../components/symptomCard/symptomCard';
import HealthRecord from '../components/health-record-summary/health-record-summary';
import Connection from '../components/connections/connections';
import { BackTop } from 'antd';
import { getCookie } from "../utils/Cookie";
import { isValidToken, decrypt } from "../utils/Decrypt";
import API  from '../app/_shared/_services/api-services';

export default class Dashboard extends Component {
    state = {
        patientData: ""
    }

    componentDidMount() {
        let token = getCookie("token");
        if (isValidToken(token)) {
            let decodeDate = decrypt(token);
            console.log("decodedata", decodeDate);
            let payload = decodeDate.payload;
            let phone = payload.phonenumber;
            // const phoneNumber = phone.substring(2);
            const phoneNumber = phone;
            API.get(`patients/search?mobile=${phoneNumber}`).then( res => {
                console.log("apii result", res);
                let patientData = res&&res.data&&res.data.result&&res.data.result[0] ? res.data.result[0].id : "";
                localStorage.setItem("userdata", `${patientData}`);
                this.setState({ patientData: patientData });
            });
        }
    }

    viewHistory = () => {
        this.props.history.push("/history");
    }

    render() {
        return (
            <div>
                <Navbar history={this.props.history} patientData={this.state.patientData}/>
                <RemainderCard patientData={this.state.patientData}/>
                <BackTop/>
                <Row className="healthContainer" id="section1">
                    <Col sm={24} md={8} className="padding0">
                        <Profile patientData={this.state.patientData}/>
                    </Col>
                    <Col sm={24} md={16} className="padding0">
                        <HealthRecord OnClick={this.viewHistory} patientData={this.state.patientData}/>
                    </Col>
                </Row>
                
                <SymptomCard patientData={this.state.patientData}/>
                <Connection patientData={this.state.patientData}/>
            </div>
        );
    }
}
