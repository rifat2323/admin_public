/* eslint-disable @typescript-eslint/no-explicit-any */

//@ts-nocheck
import  { useEffect, useState } from 'react'
import axios from 'axios';
import Customtable from '../components/CommonTable/Table';
import {  MoneyCollectOutlined,LoadingOutlined } from '@ant-design/icons';
import {  Tag } from 'antd';
import { useNavigate } from 'react-router-dom';



const baseUrl = import.meta.env.VITE_BACKEND_URL


type Data ={
  _id:string,
  amount:number,
  id:{_id?:string,id?:string} | string,
  status:string,
  createdAt:string
}

type Column = {
    title:string,
    dataIndex?:string,
    key:string,
    render?:(status?:boolean | string ,record?:Data)=>JSX.Element
  }
const Transition = () => {
    const navigate = useNavigate()
    const [pagination, setPagination] = useState<number>(1);
    const [datas, setData] = useState([]);
    const [totalPage,setTotalPage] = useState<number>(0)

    const columns:Column[] = [
    
        {
          title: 'amount',
          dataIndex: 'amount',
          key: 'amount',
        },
       
        {
          title: 'Tong-ID',
          dataIndex: 'id',
          key: 'id',
          render: (id: { _id?: string; id?: string } | string) => {
            // Check if userId is an object or a string and render accordingly
            if (typeof id === 'object' && id?.id) {
              return id.id;
            } else if (typeof id === 'string') {
              return id;
            }
            return '-'; // Default case if userId is not available
          },
        },
        
        {
          title: 'status',
          dataIndex: 'status',
          key: 'status',
          render: (status?: string ,record:Data) => {
            let color = status ===  "loading" ? <LoadingOutlined /> : <MoneyCollectOutlined  />;
            console.log(record.status)
            if (status === undefined) {
              color = 'red';
            }
            return <Tag color={'green'}>{color}</Tag>;
          },
        },
        {
          title: 'Created at',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
       
      ];





    useEffect(()=>{
        const getData = async()=>{
        try{
         const {data} = await axios.get(`${baseUrl}/adminoffer/payment?page=${pagination}`,{
          withCredentials:true
         })
      
         setData(data.offers)
         setTotalPage(data.totalPage)
         console.log(data)
         
        }catch(error:any){
          if(error.response.status === 408){
            navigate('/login')
          }
          console.log(error)
        }
        }
       
        getData()
       },[navigate, pagination]
      )
  return (
    
   <Customtable data={datas}  columns={columns} paginations={pagination} setPagination={setPagination} totalPage={totalPage} title='All user transition' key={'fafafafafafaf'}/>

   
  )
}

export default Transition