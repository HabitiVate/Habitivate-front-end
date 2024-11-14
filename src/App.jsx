import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Login from "./pages/Authentication/Login";
import SignUp from "./pages/Authentication/Signup";
import HabitsDashboard from "./layouts/HabitsDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Authentication/profile/Profile";
import HabitsPost from "./pages/HabitsManagement/HabitsPost";
import EditProfile from "./pages/Authentication/profile/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/profile-page",
    element: <Profile />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/create-habits",
    element: <HabitsPost />,
  },

  {
    path: "/habits-dashboard",
    element: <HabitsDashboard />,
    children: [],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
