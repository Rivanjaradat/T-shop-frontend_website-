
import { useState } from "react";
import { object, string } from 'yup';
import { useNavigate } from "react-router-dom";

import { Bounce, toast } from "react-toastify";
import axios from 'axios';
import './SignUp.css'

export default function SignUp() {
  const [user, setUser] = useState({
    userName:'',
    email:'',
    password:'',
 
    image:'',
  });
  const [loader, setLoader] = useState(false);
  const [error,setError]=useState([]);
  const navigate=useNavigate();
const handelChange=(e)=>{
  const {name,value}=e.target;
  setUser({
    ...user,
    [name]:value
  
  });
};
const handelimageChange= (e)=>{
  const {name,files}=e.target;
  setUser({
    ...user,
    [name]:files[0]

  });
};
const validateData= async(e)=>{
const  registerSchema=object().shape({
  userName:string().min(5).max(20).required(),
  email:string().email().required(),
  password: string().min(8).max(20).required(),
  
  image: string().required(),

 });
 try{
  await registerSchema.validate(user, { abortEarly: false });
  return true;
 }
  catch(error){
    console.log("validation error",error.errors);

    setError(error.errors);
    setLoader(false);
    return false;
  }


}
const handleSubmit= async(e)=>{
  e.preventDefault();
  setLoader(true);
 const validdata=await validateData();
 console.log(validdata);
  
  const formData=new FormData();
  formData.append('userName',user.userName);
  formData.append('email',user.email);
  formData.append('password',user.password);
  formData.append('image',user.image);
  try {
    const { data } = await axios.post(
      "https://ecommerce-node4.vercel.app/auth/signup",
      formData
    );
    setUser({
      userName: "",
      email: "",
      password: "",
      image: "",
    });
 if (data.message == "success") {
  toast.success("registerd succsesfully");
  navigate('/signin');
}
 
} catch (error) {
  console.log(error.response);
  if (error.response.status === 409) {
    toast.error(error.response.data.message, {
      position: "bottom-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
} finally {
  setLoader(false);
}
};
  return (
   <>
 {error.length>0 ? error.map(error=> <p>{error}</p>): ''}
   <form className='signup container' onSubmit={handleSubmit}>
   <h2>Register Now!</h2>
    <div className="form_element">
    <label>User Name:</label>
    <input type="text"  value={user.userName} name="userName" onChange={handelChange}  />
    </div>
   <div className="form_element">
   <label>Email:</label>
    <input type="email" value={user.email} name="email" onChange={handelChange}   />
   </div>
   <div className="form_element">
   <label>Password:</label>
    <input type="password"   value={user.password} name="password" onChange={handelChange} />
   </div>

   <div className="form_element">
   <label> Image</label>
    <input type="file"   name="image" onChange={handelimageChange}/> 
   </div>
   
    
    
   <button  type="submit" 
        disabled={loader? 'disabled':null} >
          {!loader ? "register" : "Wait..."}
        </button>
   </form>
   </>
  )
}
