import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, Rate } from 'antd';
import { getDirectReportsByEmail } from '../services/directReportsService';
import { useAppContext } from '../context/AppContext';
import { MailFilled, MailOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { greyOnWhiteColor } from '../css';

const { TextArea } = Input;
const { Option } = Select;

const ProvideReview = ({directs}) => {

  const [form] = Form.useForm();

  const [postReviewResponseLoading, setPostReviewResponseLoading] = useState(false);

  const handleSubmit = (values) => {
    message.error('Something went wrong, copy your text before leaving this page.');
    // setPostReviewResponseLoading(true);
    // updateReview({selfReview: {...values}, performanceCycle: state.careerAndPerformance.performanceCycle, cyclePeriod: state.careerAndPerformance.cyclePeriod}, state.apiToken).then((res) => {
    //     console.log(res);
    //     reviewSavedToDb();
    //     setPostReviewResponseLoading(false);
    // }).catch((err) => {
    //     message.error(err.message);
    //     setPostReviewResponseLoading(false);
    // })
  };

  return (
    <Form
    style={{ margin: 'auto', 
    border: `1px solid ${greyOnWhiteColor}`,
    padding: '12px 20px', backgroundColor: '#fff', borderRadius: '8px' , height: '100%', marginTop: '30px'}}
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        direct: undefined,
        review: '',
      }}
    >
      <Form.Item
        name="direct"
        label="Select Direct"
        rules={[{ required: true, message: 'Please select a direct report!' }]}
        style={{width: '60%'}}
      >
        

        <Select placeholder="Select a direct report" style={{height: '60px'}}>
          {directs.sort((a, b) => {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
                return -1;
            }
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
                return 1;
            }
            return 0;
            }).map((direct) => (
            <Option key={direct.email} value={direct.id}>
                <div>
                    {direct.firstName} {direct.lastName} <br/> <span style={{color: 'grey'}}><MailOutlined /> {direct.email}</span>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="review"
        label="Performance Review Comments"
        rules={[{ required: true, message: 'Please write the performance review!' }]}
      >
        <TextArea rows={4} placeholder="Write the performance review" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit Review
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProvideReview;
