/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState,useEffect } from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './BlogPosts.css';
import axios from 'axios';
import { notification } from "antd";
import { useNavigate } from 'react-router-dom';
interface BlogPost {
  _id: string;
  auth: string;
  name: string;
  priod: string;
  category: string;
  todayPrice: number;
  createdAt: string;
  regularPrice:number
}

const baseUrl = import.meta.env.VITE_BACKEND_URL
const BlogPosts: React.FC = () => {
  const [curretPage, setPagination] = useState<number>(1);
  const [datas, setData] = useState<BlogPost[]>([]);
  const [totalPage,setTotalPage] = useState<number>(0)
   const navigate = useNavigate()

  useEffect(()=>{
    const getData = async()=>{
    try{
     const {data} = await axios.get(`${baseUrl}/adminoffer/alloffer?page=${curretPage}`,{
      withCredentials:true
     })
     setData(data.offers)
     setTotalPage(data.totalPage)
     
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any){
      console.log(error)
      if(error.response.status === 408){
          navigate('/login')
      }
    }
    }
    getData()
   },[curretPage,navigate])

   const handelDelete = async (id:string)=>{
    try{
      const {data} = await axios.delete(`${baseUrl}/adminoffer/offerdel/${id}`,{
        withCredentials:true
      })
      if(data.offerDeleted === "successfully"){
       notification.open({
        message:"successfully delete Offer",
        placement:"topRight"
       })
        
      }
     const newData =  datas.filter((item:BlogPost)=>item._id !== id)
     console.log(newData)
     setData(newData)

    }catch(error:any){
      if(error.response.status === 408){
        navigate('/login')
      }
      console.log(error)
    }
   }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
    },
    {
      title: 'Price',
      dataIndex: 'todayPrice',
      key: 'title',
    },
    {
      title: 'Validity',
      dataIndex: 'priod',
      key: 'content',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    // {
    //   title: 'Price',
    //   dataIndex: `regularPrice`,
    //   key: 'tk',
    
    // },
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
          <Button type="link" onClick={()=>navigate(`/edit/${record._id}`)} icon={<EditOutlined />} />

          <Popconfirm
                  title="Are you sure to delete this offer?"
                  onConfirm={() => handelDelete(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
              <Button type="link" icon={<DeleteOutlined />} />
                 
                </Popconfirm>


        </Space>
      ),
    },
  ];

  return (
    <div className="blog-posts-container">
      <div className="header-content">
        <h1>Customize your offer</h1>
        <Button type="primary" onClick={()=>navigate('/create')} icon={<PlusOutlined />}>Create</Button>
      </div>
      <Table dataSource={datas} columns={columns} pagination={{ total:totalPage, pageSize:30, current:curretPage, onChange:(page,p)=>{
        setPagination(page)
        console.log(p)
        }}} />
    </div>
  );
};

export default BlogPosts;
