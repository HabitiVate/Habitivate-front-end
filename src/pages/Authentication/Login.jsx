import React, { useState } from "react";
import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { apiSignin } from "../../services/auth";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      setLoading(true);

      const email = formData.get("email");
      const password = formData.get("password");

      const response = await apiSignin({ email, password });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        toast.success("You are Logged In");
        navigate("/habits-dashboard");
      } else {
        throw new Error("Login failed"); // Handle unexpected response codes
      }
    } catch (error) {
      if (error.response) {
        // Handle specific error cases based on status code
        if (error.response.status === 401) {
          toast.error("Incorrect email or password");
        } else if (error.response.status === 404) {
          toast.error("Account does not exist. Please sign up first.");
        } else {
          toast.error("Failed to Log in. Please try again.");
        }
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-in-bg h-screen md:h-[calc(100vh-20px)] m-2 md:m-[10px] rounded-xl shadow-2xl">
      <div className="w-full h-full flex items-center justify-center bg-[#353535da] rounded-xl">
        <div className="w-full max-w-md p-8 bg-transparent border-[4px] rounded shadow-md">
          <div className="mb-10">
            <Logo />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#cecdcd]"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
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
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-[#95af00] rounded hover:bg-[#adc03efb]"
              disabled={loading}
            >
              {loading ? "Loading..." : "Log In"}
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
              Don't have a Habitivate account?
            </span>
            <Link to={"/signup"}>
              <span className="text-sm text-[#95af00] hover:underline hover:text-[#d8ee5dfb]">
                Sign Up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
