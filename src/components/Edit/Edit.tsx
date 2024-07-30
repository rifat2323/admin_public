/* eslint-disable @typescript-eslint/no-explicit-any */
// src/EditForm.js
import  { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, notification } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BACKEND_URL
const EditForm = () => {
  const [form] = Form.useForm();
  // const [discount, setDiscount] = useState<number | null>(0);
  const [todayPrice, setTodayPrice] = useState<number | null>(0);
  // const [regularPrice, setRegularPrice] = useState<number | null>(0);
  const [offerName, setOfferName] = useState<string>('');
  const [caegory, setCaegory] = useState<string>('');
  const {id} = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const getOffer = async ()=>{

        try{
      const {data} = await axios.get(`${baseUrl}/adminoffer/getoneoffer/${id}`,{
        withCredentials:true
      })
       setCaegory(data.category)
       setOfferName(data.name)
      //  setRegularPrice(data.regularPrice)
       setTodayPrice(data.todayPrice)
      //  setDiscount(data.discount)

       form.setFieldsValue({
        discount: data.discount,
        todayPrice: data.todayPrice,
        regularPrice: data.regularPrice,
      });
     }catch(error){
      console.log(error)
      notification.open({
        message:"something worng",
        placement:"topRight"
      })
     }
    }
    getOffer()
  }, [id,form]);
  const UpdateOffer = async ()=>{
    const update ={
        discount:50,
        todayPrice,
        regularPrice:100
    }
     try{ 
        const data = await axios.patch(`${baseUrl}/adminoffer/updateoffer/${id}`,update,{
            withCredentials:true
          })
          if(data.status === 200){
            notification.open({
              message:" Offer Updated Successfully ",
              placement:"topRight"
            })
            navigate('/')
          }

     }catch(error:any){
        console.log(error)
        if(error.response.status === 408){
          navigate('/login')
        }
        notification.open({
            message:"something wrong",
            placement:"topRight"
          })
     }
  }

  const onFinish = () => {
    const updatedValues = {
      // discount,
      todayPrice,
      // regularPrice,
    };
    console.log('Updated Values:', updatedValues);
    // Call the onSave function passed via props
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '50px 0' }}>
      <Form
        form={form}
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
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Edit Offer</h2>

        <Form.Item label="Offer Name">
          <Input value={offerName} readOnly style={{ color: '#000', fontWeight: 'bold' }} />
        </Form.Item>

        <Form.Item label="Category">
          <Input value={caegory} readOnly style={{ color: '#000', fontWeight: 'bold' }} />
        </Form.Item>

        {/* <Form.Item
          name="discount"
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
          name="todayPrice"
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
          name="regularPrice"
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
          <Button onClick={UpdateOffer} type="primary" htmlType="submit" style={{ width: '100%' }}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditForm;
