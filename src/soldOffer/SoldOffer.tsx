/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Customtable from '../components/CommonTable/Table';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Space, Tag,notification,Input, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
type Data ={
  _id: string;
  userName?: string;
  mobileNumber?: string;
  balance?: number;
  isBanned?: boolean;
  price?:number,
  status?:string,
  userId?:{_id?:string,id?:string} | string
  offerName?:string,
   id?:string,
  createdAt: string;
}
type Column = {
  title:string,
  dataIndex?:string,
  key:string,
  render?:(status:boolean | string ,record:Data)=>JSX.Element
}
const baseUrl = import.meta.env.VITE_BACKEND_URL

const SoldOffer = () => {
  const navigate = useNavigate()
    const [pagination, setPagination] = useState<number>(1);
    const [datas, setData] = useState([]);
    const [totalPage,setTotalPage] = useState<number>(0)
    const [searchNumber,setSearchNumber] = useState<string>("")
    const [num,setNum] = useState<string>("")

    useEffect(()=>{
      if(searchNumber.length ===24){
        setNum(searchNumber)
      }else{
        setNum('')
      }
       
  
    },[searchNumber])

    useEffect(()=>{
        const getData = async()=>{
        try{
         const {data} = await axios.get(`${baseUrl}/adminoffer/soldOffer?page=${pagination}&id=${num}`,{
          withCredentials:true
         })
      
         setData(data.offer)
         setTotalPage(data.totalPage)
         console.log(data)
         
        }catch(error){
          if(error.response.status === 408){
            navigate('/login')
          }
          console.log(error)
        }
        }
       
        getData()
       },[ navigate, pagination,num,num.length]
      )

      const approve = async (id:string)=>{
         try{
          const data = await axios.get(`${baseUrl}/adminoffer/approved/${id}`,{
            withCredentials:true
          })
          if(data.status === 200){
            notification.open({
              message:" Offer Successfully Approved",
              placement:"topRight"
            })
          }
         const newData = datas.filter((item:Data)=>item._id !== id)
         setData(newData)
         }catch(error:any){
          console.log(error)
          if(error.response.status === 408){
            navigate('/login')
          }
          notification.open({
            message:"something worng",
            placement:"topRight"
          })
         }
      }
      const columns:Column[] = [
    
        {
          title: 'price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'mobile number',
          dataIndex: 'mobileNumber',
          key: 'mobileNumber',
        },
        {
          title: 'Tong-ID',
          dataIndex: "userId",
          key: 'userId',
          render:(userId: { _id?: string; id?: string }) => {
            if (typeof userId === 'object' && userId?.id) {
              return userId.id;
            } else if (typeof userId === 'string') {
              return userId;
            }else if (userId === null){
              return '-'
            }else{

              return '-';
            }
          }
        },
        {
          title: 'offer name',
          dataIndex: 'offerName',
          key: 'offerName',
        },
        {
          title: 'offer ID',
          dataIndex: '_id',
          key: '_id',
        },
        {
          title: 'status',
          dataIndex: 'status',
          key: 'status',
          render: (status?: string | boolean,record:Data) => {
            let color;
            if (status === "loading") {
                color = '#b134eb';
            } else if (status === "approve") {
                color = 'green';
            } else {
                color = 'red'; // Handles any other value or undefined
            }
            return <Tag color={color}>{<LoadingOutlined />}</Tag>;
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
          render: (_: any, record: Data) => (
            <Space size="middle">
              {record.status !== "approve" && (
                <Popconfirm
                  title="Are you sure to approve this offer?"
                  onConfirm={() => approve(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="link"
                    icon={<CheckOutlined color='#1bd13a' style={{ fill: "#1bd13a", color: "#1bd13a" }} />}
                  />
                </Popconfirm>
              )}
            </Space>
          ),
        },
      ];
       
  return (
    <>
     {/* <Input onChange={(e)=>setSearchNumber(e.target.value)} value={searchNumber} style={{marginBottom:"20px"}} placeholder='search by id'/> */}
    <Customtable title='Pending offers ' data={datas}  columns={columns} paginations={pagination} setPagination={setPagination} totalPage={totalPage}/>
    </>
    
  )
}

export default SoldOffer