import React from "react";
import { Card, Row, Col, Button, Modal } from 'antd';
import renderEmpty from "antd/lib/config-provider/renderEmpty";



const PharmacyCard = ({ h5, score, outcome, followUpDate, currentStatus, openModal }) => {
    return (
        <div>
            <Card className="pharmacyCard">
                <div className="heading">
                    <h5>{h5}</h5>
                </div>
                <div className="body">
                    <Row className="pharmRow">
                        <Col span={12}>
                            <label>CURRENT SCORE:</label>
                            <p>{score}</p>
                        </Col>
                        <Col span={12} className="outcome">
                            <label>OUTCOME:</label>
                            <p>{outcome}</p>
                        </Col>
                    </Row>
                    <div>
                        <label>FOLLOW UP DATE & TIME :</label>
                        <div>{followUpDate}</div>
                        <label>CURRENT STATUS:</label>
                        <div>{currentStatus}</div>
                    </div>

                    <div className="viewBtn"><Button className="viewReport" onClick={openModal}> VIEW REPORTS</Button></div>
                </div>
            </Card>
        </div>
    );
}

export default PharmacyCard;