import React, {useContext, useState} from 'react';
import { Alert, Button, Checkbox, Form, Input , Spin, message} from 'antd';
import { EmailPasswordSignIn } from '../firebase/email_password_auth';
import { useAppContext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { signUp } from '../services/signupService';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { greyOnWhiteColor, primaryBorderRadius, white } from '../css';
import Toast from './Toast';
import { Loading3QuartersOutlined, MailOutlined } from '@ant-design/icons';

export const SignIn = () => { 

const {login, state} = useAppContext();
const { user } = state;

const onFinish = ({password, username, remember}) => {
    EmailPasswordSignIn(username, password, login);
  };

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

    return(
        <div style={{zIndex: '99999', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '30px', borderRadius: primaryBorderRadius, border: '1px solid ' + greyOnWhiteColor}}> 
            <Alert message="Sign In" type="info" />
            <br/>
            <br/>
            <Form
                name="basic"
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <span style={{color: 'grey'}}>Username (Your work email)</span>
                <Form.Item
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please input your username!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <span style={{color: 'grey'}}>Password</span>
                <Form.Item
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                >
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                    Submit
                </Button>
                </Form.Item>
            </Form>
            
            </div>
)};

export const SignUp = () => { 

    const {login, state} = useAppContext();

    const [ loading, setLoading ] = useState(false);

    const [ signedUp, setSignedUp ] = useState(false);

    const [ userExists, setUserExists ] = useState(false);

    const companyId = useParams().companyId;
    
    const onFinish = ({password, username, confirmpassword }) => {
        setLoading(true);
        if(confirmpassword !== password){
            message.error('Passwords do not match');
        setLoading(false);
        } else {
            signUp(username, password, companyId).then(async (res) => {
            sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('Email verification sent!');
            });
                setLoading(true);
                setSignedUp(true);
            }).catch((err) => {
                message.error(err.response.data.message);
                if(err.response.data.message === 'auth/email-already-exists'){
                    message.warning('Email already in use');
                    setUserExists(true);
                }
                setLoading(false);
            })
        }
      };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
        return( userExists ? 
        <>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>

                <Alert message="User already exists" type="warning" showIcon />
                <br/>
                <Link to="/"><Button type="ghost"> Click here to Login </Button></Link>

            </div>
        </>
        :
            <div style={{zIndex: '99999', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '30px', borderRadius: primaryBorderRadius, border: '1px solid ' + greyOnWhiteColor}}> 
                { signedUp ? <Alert message="Sign up successful" type="success" showIcon /> : <Alert message="Sign Up" type="info" />}
            <br/>
            <br/>
            {
                signedUp ? 
                <>
                <Alert style={{padding: '10px 30px'}} message={<h3 style={{fontWeight: '400'}}>
                <MailOutlined /> &nbsp; Check your email inbox, we have sent you a verification link!
                <br/>
                You can login after verifying your email
            </h3>} type="warning" />
            
            <br/>
            <Link to="/"><Button type="ghost"> Click here to Login </Button></Link>
            </>
            :
                <Form
                    name="basic"
                    style={{
                    maxWidth: 600,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <span style={{color: 'grey'}}>Username (Your work email)</span>
                    <Form.Item
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your username!',
                        },
                    ]}
                    >
                    
                    <Input />
                    </Form.Item>
    
                    <span style={{color: 'grey'}}>Password</span>
                    <Form.Item
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                   
                    <Input.Password />
                    </Form.Item>

                    <span style={{color: 'grey'}}>Confirm password</span>
                    <Form.Item
                    name="confirmpassword"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                   
                    <Input.Password />
                    </Form.Item>

                    <Form.Item
                     
                    >
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        {loading ? <Spin indicator={<Loading3QuartersOutlined style={{color: 'white'}} spin/>} /> : 'Submit'}
                    </Button>
                    </Form.Item>
                </Form>
            }
                
                
                </div>
    )};