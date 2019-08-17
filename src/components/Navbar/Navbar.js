import React, { Component,  } from 'react';
import { Menu, } from 'antd';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { getCookie } from "../../utils/Cookie";
import { isValidToken, decrypt } from "../../utils/Decrypt";
import config from "../../config"; 


class Navbar extends Component {

    state = {
        Dashboard:false
    }

    handleClick = (e) => {
        if (e.key === "profile" || e.key === "connection") {
            this.props.history.push("/");
            this.setState({ Dashboard: true });
        } else if (e.key === "remainder") {
            this.props.history.push("/allRemainders");
        } else if (e.key === "logout") {
            document.cookie = "token" +`=;domain=.spurtreetech.com;path=/; Expires=Thu, ${new Date() - 1};`;
            window.open(`${config.caring_connect}/#/?is_staff=0&client_code=${config.caring_pmr_customer_client_code}&redirect_url=${config.redirect_url}`,'_self');
            localStorage.clear();
        } else if (e.key === "login") {
            window.open(`${config.caring_connect}/#/?is_staff=0&client_code=${config.caring_pmr_customer_client_code}&redirect_url=${config.redirect_url}`,'_self');
        }
    }

    render() {
        let token = getCookie("token");

        console.log("valid", isValidToken(token));
        return (
            <div >
                <Link to="/" ><img src={require('../../assets/logo.png')} className="mobileMenu" /></Link>

                <Menu 
                    onClick={this.handleClick}
                    mode="horizontal"
                    className="mainMenu"
                >
                    <Menu.Item key="logo" className="webMenu">
                        <Link to="/" ><img src={require('../../assets/logo.png')} /></Link>
                    </Menu.Item>
                    { isValidToken(token) ? <Menu.Item key="logout">LOGOUT</Menu.Item> : <Menu.Item key="login">LOGIN</Menu.Item> }
                </Menu>

            </div>
        );

    }
}
export default Navbar;