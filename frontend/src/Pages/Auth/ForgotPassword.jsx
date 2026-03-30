import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submitHandler = async () => {
   await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/forgot-password`, {
      email,
    });
    alert("If email exists, reset link sent.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-2xl text-gray-500 font-bold mb-4">
        Enter your email to receive a password reset link
        </h1>  <input className="w-[500px] rounded-2xl px-3 py-2"
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="mt-4 bg-blue-700 px-3 py-3 cursor-pointer rounded-2xl" onClick={submitHandler}>Send Reset Link</button>
    </div>
  );
}