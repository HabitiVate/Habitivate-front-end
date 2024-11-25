import { useEffect, useState } from "react";
import Button from "../components/Button";
import Search from "../components/Search";
import { apiGetHabits, apiDeleteHabits } from "../services/habits";
import HoverOverlay from "../components/HabitTile";
import { toast } from "react-toastify";
import { apiDeleteTodo, apiGetTodos } from "../services/todos";
import { apiGetProfile } from "../services/profile";
import Modal from "react-modal";
import HabitsPost from "../pages/HabitsManagement/HabitsPost";
import TodoPost from "../pages/TodosManagement/TodoPost";
import Footer from "../components/Footer";
import { logout } from "../services/config";
import { useNavigate } from "react-router-dom";
import TodoTile from "../components/TodoTile";
import { apiDeleteDaily, apiGetDailies } from "../services/dailies";
import DailyTile from "../components/DailyTile";
import DailyPost from "../pages/DailiesManagement/DailyPost";
import placeHolderImg from "../assets/Images/placeholder-img.png"
import Profile from "../pages/Authentication/profile/Profile";
// import Loader from "../components/Loader";

Modal.setAppElement("#root");

const HabitsDashboard = () => {
  // const [loading, setLoading] = useState(false);
  const [habits, setHabits] = useState([]);
  const [todos, setTodos] = useState([]);
  const [dailies, setDailies] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isHabitModalOpen, setHabitModalOpen] = useState(false);
  const [isTodoModalOpen, setTodoModalOpen] = useState(false);
  const [isDailyModalOpen, setDailyModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState(placeHolderImg)
  const [searchResults, setSearchResults] = useState([]);



  const navigate = useNavigate();

  // Fetch user profile
  const getUserAccount = async () => {
    try {
      const response = await apiGetProfile();
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Update imgSrc whenever userData.avatar changes
  useEffect(() => {
    if (userData.avatar) {
      setImgSrc(`https://savefiles.org/${userData.avatar}?shareable_link=471`);
    }
  }, [userData]);



  // Fetch habits
  const getAllHabits = async () => {
    try {
      // setLoading(true);
      const response = await apiGetHabits();
      console.log(response.data);
      setHabits(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // fetch dailies
  const getAllDailies = async () => {
    try {
      const response = await apiGetDailies();
      console.log(response.data);
      setDailies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch todos
  const getAllTodos = async () => {
    try {
      const response = await apiGetTodos();
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // to delete a habit
  const handleDelete = async (habitId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this habit?"
      );
      if (!confirmed) return;
      const response = await apiDeleteHabits(habitId);
      console.log("deleted", response.data);
      toast.success("Habit deleted successfully");
      getAllHabits();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete habit");
    }
  };

  // to delete a todo
  const deleteTodo = async (todoId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this todo?"
      );
      if (!confirmed) return;
      const response = await apiDeleteTodo(todoId);
      console.log("deleted", response.data);
      toast.success("Todo deleted successfully");
      getAllTodos();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete todo");
    }
  };

  // to delete a daily
  const deleteDaily = async (dailyId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this todo?"
      );
      if (!confirmed) return;
      const response = await apiDeleteDaily(dailyId);
      console.log("deleted", response.data);
      toast.success("Daily deleted successfully");
      getAllDailies();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete Daily");
    }
  };

  // Move actions (currently placeholders)
  const handleMoveToTop = () => console.log("Move to Top");
  const handleMoveToBottom = () => console.log("Move to Bottom");

  useEffect(() => {
    getAllHabits();
    getAllTodos();
    getAllDailies();
    getUserAccount();
  }, []);

  useEffect(() => {
    // Separate the results into habits, dailies, and todos
    const filteredHabits = searchResults.filter((item) => item.type === "habit");
    const filteredDailies = searchResults.filter((item) => item.type === "daily");
    const filteredTodos = searchResults.filter((item) => item.type === "todo");

    setHabits(filteredHabits);
    setDailies(filteredDailies);
    setTodos(filteredTodos);
  }, [searchResults]);




  const handleLogout = () => {
    logout; // Call the logout function
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    navigate("/login"); // Redirect to the login page
  };

  return (
    <section className="h-screen md:h-[calc(100vh-20px)] m-2 md:m-[10px] rounded-xl shadow-2xl p-3 overflow-auto scrollbar-thin scrollbar-thumb-[#ebd451e1] scrollbar-track-gray-300 hover:shadow-xl bg-[#F9F9F9]">
      <>
        <>
          <nav className="flex justify-between w-full items-center p-2">
            <div className="py-1 px-5 rounded-md bg-[#AEC141] text-white font-bold">
              Habitivate
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold px-4 border-[#AEC141] border-[2px] rounded">
              Hi! {userData.firstName}. Ready to Habitivate today?
            </h1>

            <div className="flex gap-5 items-center">
             
                <button onClick={() => setIsProfileModalOpen(true) }>
                  <i className="fa-solid fa-user text-2xl"></i>
                </button>
  

              <Button
                text={"logout"}
                icon={<i className="fa-solid fa-right-from-bracket mr-2"></i>}
                onClick={handleLogout}
              />
            </div>

            {/* <button className=" bg-slate-400" onClick={handleLogout}>
              
            </button> */}
          </nav>
        </>
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center w-full h-[25%] px-3 py-2 rounded-sm shadow-md border-[4px]">
          <div className="h-full w-[30%] profile p-1 flex gap-5">
            <div className="h-full">
              <img
                src={imgSrc}
                alt="avatar"
                onError={() => setImgSrc(placeHolderImg)}
                className="max-w-full max-h-full rounded border-[4px] border-[white] shadow-lg"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2">
                <p>{`${userData.firstName || ""} ${
                  userData.lastName || ""
                }`}</p>
              </div>
              <p>@{userData.userName}</p>
              
              <div className="flex gap-2 items-center"><i className="fa-solid fa-heart text-red-500"></i><div className="w-full rounded bg-red-600 h-[4px]"></div>50/50</div>
              <div className="flex gap-2 items-center"><i className="fa-solid fa-star text-orange-300"></i><div className="w-full rounded bg-orange-400 h-[4px]"></div>100%</div>
              
            </div>
          </div>

          <div className=" flex justify-center items-center mx-auto text-center mt-5 sm:mt-0 sm:text-left sm:w-[70%]">
            
            {/* <p>Create or complete a task.</p> */}
            <div className=" w-[50%] text-start text-lg italic">
              <p>
                Small habits, when repeated consistently, lead to remarkable
                results
              </p>
              <p className="text-end">~ James Clear</p>
            </div>
          </div>
        </header>

        {/* Search and Add Task Button */}
        <div className="flex flex-col sm:flex-row justify-around items-center my-5 sm:my-3 gap-5 sm:gap-10">
          <div className="w-full sm:w-[30%]">
            <Search onSearch={setSearchResults} />
          </div>

          <div className="w-full sm:w-[auto]">
            <Button
              icon={<i className="mr-2 fa-solid fa-plus"></i>}
              text={`Add a Task`}
              options={[
                { label: "Add a Habit", value: "habit" },
                { label: "Add a Daily", value: "daily" },
                { label: "Add a Todo", value: "todo" },
              ]}
              onOptionSelect={(option) => {
                if (option === "habit") setHabitModalOpen(true);
                if (option === "daily") setDailyModalOpen(true);
                if (option === "todo") setTodoModalOpen(true);
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3  mt-2 overflow-auto h-full">
          {/* Habits */}
          <div className="flex flex-col gap-1 border-[4px] bg-[#EDECEE] p-1 overflow-auto scrollbar-thin scrollbar-thumb-[#ebd451e1] scrollbar-track-gray-300 hover:shadow-xl">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl">Habits</h1>
              <div className="flex gap-4 text-sm">
                <p>All</p>
                <p>Weak</p>
                <p>Strong</p>
              </div>
            </div>
            {habits.length ? (
              habits.map((habit) => (
                <HoverOverlay
                  key={habit.user}
                  action={habit}
                  onDelete={handleDelete}
                  onMoveToTop={handleMoveToTop}
                  onMoveToBottom={handleMoveToBottom}
                  onRefresh={getAllHabits}
                />
              ))
            ) : (
              <p className="text-sm text-center">
                No habits found add a Habit{" "}
              </p>
            )}
            <div className="mt-auto text-center text-gray-400 ">
              <div>
                <i className="fa-regular fa-square-plus"></i>
                <i className="fa-regular fa-square-minus"></i>
              </div>

              <p className="text-xs">These are your Habits</p>
              <p className="text-xs">
                Habits can checked as much you can do them
              </p>
            </div>
          </div>

          {/* Dailies */}
          <div className="flex flex-col gap-1 border-[4px] bg-[#EDECEE] p-1 overflow-auto scrollbar-thin scrollbar-thumb-[#ebd451e1] scrollbar-track-gray-300 h-full">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl">Dailies</h1>
              <div className="flex gap-4 text-sm">
                <p>All</p>
                <p>Due</p>
                <p>Not Due</p>
              </div>
            </div>
            {dailies.length > 0 ? (
              dailies.map((daily) => (
                <DailyTile
                  key={daily.user}
                  action={daily}
                  onDelete={deleteDaily}
                  onMoveToTop={handleMoveToTop}
                  onMoveToBottom={handleMoveToBottom}
                  onRefresh={getAllDailies}
                />
              ))
            ) : (
              <p className="text-sm text-center">No daily found add a daily</p>
            )}

            <div className="mt-auto text-center text-gray-400 ">
              <div>
                <i className="fa-regular fa-calendar-check"></i>
              </div>

              <p className="text-xs">These are your Dailies</p>
              <p className="text-xs">
                Dailies can be checked as much you can complete them
              </p>
            </div>
          </div>

          {/* Todos */}
          <div className="flex flex-col gap-1 border-[4px] bg-[#EDECEE] p-1 overflow-auto scrollbar-thin scrollbar-thumb-[#ebd451e1] scrollbar-track-gray-300 h-full">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl">Todos</h1>
              <div className="flex gap-4 text-sm">
                <p>Active</p>
                <p>Scheduled</p>
                <p>Completed</p>
              </div>
            </div>
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoTile
                  key={todo.user}
                  action={todo}
                  onDelete={deleteTodo}
                  onMoveToTop={handleMoveToTop}
                  onMoveToBottom={handleMoveToBottom}
                  onRefresh={getAllTodos}
                />
              ))
            ) : (
              <p className="text-sm text-center">No todo found add a todo</p>
            )}

            <div className="mt-auto text-center text-gray-400 ">
              <div>
                <i className="fa-regular fa-square-check"></i>
              </div>

              <p className="text-xs">These are your Todos</p>
              <p className="text-xs">
                todos can be checked as much you can complete them
              </p>
            </div>
          </div>
        </div>

        <hr className="my-10 mx-10" />

        <Footer />

        {/* Modals */}
        <Modal
          isOpen={isHabitModalOpen}
          onRequestClose={() => setHabitModalOpen(false)}
          className=" p-6 rounded shadow-lg max-w-lg mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl px-4 sm:px-6 overflow-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <HabitsPost
            onClose={() => {
              getAllHabits();
              setHabitModalOpen(false);
            }}
          />
        </Modal>

        <Modal
          isOpen={isTodoModalOpen}
          onRequestClose={() => setTodoModalOpen(false)}
          className=" p-6 rounded shadow-lg max-w-lg mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl px-4 sm:px-6  "
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <TodoPost
            onClose={() => {
              getAllTodos();
              setTodoModalOpen(false);
            }}
          />
        </Modal>

        <Modal
          isOpen={isDailyModalOpen}
          onRequestClose={() => setDailyModalOpen(false)}
          className=" p-6 rounded shadow-lg max-w-lg mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl px-4 sm:px-6  "
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <DailyPost
            onClose={() => {
              getAllDailies();
              setDailyModalOpen(false);
            }}
          />
        </Modal>


        <Modal
          isOpen={isProfileModalOpen}
          onRequestClose={() => setIsProfileModalOpen(false)}
          className="p-6 rounded shadow-lg max-w-lg mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl px-4 sm:px-6  "
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <Profile
            onClose={() => {
              setIsProfileModalOpen(false);
            }}
          />
        </Modal>
      </>
    </section>
  );
};

export default HabitsDashboard;
