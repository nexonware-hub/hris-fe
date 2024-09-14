import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Switch, Alert, Select, message, Spin, Col, Row } from 'antd';
import moment from 'moment';
import ToolBanner from './ToolBanner';
import { t } from 'i18next';
import { CaretRightFilled, EditOutlined, Loading3QuartersOutlined, LoadingOutlined, UserAddOutlined } from '@ant-design/icons';
import { greyOnWhiteColor, primaryBorderRadius, primaryColor, silverColor } from '../css';
import { signin } from '../assets';
import { Roles } from '../Constants';
import { createEmployee } from '../services/employeeService';
import { useAppContext } from '../context/AppContext';

/**
 * NewEmployeeForm is a form component used to add a new employee in the org chart.
 * It renders a vertical form with fields for first name, last name, job title, manager email,
 * resigned status, and start date.
 * The component also includes a submit button that triggers the onFinish callback.
 * The onFinish callback is passed the form values as an argument.
 */
const NewEmployeeForm = () => {
  const [form] = Form.useForm();

  const {state} = useAppContext();

  const initialValues = {
    firstName: "Faisal",
    lastName: "Raza",
    jobTitle: "Full Stack Developer",
    managerEmail: "michael.brown@example.com",
    resigned: false,
    startDate: moment("2022-02-18", "YYYY-MM-DD")
  };

  const onFinish = (values) => {
    console.log('Form Values:', values);
    setLoading(true);
    createEmployee({...values, companyId: state.company.id}, state.apiToken)
    .then(() => {
        form.resetFields();
        setLoading(false);
        message.success('Employee created successfully')})
    .catch((err) => {
        setLoading(false);
        message.error(err.response.data)});
  };

  const [loading, setLoading] = useState(false);

  return (
    <>
        <ToolBanner icon={<UserAddOutlined />} title={t('Add Employee')} subTitle={'Add a new employee to company directory'} />
        <br/>
        <Row>
    <Col xs={0} md={2}></Col>

    <Col xs={24} md={10} style={{height: '30vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} align="center">
    <img src={signin} style={{width:'60%'}} />
 
    </Col>

    <Col xs={24} md={10} align="center" style={{padding: '0px 20px'}}>
    <div style={{ border: '1px solid ' + greyOnWhiteColor, borderRadius: primaryBorderRadius}}>
    <Alert icon={<EditOutlined />} style={{ 
        backgroundColor: silverColor, fontWeight: '500', border: '10px solid white', borderRadius: '8px 8px 0px 0px', padding: '7px 12px', 
    }} message={<h4 style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',  
            fontWeight: '300',
            margin: '0px'
        }}>Add an employee</h4>} 
      type={'info'} showIcon />
    <Form
      disabled={loading}
      form={form}
      layout="vertical"
    //   initialValues={initialValues}
      onFinish={onFinish}
      style={{  margin: '0 auto', padding: '20px', backgroundColor: 'silverColor',
    
    }}
    >
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter the first name' }]}
            style={{width: '48%'}}
        >
            <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please enter the last name' }]}
            style={{width: '48%'}}
        >
            <Input placeholder="Enter last name" />
        </Form.Item>
    </div>

    <Form.Item
        label="Employee Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
      >
        <Input placeholder="Enter employee email" />
      </Form.Item>

    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Form.Item
        label="Job Title"
        name="jobTitle"
        rules={[{ required: true, message: 'Please enter the job title' }]}
        style={{width: '48%'}}
      >
        <Input placeholder="Enter job title" />
      </Form.Item>

        <Form.Item
        label="Start Date"
        name="startDate"
        rules={[{ required: true, message: 'Please select the start date' }]}
        style={{width: '48%'}}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
    </div>

    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Form.Item label="Role" name="role" style={{
        width: '48%'
      }}>
            <Select placeholder="Select role">
              {Object.keys(Roles).map((key) => Roles[key]).map((role) => (
                <Select.Option key={role} value={role}>
                  {role}
                </Select.Option>
              ))}
            </Select>
    </Form.Item>

    <Form.Item
        label="Manager Email"
        name="managerEmail"
        rules={[{ type: 'email', message: 'Please enter a valid email' }]}
        style={{width: '48%'}}
      >
        <Input placeholder="Enter manager email" />
      </Form.Item>
    </div>
      
    <br/>

      <Form.Item>
        <div align="right">
        <Button type="primary" htmlType="submit">
          { loading ? <Spin indicator={<Loading3QuartersOutlined spin />} /> : <>Submit <CaretRightFilled /></> }
        </Button>
        </div>
      </Form.Item>
    </Form>
    </div>
    </Col>
    <Col xs={0} md={2}></Col>
    </Row> 
   
    <br/>
    <br/>
    <br/>

    </>
  );
};

export default NewEmployeeForm;
