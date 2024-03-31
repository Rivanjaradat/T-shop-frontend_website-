
import MyFooter from '../Components/Footer/MyFooter'
import Navbar from '../Components/Navbar/navbar'

import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <>
   <div className="container">
   <Navbar/>
    <Outlet/>
    
  
 
   </div>
 <MyFooter/>
 
    </>  )
}
