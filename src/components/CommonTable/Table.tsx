//@ts-nocheck
//@ts-ignore

import React from 'react';
import { Table } from 'antd';



/* import './BlogPosts.css'; */



type Column = {
    title:string,
    dataIndex?:string,
    key:string,
    render?:(status?:boolean | string | number,record?:Data)=>JSX.Element
}
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
     
    createdAt: string;
}
interface TableProps {
    data: Data[];
    columns: Column[];
    totalPage: number;
    paginations: number;
    setPagination: React.Dispatch<React.SetStateAction<number>>;
    title: string;
  }

const Customtable:React.FC<TableProps> = ({ data, columns, totalPage, paginations, setPagination, title }) => {
  
  
  




  return (
    <div className="blog-posts-container">
      <div className="header-content">
        <h1>{title}</h1>
       
      </div>
      <Table dataSource={data} columns={columns} pagination={{ total:totalPage, pageSize:30, current:paginations.current, onChange:(page:number,p)=>setPagination(page)}} />
    </div>
  );
};

export default Customtable;
