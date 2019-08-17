import React from "react";
import './lipid.css'

const LipidGluBlock = ({ text, range, num, measure, type,addHealthRecord,editHealthRecord,onChange,value }) => {

    return (
        <div>
            {addHealthRecord || editHealthRecord ? <input className="healthRec1" type="text" onChange={onChange} value={value ||''}/>:
        <span style={{ color: type === "patient" ? "#f65656" : "#4f4f4f" }} ><strong>{num}</strong></span>}<span>{measure}</span>
            
            <h3>{text}</h3>
            <h4 className="healthContent">{range}</h4>
        </div>

    );
}


export default LipidGluBlock;