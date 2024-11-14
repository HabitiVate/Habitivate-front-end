import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { apiSignup } from "../../services/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../../components/Loader";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      setLoading(true);

      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const userName = formData.get("userName");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      const payload = {
        firstName,
        lastName,
        userName,
        email,
        password,
        confirmPassword,
      };

      const response = await apiSignup(payload);
      console.log(response.data);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error(
            "An account with this email already exists. Please log in instead"
          );
        } else {
          toast.error("Failed to register. Please try again.");
        }
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up h-screen md:h-[calc(100vh-20px)] m-2 md:m-[10px] rounded-xl shadow-2xl flex items-center justify-center bg-gray-100 ">
      <div className="w-full h-full flex items-center justify-center bg-[#353535da] rounded-xl">
        <div className="w-full max-w-lg p-6 rounded-xl shadow-lg border-[4px]">
          <div className="mb-4 text-center">
            <Logo />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <div className="mb-4 w-full">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-[#cecdcd]"
                >
                  Firstname
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
                  placeholder="Firstname"
                />
              </div>

              <div className="mb-4 w-full">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-[#cecdcd]"
                >
                  Lastname
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
                  placeholder="Lastname"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-[#cecdcd]"
              >
                Username
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
                placeholder="Username"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#cecdcd]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
                placeholder="Email"
              />
            </div>
            <div className="mb-4">
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
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#cecdcd]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-[#95af00]"
                placeholder="Confirm Password"
              />
            </div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 font-semibold text-white bg-[#95af00] rounded hover:bg-[#adc03efb]"
              disabled={loading}
            >
              {loading ? <Loader size="30" /> : "Sign Up"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-[#cecece] mr-2">
              Already have a Habitivate account?
            </span>
            <Link to={"/login"}>
              <span className="text-sm text-[#95af00] hover:underline hover:text-[#d8ee5dfb]">
                Log In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
