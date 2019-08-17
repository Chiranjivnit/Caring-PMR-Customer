
import React from "react";
import { Row, Col } from "antd";
import PropTypes from 'prop-types';
import './mobileHealthRecordBlock.css';
import Moment from 'react-moment';

const MobileHealthBlock = ({ content, date, num, measure, type, limit, addHealthRecord, editHealthRecord, onChange, onChange1, onChange2, value, value1, value2, term }) => {
    let Term = term;
    return (
        <div>
            <h4 className="healthContent">{content}</h4>
            {Term === "bp" ?
                <div> {addHealthRecord || editHealthRecord ? <span><input className="healthRecd1" type="text" onChange={onChange1} value={value1 || ''} />
                    <input className="healthRecd2" type="text" onChange={onChange2} value={value2 || ''} /></span> : <span style={{ color: type === "patient" ? "#f65656" : "#4f4f4f" }} ><strong>{num}</strong></span>}<span className="measure">{measure}</span>
                </div> :
                <div> {addHealthRecord || editHealthRecord ? <input className="healthRec" type="text" onChange={onChange} value={value || ''} /> : <span style={{ color: type === "patient" ? "#f65656" : "#4f4f4f" }} ><strong>{num}</strong></span>}
                    <span className="LimitMeasure">
                        <Row>
                            <Col className="padding0 limit">
                                <p>{limit}</p>
                            </Col>
                            <Col className="padding0">
                                <span className="measure">{measure}</span>
                            </Col>
                        </Row>

                    </span>

                </div>
            }

            <i><Moment format="DD/MM/YYYY">{date}</Moment></i>
        </div>

    );
    // Block.propTypes = {
    //     num: PropTypes.string,
    //     measure: PropTypes.string
    // };
}


export default MobileHealthBlock;


