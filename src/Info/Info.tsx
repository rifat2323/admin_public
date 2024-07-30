/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Input, Button, Typography, Row, Col, notification } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;


const baseUrl = import.meta.env.VITE_BACKEND_URL
const SubmitInfoForm = () => {
  const onFinish = async (values:{ number: string, email: string }) => {
    console.log('Form Values:', values);
     try{
     const data = await axios.get(`${baseUrl}/adminoffer/customerservice?number=${values.number}&email=${values.email}`,{
        withCredentials:true
     })
     if(data.status === 200){
        notification.open({
            message:"Information Updated successfully",
            placement:"topRight"
        })
     }
     }catch(error:any){
        console.log(error)
        notification.open({
            message:error.response.data,
            placement:"topRight"
        })
     }

  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #d9d9d9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Customer service</Title>
      <Form
        name="submit_info"
        layout="vertical"
        onFinish={onFinish}
        style={{ width: '100%' }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="number"
              label="number"
              rules={[{ required: true, message: 'Please enter number' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SubmitInfoForm;
