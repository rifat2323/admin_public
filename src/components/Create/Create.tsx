// src/App.js
import  { useState } from 'react';
import { Form, Input, Button, Select, InputNumber, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

/* const categories = ['Banglalink', 'Airtle', 'Robi', 'Grameen']; */
const categories = [
  {
    key:"Robi",
    value:"Robi"
  },
  {
    key:"Airtel",
    value:"Airtel"
  },
  {
    key:"Banglalink",
    value:"Banglalink"
  },
  {
    key:"grameenphone",
    value:"Grameen"
  },


]
const auths = ['minute', 'data', 'bundle'];
const baseUrl = import.meta.env.VITE_BACKEND_URL


const PostForm = () => {
  const navigate = useNavigate()
  // State management for each form field
  const [name, setName] = useState('');
  const [auth, setAuth] = useState('');
  const [category, setCategory] = useState('');
  const [proid, setProid] = useState('');
  // const [discount, setDiscount] = useState<number | null>(0);
  const [todayPrice, setTodayPrice] = useState<number | null>(0);
  // const [regularPrice, setRegularPrice] = useState<number | null>(0);
  const [loading,setLoading] = useState(false)
  
  const submitNew = async ()=>{
    if(loading) return;

     if(!name || !auth || !category || !proid ||  !todayPrice ){
      notification.open({
        message: "All Fields Are Required",
        placement: "topRight"
      });
    }
      const datas ={
        name:name,
        auth:auth,
        category:category,
        priod:proid,
        discount:10,
        todayPrice:todayPrice,
        regularPrice:10
      }
      setLoading(true)
     try{
      const data = await axios.post(`${baseUrl}/adminoffer/addoffer`,datas,{
        withCredentials:true
      })
      if(data.status === 200){
        notification.open({
          message: "New Offer created successfully",
          placement: "topRight"
        });
        setLoading(true)
      }
     }catch(error:any){
      if(error.response.status === 408){
        navigate('/login')
      }
      console.log(error)
      notification.open({
        message:"something worng",
        placement:"topRight"
      })
      setLoading(false)
     }
  }



  const onFinish = () => {
    const formValues = {
      name,
      auth,
      category,
      proid,
      // discount,
      todayPrice,
      // regularPrice,
    };
    console.log('Form Values:', formValues);
    // Handle form submission here
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '50px 0' }}>
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{
          padding: '20px',
          border: '1px solid #e9e9e9',
          borderRadius: '10px',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Create New Offer</h2>

        <Form.Item
          label="Offer Name"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the offer name"
          />
        </Form.Item>

        <Form.Item
          label="Offer Type"
          rules={[{ required: true, message: 'Please select an auth!' }]}
        >
          <Select
            value={auth}
            onChange={setAuth}
            placeholder="Select an auth"
          >
            {auths.map((authOption) => (
              <Option key={authOption} value={authOption}>
                {authOption}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select
            value={category}
            onChange={setCategory}
            placeholder="Select a category"
          >
            {categories.map((categoryOption) => (
              <Option key={categoryOption.key} value={categoryOption.value}>
                {categoryOption.key}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Validity"
          rules={[{ required: true, message: 'Please input the product ID!' }]}
        >
          <Input
            value={proid}
            onChange={(e) => setProid(e.target.value)}
            placeholder="enter the values"
          />
        </Form.Item>

        {/* <Form.Item
          label="Discount (%)"
          rules={[{ required: true, message: 'Please input the discount!' }]}
        >
          <InputNumber
            value={discount}
            onChange={setDiscount}
            min={0}
            max={500}
            placeholder="Enter the discount percentage"
            style={{ width: '100%' }}
          />
        </Form.Item> */}

        <Form.Item
          label="Price"
          rules={[{ required: true, message: 'Please input today\'s price!' }]}
        >
          <InputNumber
            value={todayPrice}
            onChange={setTodayPrice}
            min={0}
            placeholder="Enter Price"
            style={{ width: '100%' }}
          />
        </Form.Item>

        {/* <Form.Item
          label="Regular Price"
          rules={[{ required: true, message: 'Please input the regular price!' }]}
        >
          <InputNumber
            value={regularPrice}
            onChange={setRegularPrice}
            min={0}
            placeholder="Enter the regular price"
            style={{ width: '100%' }}
          />
        </Form.Item> */}

        <Form.Item>
          <Button onClick={submitNew} type="primary" htmlType="submit" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostForm;
