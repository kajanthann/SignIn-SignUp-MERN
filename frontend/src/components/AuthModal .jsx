// components/AuthModal.jsx
import React, { useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const AuthModal = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const endpoint = `${url}/api/user/${mode === "login" ? "login" : "register"}`;

    try {
      const res = await axios.post(endpoint, formData);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
      } else {
        setErrorMsg(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        {errorMsg && <div className="mb-4 text-red-600 text-sm">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 border rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-indigo-600 hover:underline cursor-pointer"
                onClick={() => setMode("register")}
              >
                Register here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-indigo-600 hover:underline cursor-pointer"
                onClick={() => setMode("login")}
              >
                Login here
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
