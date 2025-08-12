import axios from "axios";
import { useState } from "react";

export default function Signup(){

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
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Signup</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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

        <button type="submit" style={{ width: "100%" }}>Sign Up</button>
      </form>
    </div>
  );

}