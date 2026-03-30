import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/reset-password/${token}`,
      { password }
    );

    alert("Password reset successful");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
   <h1 className="text-2xl text-gray-500 font-bold mb-4">
        Enter your new password
        </h1>   <input className="w-[500px] rounded-2xl px-3 py-2"
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="mt-4 bg-blue-700 px-3 py-3 cursor-pointer rounded-2xl" onClick={submitHandler}>Reset Password</button>
    </div>
  );
}