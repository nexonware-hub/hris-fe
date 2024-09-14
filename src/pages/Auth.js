import { useParams } from "react-router-dom";
import Navigationbar from "../components/NavigationBar";
import {SignUp, SignIn } from "../components/SignUp";
import { signin, signup as signupsvg } from './../assets';
import { Row, Col } from "antd";

function Auth({signup, mobile}) {
    return <>
    <Navigationbar />
    <br/>
    <br/>
    <br/>
    <Row>
    <Col xs={0} md={2}></Col>

    <Col xs={0} md={10} align="center">
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
    <img style={{ 
                width: window.location.pathname.includes('signup') ? '65%' : '65%',
            }} src={ window.location.pathname.includes('signup') ? signupsvg : signin}  />
    </Col>

    <Col xs={24} md={10} align="center">
    <div align="left" style={{width: '90%'}}>
            {signup ? <SignUp /> : <SignIn />} 
    </div>
    </Col>
    <Col xs={0} md={2}></Col>
    </Row> 
     
    </>;
}

export default Auth;