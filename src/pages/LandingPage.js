import React from 'react';
import { Button, Typography, Card, Row, Col, Tag } from 'antd';
import { Layout, Space, Input } from 'antd';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined, InstagramOutlined, ApartmentOutlined, CompassOutlined, RocketOutlined, FileDoneOutlined, ToolFilled, AppstoreAddOutlined, BarChartOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { greyOnWhiteColor, primaryColor, primaryTextColor, silverColor, successColor} from '../css';
import { info } from 'sass';
import { backgroundImageForAuthAndLandingPages } from '../Constants';
import { logo } from '../assets';

const { Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const infoColor = '#1890ff';

const AddOnTag = () => {
    return <Tag style={{
        position: 'absolute', right: '0px', top: '8px'
    }}
    color={'blue'}
    >Add-on</Tag>
}

const FreeTag = () => {
    return <Tag style={{
        position: 'absolute', right: '0px', top: '8px'
    }}
    color={'green'}
    >Freemium</Tag>
}

const toolCardStyle = {
    margin: 'auto',
    textAlign: 'center',
    cursor: 'pointer',
    // border: '1px solid ' + greyOnWhiteColor,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)'
}

function LandingPage() {

const navigate = useNavigate();

 const takeToHris = () => {
    navigate('/hris/home');
    window.location.reload(); // This will refresh the page
  };


    return (
        <Layout style={{ padding: '0px 20px',
        }}>
<br/>
            <Row justify="center">
                <Col xs={24} md={16} style={{textAlign: 'left'}}>
                    <br/>
                    <br/>
                <img src={logo} style={{width: '70px', marginBottom: '-5px'}} /> &nbsp; 
                    <Title level={1} style={{ color: infoColor, position: 'relative', display: 'inline-block', fontWeight: '500'}}>
                       
                        CORE.HRIS
                        <span style={{position: 'absolute', top: '42px', right: '0px', fontSize: '15px', fontWeight: '400'}}>by Nexonware</span>
                    </Title>

                    <br/>
                    <br/>
                    <br/>
                   
                    <Paragraph style={{ fontSize: '16px', color: primaryTextColor }}>
                    Streamlined HR management, all in one place. Designed to enhance efficiency and boost employee satisfaction.
                    </Paragraph>

                    <br/>
                    <br/>

                    <h1
                    align="center"
                    style={{
                        color: 'gray',
                        fontWeight: '400'
                    }}>"Empowering teams and elevating their work experience"</h1>

<br/>
<br/>
<div align="center">
                
                    <Button onClick={takeToHris} type="primary"
        size="large"
        style={{
          borderColor: '#1890ff',
          borderRadius: '999px',
          padding: '24px 29px',
          fontSize: '19px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s, transform 0.3s',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}>
                        Get Started <CaretRightOutlined />
                    </Button>
                    </div>
                </Col>
            </Row>

<br/>
            <br/>
            <br/>
            <br/>

            <Row justify="center" gutter={[16, 16]}>
                <Col xs={24} md={16} align="left">
                    <span align="left">
                        {/* <Title style={{fontWeight: '300', paddingBottom: '3px', color: infoColor, borderBottom: '0px solid ' + infoColor, display: 'inline', marginLeft: '3px'}} level={5}> <AppstoreAddOutlined /> Features and Tools &nbsp; </Title> */}
                    </span>
                </Col>
            </Row>
            
            <Row justify="center" gutter={[16, 16]}>
            <Col xs={0} md={4}></Col>
                <Col xs={24} md={8}>
                    <Card  style={toolCardStyle}>
                        <Title style={{fontWeight: '300', color: primaryTextColor}} level={3}><ApartmentOutlined /> &nbsp; Organizational Charts <FreeTag /></Title>
                        <Paragraph>
                            Maintain and visualize your company's hierarchy with ease. Track changes and integrate with Microsoft Teams.
                        </Paragraph>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card  style={toolCardStyle}>
                        <Title style={{fontWeight: '300', color: primaryTextColor}} level={3}><CompassOutlined /> &nbsp; Leave Management <FreeTag /></Title>
                        <Paragraph>
                            Effortlessly manage employee leave requests and approvals, ensuring smooth operations.
                        </Paragraph>
                    </Card>
                </Col>
            <Col xs={0} md={4}></Col>
            </Row>
            <br/>
            <Row justify="center" gutter={[16, 16]}>
            <Col xs={0} md={4}></Col>
                <Col xs={24} md={8}>
                    <Card  style={toolCardStyle}>
                        <Title style={{fontWeight: '300', color: primaryTextColor}} level={3}> <FileDoneOutlined /> &nbsp; Expense Management <FreeTag /></Title>
                        <Paragraph>
                            Simplify expense claims and reimbursements, making it easy for employees to manage their finances.
                        </Paragraph>
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    <Card  style={toolCardStyle}>
                        <Title style={{fontWeight: '300', color: primaryTextColor}} level={3}><RocketOutlined /> &nbsp; Performance & Career <AddOnTag /> </Title>
                        <Paragraph>
                            Track and evaluate performance, set goals, and manage career development for your employees.
                        </Paragraph>
                    </Card>
                </Col>
            <Col xs={0} md={4}></Col>

            </Row>

            <br/>

            <Row justify="center" gutter={[16, 16]}>
            <Col xs={0} md={4}></Col>
                <Col xs={24} md={8}>
                    <Card  style={toolCardStyle}>
                        <Title style={{fontWeight: '300', color: primaryTextColor}} level={3}><BarChartOutlined /> &nbsp; HR Analytics <AddOnTag /> </Title>
                        <Paragraph>
                            Generate reports on your company's employee's data gathered over time
                        </Paragraph>
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    {/* <Card  style={toolCardStyle}>
                        <Title style={{fontWeight: '300', color: primaryTextColor}} level={3}><BarChartOutlined /> &nbsp; HR Analytics <AddOnTag /> </Title>
                        <Paragraph>
                            Generate reports on your company's employee's data gathered over time
                        </Paragraph>
                    </Card> */}
                </Col>

                
            <Col xs={0} md={4}></Col>

            </Row>

            <br/>
            <br/>
            <br/>


            <Row justify="center" align="middle" style={{ marginTop: '50px' }}>
            <Col xs={0} md={4}></Col>
                <Col xs={12} md={4} style={{textAlign: 'center'}}>
                    <img 
                        src={'https://cdn.pixabay.com/photo/2016/01/10/22/30/smartphone-1132677_1280.png'} 
                        alt="Mobile App" 
                        style={{ width: '75%', borderRadius: '8px', cursor: 'pointer' }} 
                    />
                </Col>
                <Col xs={24} md={10} style={{ paddingLeft: '30px' }}>
                    <Title level={2} style={{ color: '#1890ff', marginBottom: '20px', fontWeight: '400' }}>
                        Seamless Mobile Experience
                    </Title>
                    <Paragraph style={{ fontSize: '16px', color: '#333' }}>
                        Our Android app ensures you stay connected and productive wherever you are. Receive real-time notifications, manage approvals, and keep up with all your HR tasks effortlessly—empowering both employees and managers.
                    </Paragraph>
                </Col>
                <Col xs={0} md={4}></Col>
            </Row>


            <br/>
            <br/>


            <Row justify="center" align="middle" style={{ marginTop: '50px' }}>
                <Col xs={0} md={4}></Col>
                <Col xs={24} md={10} style={{ paddingLeft: '30px' }}>
                <Title level={2} style={{ color: '#1890ff', fontWeight: '400'  }}>
                        Join the Future of HR Management
                    </Title>
                    <Paragraph style={{ fontSize: '16px', color: '#555' }}>
                        Transform the way you handle HR tasks with our innovative and user-friendly platform.
                    </Paragraph>
                        <a href="https://calendly.com/neeleshsharma/core-hris-demo" target='_blank' style={{textDecoration: 'none'}}>
                            <Button type="primary" size="large" style={{ marginTop: '20px' }}>
                                Request a Demo <CaretRightOutlined />
                            </Button>
                        </a>
                </Col>

                <Col xs={0} md={4} style={{textAlign: 'center'}}>
                    <img 
                        src={'https://cdn.pixabay.com/photo/2018/06/26/02/14/handshake-3498407_1280.png'} 
                        alt="Mobile App"
                        style={{ width: '75%', borderRadius: '8px', cursor: 'pointer'}} 
                    />
                </Col>
            <Col xs={0} md={4}></Col>
            </Row>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>


            <Footer style={{ backgroundColor: 'rgba(0, 21, 41, 0.8)', padding: '60px 50px', width: '100vw', left: '0px', marginLeft: '-20px' }}>
                <Row justify="space-around" gutter={[32, 32]} style={{ color: '#ffffff' }}>
                    <Col xs={24} md={6}>
                        <Title level={4} style={{ color: '#ffffff' }}>About Nexonware</Title>
                        <Paragraph style={{ color: '#d9d9d9' }}>
                        Nexonware is a dynamic software company committed to delivering cutting-edge solutions across various industries. We specialize in developing innovative, scalable, and efficient software to address a broad range of business needs.
                        </Paragraph>
                    </Col>

                    <Col xs={24} md={4}>
                        <Title level={4} style={{ color: '#ffffff' }}>Company</Title>
                        <Space direction="vertical">
                            <Link href="#about" style={{ color: '#d9d9d9' }}>About Us</Link>
                            <Link href="#careers" style={{ color: '#d9d9d9' }}>Careers</Link>
                            <Link href="#blog" style={{ color: '#d9d9d9' }}>Blog</Link>
                            <Link href="#press" style={{ color: '#d9d9d9' }}>Press</Link>
                        </Space>
                    </Col>

                    <Col xs={24} md={4}>
                        <Title level={4} style={{ color: '#ffffff' }}>Our Products</Title>
                        <Space direction="vertical">
                            <Link href="#help" style={{ color: '#d9d9d9' }}>ATS</Link>
                            <Link href="#guides" style={{ color: '#d9d9d9' }}>CORE.HRIS</Link>
                        </Space>
                    </Col>

                    <Col xs={24} md={4}>
                        <Title level={4} style={{ color: '#ffffff' }}>Contact</Title>
                        <Space direction="vertical">
                            <Link href="mailto:contact@nexonware.com" style={{ color: '#d9d9d9' }}>contact@nexonware.com</Link>
                            <Link href="tel:919870938860" style={{ color: '#d9d9d9' }}>+91 9870938860</Link>
                            <Link href="#contact" style={{ color: '#d9d9d9' }}>Contact Form</Link>
                        </Space>
                    </Col>

                    <Col xs={24} md={6}>
                        <Title level={4} style={{ color: '#ffffff' }}>Subscribe to our Newsletter</Title>
                        <Paragraph style={{ color: '#d9d9d9' }}>
                            Stay updated with the latest news and special offers from [Your HRIS Name].
                        </Paragraph>
                        <Space>
                            <Input placeholder="Enter your email" style={{ width: '150px' }} />
                            <Button type="primary">Subscribe</Button>
                        </Space>
                    </Col>
                </Row>

                <Row justify="center" style={{ marginTop: '30px', textAlign: 'center', color: '#d9d9d9' }}>
                    <Col xs={24}>
                        <Space size="large">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#d9d9d9' }}>
                                <FacebookOutlined style={{ fontSize: '24px' }} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#d9d9d9' }}>
                                <TwitterOutlined style={{ fontSize: '24px' }} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#d9d9d9' }}>
                                <LinkedinOutlined style={{ fontSize: '24px' }} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#d9d9d9' }}>
                                <InstagramOutlined style={{ fontSize: '24px' }} />
                            </a>
                        </Space>
                    </Col>
                </Row>

                <Row justify="center" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Col xs={24}>
                        <br/>
                        <Text style={{color: 'silver'}}>© {new Date().getFullYear()} Nexonware. All Rights Reserved.</Text>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
}

export default LandingPage;
