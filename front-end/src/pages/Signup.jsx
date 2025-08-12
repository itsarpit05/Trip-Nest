import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Signup(){

  const navigate = useNavigate();
   const [name,setName]= useState("")
   const [email,setEmail]= useState("")
   const [password,setPassword]= useState("")
   const [role,setRole]= useState("guest")
   const [message,setMessage]= useState("")
   const [error,setError]= useState("")
   


   const handleSubmit = async(e)=>{   // When the user submits the form
         e.preventDefault()
         setMessage("");    // clears if by chance any previous error or message is there
         setError("");
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup',{name,email,password,role},{withCredentials:true})
            setMessage(res.data.msg);  // set message "User registered successfully" as coming from backend
            navigate('/login') // after successful signup redirects to login
            setName("");
            setEmail("");
            setPassword("");       // after successful signup this resets the form for the user
            setRole("guest");
        } catch (err) {
            setError(err.response?.data?.msg || err.response?.data?.error || "Something went wrong");
        }
   };


   // Form rendering here
   return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
         className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
         style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className=" w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="guest">Guest</option>
          <option value="host">Host</option>
        </select>

        <button type="submit"
        className="w-full px-4 py-2 font-bold text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50" >Sign Up</button>
      </form>
    </div>
    </div>
  );

}