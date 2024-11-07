import React, { useState } from "react";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log("Form submitted", formData);
  };

  return (
    <div className="log-in-bg h-screen md:h-[calc(100vh-20px)] m-2 md:m-[10px] rounded-xl shadow-2xl ">
      <div className="w-full h-full flex items-center justify-center bg-[#353535da] rounded-xl">
        <div className="w-full max-w-md p-8 bg-transparent border-[4px] rounded shadow-md">
          <div className="mb-10">
            <Logo />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="usernameOrEmail"
                className="block text-sm font-medium text-[#cecdcd]"
              >
                Username or Email
              </label>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
                placeholder="Username or Email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#cecdcd]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-[#95af00] rounded hover:bg-[#adc03efb] "
            >
              Log In
            </button>
          </form>
          <div className="mt-4 text-center">
            <a
              href="/forgot-password"
              className="text-sm text-white hover:underline hover:text-[#d8ee5dfb]"
            >
              Forgot your password?
            </a>
          </div>
          <div className="mt-2 text-center">
            <span className="text-sm text-[#cecece] mr-2">
              Don't have a habitivate account?
            </span>


            <Link to={"/signup"}>
            <span
              href="/register"
              className="text-sm text-[#95af00] hover:underline hover:text-[#d8ee5dfb]"
            >
              Sign Up
            </span></Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
