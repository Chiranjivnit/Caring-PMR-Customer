import React, {  } from "react";
import {Row,Col} from 'antd';

const Banner=({heading,content,src})=> {
   
        return (
            <div className="banner">
                <Row>
                    <Col md={12} className="col1">
                        <h1>{heading}</h1>
                        <p>{content} </p>
                    </Col>
                    <Col md={12}>
                   <img className="Image" src={src} alt="Images"/>
                    </Col>
                </Row>

            </div>
        );
}
export default Banner;



