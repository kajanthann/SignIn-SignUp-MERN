import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { url, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post(`${url}/api/user/login`, formData);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setSuccessMsg("Login successful!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setErrorMsg(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {errorMsg && <div className="mb-4 text-red-600">{errorMsg}</div>}
        {successMsg && <div className="mb-4 text-green-600">{successMsg}</div>}
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-3 mb-4 border rounded-md"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 mb-4 border rounded-md"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600" type="submit">
            Login
          </button>
          <div className="flex justify-evenly mt-5">
            <p>Don't have an account?</p>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
