import { useState } from "react";
import { object, string } from "yup";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signin.css'

export default function SignIn() {
  const [user, setUser] = useState({
   
    email: "",
    password: "",
   
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState([]);
  const navigate=useNavigate();
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const validateData = async (e) => {
    const loginSchema = object().shape({
   
      email: string().email().required(),
      password: string().min(8).max(20).required(),
     
    });
    try {
      await loginSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log("validation error", error.errors);
      setError(error.errors);
      setLoader(false);
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validdata = await validateData();
    console.log(validdata);

    
    
    try {
      const { data } = await axios.post(
        "https://ecommerce-node4.vercel.app/auth/signin",{
         
          email: user.email,
          password: user.password,
          
        }
      );
      setUser({
     
        email: "",
        password: "",
       
      });
      console.log(data);
     if (data.message == "success") {
        toast.success("registerd succsesfully");
        navigate('/');
      }
   
    } catch (error) {
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
      
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
    <div  className="container signin">
    <h2>Login</h2>
      {error.length > 0 ? error.map((error) => <p>{error}</p>) : ""}
      <form onSubmit={handleSubmit}>
       <div className="form-item">
       <label>email</label>
        <input
          className="form-control"
          type="email"
          value={user.email}
          name="email"
          onChange={handelChange}
        />
       </div>
        <div className="form-item"> <label>password</label>
        <input
          className="form-control"
          type="password"
          value={user.password}
          name="password"
          onChange={handelChange}
        />
       </div>
        
        <button className="btn-signin " type="submit" 
        disabled={loader? 'disabled':null} >
          {!loader ? "login" : "Wait..."}
        </button>
      </form>
    </div>
     
    </>
  );
}
