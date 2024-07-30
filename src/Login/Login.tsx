import {useState} from 'react'
import {  Button, Checkbox, Form, Input, notification  } from "antd";
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import axios from 'axios';

import { useContext } from 'react';
import { contextProvider } from '../Context/Provider';
const baseUrl = import.meta.env.VITE_BACKEND_URL
const Login = () => {
  const {setIsAuth} = useContext(contextProvider)

  const [Number,setNumber] = useState<string>("")
  const [password,setPassword] = useState<string>("")

    const onFinish = (values:string) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo:ValidateErrorEntity<string>) => {
        console.log('Failed:', errorInfo);
      };

      const approve = async ()=>{
      

        const upd= {
          number:Number,
          password:password
        }
        localStorage.setItem('updData', JSON.stringify(upd));
        try{
         const {data} = await axios.post(`${baseUrl}/user/userlogin`,upd,{
           withCredentials:true
         })
         if(data.isAdmin){
          notification.open({
            message:"login successfully",
            placement:"topRight"
          })
          setIsAuth(true)
          window.location.reload()

         }else{
          notification.open({
            message:"you are not admin",
            placement:"topRight"
          })

         }
         console.log(data)

        }catch(error){
         console.log(error)
         notification.open({
           message:"something worng",
           placement:"topRight"
         })
        }
     }
  return (
   <div className='Admin-login'>
       <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
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
    <h4 className='text-center text-2xl'>
      Admin Login
    </h4>
    <Form.Item
      label="Number"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your number!',
        },
      ]}
    >
      <Input value={Number} onChange={(e)=>setNumber(e.target.value)} />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password  value={password} onChange={(e)=>setPassword(e.target.value)}/>
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
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button onClick={approve} type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
   </div>
  )
}

export default Login