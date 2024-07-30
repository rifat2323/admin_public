import { useState,Suspense,useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu, notification } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import BlogPosts from './components/BlogPost';
import './App.css'
import User from './components/User';
import Uploads from './components/upload/Upload';
import SoldOffer from './soldOffer/SoldOffer';
import Login from './Login/Login';
const { Header, Sider, Content } = Layout;
import Context from './Context/Context';
import Loader from './components/Loader/Loader';
import PostForm from './components/Create/Create';
import EditForm from './components/Edit/Edit';
import axios from 'axios';
import { useContext } from 'react';
import { contextProvider } from './Context/Provider';
import Transition from './transition/Transition';
import Completed from './Complete offer/Complete';
import SubmitInfoForm from './Info/Info';
const baseUrl = import.meta.env.VITE_BACKEND_URL
function App() {
  const {setIsAuth} = useContext(contextProvider)
  const [count, setCount] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState(1);
  const [isLogin, setIsLogin] = useState(false)
  const [loading,setLoading] = useState(true)


 

 

  useEffect(()=>{
    const getLogo = async ()=>{
      try{

       const {data} = await axios.get(`${baseUrl}/public/logo`)
       setCount(data.logo)
      }catch(error){
        console.log(error)
      }

    }
    getLogo()

  
  },[])

  useEffect(()=>{
    const getuser =async ()=>{
     try{
       const data = await axios.get(`${baseUrl}/adminoffer/admininfo`,{
         withCredentials:true
       })
       if(data.status === 200){
        setIsLogin(true)
        setLoading(false)
       }else{
        setIsLogin(false)
        setLoading(false)
         
       }
      

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     }catch(error:any){
       console.log(error)
       if(error.response.status === 408){
        const storedValue: string | null = localStorage.getItem('updData');
        
        if (storedValue !== null) {
          setLoading(true)
          const parsedValue = JSON.parse(storedValue);
          console.log(`parse value:${parsedValue}`)
          const {data} = await axios.post(`${baseUrl}/user/userlogin`,parsedValue,{
            withCredentials:true
          })
          if(data.isAdmin){
            setIsLogin(true)
            setLoading(false)
            
          }
        } else {
          console.log('No value found for the key.');
          setIsLogin(false)
          setLoading(false)
        }

       }else{
        setIsLogin(false)
        setLoading(false)

       }
      
     
     }
    }
    getuser()
   },[])
 const handelLogOut = async()=>{
  try{
   const data = await axios.get(`${baseUrl}/adminoffer/logout`,{
    withCredentials:true
   })
   console.log(data)
    if(data.status === 200){
      localStorage.clear()
     
      setIsAuth(false)
    notification.open({
      message:"log out successfully",
      placement:"topRight"
    })
    }
   
  }catch(error){
    console.log(error)
  }
 }
  return (
    <Router>
       {
        isLogin ?(
          <Layout style={{ minHeight: '100vh' }} >
          <Sider className='sidebar' breakpoint="xs" collapsedWidth="0" theme='light'>
            <img src={count} loading='lazy' style={{marginLeft:"30px", marginBottom:"40px", marginTop:"30px", width:"80px", height:"80px"}} />
            <Menu className='capitalize' theme="light" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/"> Offers</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/user">users</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/upload">upload</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/pending">Pending</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/complete">complete offers</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/transactions">transactions</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/customerservice">customer service</Link>
              </Menu.Item>
              <Menu.Item key="8" icon={<LogoutOutlined />}>
                <Link onClick={handelLogOut} to="/">Logout</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="header-content">
             <div className='navbars'>
             <span> <h1>Tong Admin Panel</h1></span>
             </div>
            
            </Header>
            <div className='mobile_items'>
              <li className={activeMenuItem === 1 ? 'Active list':"listItems list" } onClick={()=>{setActiveMenuItem(1)}}>
                <Link to="/"> Offers</Link>
              </li>
              <li  onClick={()=>{setActiveMenuItem(2)}}>
                <Link to="/user">users</Link>
              </li>
              <li  onClick={()=>{setActiveMenuItem(3)}}>
                <Link to="/upload">upload</Link>
              </li>
              <li  onClick={()=>{setActiveMenuItem(4)}}>
                <Link to="/pending">Pending</Link>
              </li>
              <li  onClick={()=>{setActiveMenuItem(5)}}>
                <Link to="/complete">complete offers</Link>
              </li>
              <li  onClick={()=>{setActiveMenuItem(6)}}>
                <Link to="/transactions">transactions</Link>
              </li>
              <li  onClick={()=>{setActiveMenuItem(7)}}>
                <Link to="/customerservice">customer service</Link>
              </li>
              <li  onClick={()=>{setActiveMenuItem(8)}} >
                <Link onClick={handelLogOut} to="/"><LogoutOutlined /><span>Logout</span></Link>
              </li>
            </div>
            
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#ffffff', minHeight: 360 }}>
                <Context>
                
                <Routes>
                  <Route path="/" element={<Suspense fallback={<Loader/>}>
                    <BlogPosts />
                    </Suspense>
                    } />
                  <Route path="/user" element={
                    <Suspense  fallback={<Loader/>} >
    
                      <User />
                    </Suspense>
                    
                    } />
                  <Route path="/upload" element={
                    <Suspense fallback={<Loader/>}>
                      <Uploads />
                    </Suspense>
                   
                    
                    } />
                  <Route path="/pending" element={
                    <Suspense fallback={<Loader/>}>
    
                      <SoldOffer />
                    </Suspense>
                    
                    } />
                  <Route path="/create" element={
                    <Suspense fallback={<Loader/>}>
    
                      <PostForm />
                    </Suspense>
                    
                    } />
                  <Route path="/edit/:id" element={
                    <Suspense fallback={<Loader/>}>
    
                      <EditForm />
                    </Suspense>
                    
                    } />
                  <Route path="/transactions" element={
                    <Suspense fallback={<Loader/>}>
    
                      <Transition/>
                    </Suspense>
                    
                    } />
                  <Route path="/complete" element={
                    <Suspense fallback={<Loader/>}>
    
                      <Completed/>
                    </Suspense>
                    
                    } />
                  <Route path="/customerservice" element={
                    <Suspense fallback={<Loader/>}>
    
                      <SubmitInfoForm/>
                    </Suspense>
                    
                    } />
                  <Route path="/login" element={<Login />} />
                  {/* Add more routes as needed */}
                </Routes>
                </Context>
              </div>
            </Content>
          </Layout>
        </Layout>
        ):loading ?(<Loader/>)
        :(
          <Login />
        )
       }
   
  </Router>
  )
}
/* const RedirectOnRefresh = ()=>{
  const navigate = useNavigate();

  window.onbeforeunload = ()=>{
    window.alert("are you sure you wanna leave")
  }
} */
export default App
