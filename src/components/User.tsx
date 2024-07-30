/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Space,notification, Popconfirm } from 'antd';
import { PlusOutlined, CheckOutlined,UserDeleteOutlined,UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input } from "antd";


/* import './BlogPosts.css'; */


interface BlogPost {
  _id: string;
  userName: string;
  mobileNumber: string;
  balance: number;
  isBanned: boolean;
 
  createdAt: string;
}

const baseUrl = import.meta.env.VITE_BACKEND_URL
const User: React.FC = () => {
  const navigate = useNavigate()
  const [pagination, setPagination] = useState<number>(1);
  const [datas, setData] = useState<BlogPost[]>([]);
  const [totalPage,setTotalPage] = useState<number>(0)
  const [searchNumber,setSearchNumber] = useState<string>("")
  const [num,setNum] = useState<string>("")

  useEffect(()=>{
    setTimeout(() => {
      setNum(searchNumber)
    }, 1500);
     

  },[searchNumber])



  useEffect(()=>{
     
      const getData = async()=>{
        try{
         const {data} = await axios.get(`${baseUrl}/adminoffer/user?page=${pagination}&number=${num}`,{
          withCredentials:true
         })
         console.log(data.useres)
         setData(data.useres)
         setTotalPage(data.totalPage)
        
         
        }catch(error:any){
          console.log(error)
          if(error.response.status ===408){
            navigate("/login")
          }
        }
        }
        getData()

     
    
   },[navigate, num, pagination, num.length])

 



   

  const UserUnnBann = async (id:string)=>{
     try{
        const {data} = await axios.get(`${baseUrl}/adminoffer/unbanuser/${id}`,{
          withCredentials:true
        })
        if(data.userUnbanned === "successfully"){
         notification.open({
          message:" User Successfully Unbanned ",
          placement:"topRight"
         })
        }

        const newData = datas.map((item:BlogPost)=>item._id === id ? {...item, isBanned:false} : item)
        setData(newData)
     }catch(error){
      console.log(error)
      notification.open({
        message:"something went worng",
        placement:"topRight"
       })
     }
  }
  const userBann = async (id:string)=>{
     try{
        const {data} = await axios.get(`${baseUrl}/adminoffer/bannuser/${id}`,{
          withCredentials:true
        })
        if(data.userBanned === "successfully"){
         notification.open({
          message:" User Successfully Banned",
          placement:"topRight"
         })
        }
        const newData = datas.map((item:BlogPost)=>item._id === id ? {...item, isBanned:true} : item)
        setData(newData)
     }catch(error){
      console.log(error)
      notification.open({
        message:"something worng",
        placement:"topRight"
       })
     }
  }

  const columns = [
    
    {
      title: 'Tong-Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'mobile number',
      dataIndex: 'mobileNumber',
      key: 'mobile-number',
    },
    {
      title: 'banned',
      dataIndex: 'isBanned',
      key: 'isBanned',
      render: (status: boolean) => {
        let color = status ===  true ? 'red' : 'false';
        if (status === undefined) {
          color = 'red';
        }
        return <Tag color={color}>{<CheckOutlined/>}</Tag>;
      },
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: BlogPost) => (
        <Space size="middle">
         
          <Popconfirm
                  title="Are you sure to remove the ban for this user?"
                  onConfirm={() => UserUnnBann(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
             <Button type="link" icon={<UserAddOutlined />} />
                 
                </Popconfirm>


          <Popconfirm
                  title="Are you sure to ban this user?"
                  onConfirm={() => userBann(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
              {/* <Button type="link" icon={<DeleteOutlined />} /> */}
          <Button type="link"  icon={<UserDeleteOutlined color='#f56042' className='deleteIcons' />} />
                 
                </Popconfirm>



        </Space>
      ),
    },
  ];

  return (
    <div className="blog-posts-container">
      <div className="header-content">
        <h1>Customize your User</h1>
        {/* <Button type="primary" icon={<PlusOutlined />}>Create</Button> */}
      
      </div>
      {/* <Input onChange={(e)=>setSearchNumber(e.target.value)} value={searchNumber} style={{marginBottom:"20px"}} placeholder='search user by number'/> */}
      <Table dataSource={datas} columns={columns} pagination={{ total:totalPage, pageSize:30, current:pagination, onChange:(page,p)=>{
        setPagination(page)
        console.log(p)
        }}} />
    </div>
  );
};

export default User;
