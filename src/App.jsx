

import './App.css'
import Home from './Pages/Home/Home'
import SignIn from './Pages/Sign in/SignIn'
import SignUp from './Pages/Sign Up/SignUp'
import Categories from './Pages/Categories/Categories'
import Products from './Pages/Products/Products'
import Cart from './Pages/Cart/Cart'





import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './routes/Root'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    
    children:[
      {path:'/home',element:<Home/>
    },
    {path:'/',element:<Home/>
  },
    {path:'/signin',element:<SignIn/>},
    {path:'/signup',element:<SignUp/>},
    {path:'/categories',element:<Categories/>},
    {path:'/products',element:<Products/>},
    {path:'/cart',element:<Cart/>},
 

   
   
  
    ],

  },
 
  
]);
function App() {
  

  return (
  <>
  
  <RouterProvider router={router}/>
 
 
  </>


  )
}

export default App
