import React from "react";
import { Avatar, Icon } from 'antd';
import Icons from '../icon/icon'

const Image = ({ src, editShow, size, arrowShow }) => {
    return (
        <div className="avatarImg">
            <Avatar src={src} size={size} />
            {editShow && <div className="editIcon">
                <Icons type="edit" theme="filled" />
            </div>}
            {arrowShow && <div className="swapIcon">
                <Icon type="swap" /></div>}
        </div>
    )
}

export default Image;
