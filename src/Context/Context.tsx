import React,{useEffect,useState} from 'react'

import { useNavigate } from 'react-router-dom';
import { contextProvider } from './Provider';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL
const Context = ({children}:{children:React.ReactNode}) => {
    const [value, setValue] = useState<string | boolean | number>('');
    const [isAuth,setIsAuth]= useState(true)
    const navigate = useNavigate(); 
    useEffect(()=>{
        if(!isAuth){
            navigate('/login')
        }

    },[isAuth,navigate])
    useEffect(()=>{
     const getuser =async ()=>{
      try{
        const data = await axios.get(`${baseUrl}/adminoffer/admininfo`,{
          withCredentials:true
        })
        if(data.status === 200){
          setIsAuth(true)
        }else{
          setIsAuth(false)

        }
       

      }catch(error){
        console.log(error)
        navigate('/login')
        setIsAuth(false)
      }
     }
     getuser()
    },[navigate])
  return (
    <contextProvider.Provider value={{isAuth,setIsAuth,value,setValue}}>

     {children}
    </contextProvider.Provider>
  )
}

export default Context