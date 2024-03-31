
import { useState } from 'react';
import axios from 'axios';
import'./forgotPassword.css';
export default function Forgot() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [codeSent, setCodeSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newData, setNewData] = useState({ code: "", newPassword: "", email: "" });

    async function handleSubmitCode(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.patch('/auth/sendcode', { email });
            setCodeSent(true);
        } catch (error) {
            setError(error.response.data.message);
        }
        setLoading(false);
    }

    const handelChange = (e) => {
        setNewData({ ...newData, [e.target.name]: e.target.value })
    }

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
       
        try {
            console.log(newData);
            setLoading(true);
            const response = await axios.patch('/auth/forgotPassword', {
            ...newData
            });
            setNewData({ code: "", newPassword: "", email: "" });
            alert(`Your Password has been changed successfully!`);
            console.log(response.data.message);
          
        } catch (error) {
            //setError(error.response.data.message);
            console.log(error);

        } finally {
            setLoading(false);
        }
    }
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className='cardPassword'>
            <h2>Reset Password</h2>
            {codeSent ? (
                <form onSubmit={handleSubmitPassword}>
                    <input
                        type='text'
                        placeholder="Enter the code"
                        className='input__email'
                        name="code"
                        value={newData.code}
                        onChange={handelChange}
                    />
                    <input
                        type='password'
                        placeholder="Enter the new password"
                        className='input__email'
                        name="newPassword"
                        value={newData.newPassword}
                        onChange={handelChange}
                    />
                     <input
                        type='text'
                        placeholder="Enter the email"
                        className='input__email'
                        name="email"
                        value={newData.email}
                        onChange={handelChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <>
                    <p>Please enter the email address that you used to register, and we will send you a link to reset your password via Email.</p>
                    <form onSubmit={handleSubmitCode}>
                        <input
                            className='input__email'
                            type="email"
                            placeholder=" Enter your Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <button type="submit">Reset my password!</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <p className="message">Not registered? <a href="/signup">Create an account</a></p>
                </>
            )}
        </div>
    )
}
