
import React from "react";
import { Row, Col } from "antd";
import PropTypes from 'prop-types';
import './healthRecord.css';
import Moment from 'react-moment';

const HealthBlock = ({ src, content,date, num, measure, type, addHealthRecord, editHealthRecord, onChange, onChange1, onChange2, value,value1,value2, term }) => {
    let Term = term;
    return (
        <div>
            {Term === "bp" ?
                <div> {addHealthRecord || editHealthRecord ? <span><input className="healthRecd1" type="text" onChange={onChange1} value={value1 ||''} />
                    <input className="healthRecd2" type="text" onChange={onChange2} value={value2 ||''} /></span> : <span style={{ color: type === "patient" ? "#f65656" : "#4f4f4f" }} ><strong>{num}</strong></span>}<span>{measure}</span>
                </div> :
                <div> {addHealthRecord || editHealthRecord ? <input className="healthRec" type="text" onChange={onChange} value={value ||''} /> : <span style={{ color: type === "patient" ? "#f65656" : "#4f4f4f" }} ><strong>{num}</strong></span>}<span>{measure}</span>
                </div>
            }

            <Row>
                <Col md={4} xs={4} className="padding0">
                    <img className="ant-menu-item" src={src} />
                </Col>
                <Col md={14} xs={16} className="padding0">
                    <h4 className="healthContent">{content} <Moment format="DD/MM/YYYY">{date}</Moment></h4>
                </Col>
            </Row>
        </div>

    );
}


export default HealthBlock;


