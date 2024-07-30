/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import styes from  './upload.module.css'
import { Typography } from"antd";
import{ Select }from"antd";
import{ Image }from"antd";
import { Button,notification } from "antd";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_BACKEND_URL
const Uploads = () => {
  const navigate = useNavigate()
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [multipleFile, setMultipleFile] = useState<File[] | []>([]);
  
    const [sinImg,setSingImg] = useState<string | null>(null)
    
    const [multple,setMultiple] = useState<string[] | []>([])
    const [selected,setSelected] = useState<string>('logo')
   const [loading,setLoading] = useState(false)
    useEffect(()=>{
      multipleFile.map(item=>setMultiple((prev)=>([...prev,URL.createObjectURL(item)])))

    },[multipleFile])




  const handelSubmitLogobanner = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const files = e.target.files
    if(files){

      setSingleFile(files[0])
      setSingImg(URL.createObjectURL(files[0]))
    }
  }
  
   const handelDrag = (e:React.DragEvent<HTMLDivElement>) =>{
    e.stopPropagation();
    e.preventDefault()
   }
   const handelDropSingle = (e:React.DragEvent<HTMLDivElement>) =>{

    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files
     if(file){
      setSingleFile(file[0])
      setSingImg(URL.createObjectURL(file[0]))
     }
   }

  const handelMultipleClick = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const files = e.target.files;
    if (files) {
    const filesArray = Array.from(files); // Convert FileList to array
    if (filesArray.length > 0) {
      setMultipleFile((prev) => [...prev, ...filesArray]); 
    }
  }
    
  }
  const handelMultipleDrop = (e:React.DragEvent<HTMLDivElement>) =>{
   
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files
     if(file){
      const filesArray = Array.from(file);
      if (filesArray.length > 0) {
        setMultipleFile((prev) => [...prev, ...filesArray]); 
      }
      
     }


  }
  const handelSubmitSingle = async ()=>{
    if(loading){
      return;
    }
    if (!singleFile) {
      notification.open({
        message: "No file selected",
        placement: "topRight"
      });
      return; // Exit the function if no file is selected
    }
    const formData = new FormData();
    formData.append(selected,singleFile)
    setLoading(true)
     try{
      const data = await axios.post(`${baseUrl}/picture/${selected}`,formData,{
        withCredentials:true
      })
      if(data.status === 200){
        notification.open({
          message: "upload successfully",
          placement: "topRight"
        });
        setLoading(false)
      }
     }catch(error:any){
      console.log(error)
      if(error.response.status === 408){
        navigate('/login')
      }
      notification.open({
        message:error.message,
        placement:"topRight"
      })
      setLoading(false)
     }
  }

  const handelMultipleUpload = async ()=>{
    if(loading) return;
    if(multipleFile.length < 1){
      notification.open({
        message:"min 2 file needed",
        placement:"topRight"
      })
      return;
    }
    const formData = new FormData()
    multipleFile.map(item=>formData.append('slider',item))
    setLoading(true)
    try{
      const data = await axios.post(`${baseUrl}/picture/slider`,formData,{
        withCredentials:true
      })
      if(data.status === 200){
        notification.open({
          message: "upload successfully",
          placement: "topRight"
        });
        setLoading(false)
      }
    }catch(error:any){
      console.log(error)
      if(error.response.status === 408){
        navigate('/login')
      }
      notification.open({
        message:error.message,
        placement:"topRight"
      })
      setLoading(false)
    }
  }
  return (
    <div className={styes.container}>
        <Typography.Title  >Upload your Logo banner and Slides</Typography.Title>
       
    <div className={styes.uploadContain}>

    <div className={styes.width}>


     <div className={styes.drop}>
     <Typography.Title style={{marginTop:"50px",fontSize:"14px",whiteSpace:"nowrap"}} >For logo or banner</Typography.Title>
     <div className={styes.dropDown}>
        <Select  defaultValue={"logo"} onChange={(e)=>setSelected(e)} style={{width:"120px"}} >
            <Select.Option value="logo" >logo</Select.Option>
            <Select.Option  value="banner" >banner</Select.Option>
            
        </Select>
        </div>

     </div>


     

     <div className={styes.singe}>
  
      <div className={styes.upload}   onDragEnter={handelDrag}
          onDragLeave={handelDrag}
          onDragOver={handelDrag}
          onDrop={handelDropSingle}>
      <input type='file' accept='image/*' id='logo' onChange={handelSubmitLogobanner} max={1}/>
      <label htmlFor="logo" >
        <UploadOutlined size={36}/>
        <p>click or drop your image</p>
      </label>
      {
         sinImg &&(
          <Image src={sinImg} width={40} height={40}/>
        )
       
      }

      </div>
      
      </div>
     
      

    <Button onClick={handelSubmitSingle} size='large' style={{marginTop:"10px"}}>  <UploadOutlined size={46}/>Upload</Button>
    </div>
     





     <div className={styes.width}>

     <div className={styes.drop}>

    
     <Typography.Title style={{marginTop:"50px",fontSize:"14px",marginBottom:"8px"}}  >For only slider(max:6)</Typography.Title>
     </div>
     <div className={styes.singe}>
  
      <div className={styes.upload}   onDragEnter={handelDrag}
          onDragLeave={handelDrag}
          onDragOver={handelDrag}
          onDrop={handelMultipleDrop}>
      <input type='file' accept='image/*' multiple id='slider' onChange={handelMultipleClick}  max={6}/>
      <label htmlFor="slider" >
      <UploadOutlined size={36}/>
        <p> click or drop your image</p>
      </label>
      <div className={styes.multip}>

      
{
 
  multple.length > 0 &&(
    multple.map(item=>(
      <Image src={item} width={40} height={40}/>
    ))
  
  )
}
</div>
      </div>
    
      </div>

      <Button onClick={handelMultipleUpload} size='large' style={{marginTop:"10px"}}>  <UploadOutlined size={46}/>Upload</Button>
      </div>
      </div>
    </div>
  );
};

export default Uploads;
