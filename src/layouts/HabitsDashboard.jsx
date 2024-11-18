import { useEffect, useState } from "react";
import avatar from "../assets/Images/avatar.jpg";
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
import Logo from "../components/Logo";
import Footer from "../components/Footer";

Modal.setAppElement("#root");

const HabitsDashboard = () => {
  const [habits, setHabits] = useState([]);
  const [todos, setTodos] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isHabitModalOpen, setHabitModalOpen] = useState(false);
  const [isTodoModalOpen, setTodoModalOpen] = useState(false);

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

  // Fetch habits
  const getAllHabits = async () => {
    try {
      const response = await apiGetHabits();
      console.log(response.data);
      setHabits(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // to get all todos
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

  // Move actions (currently placeholders)
  const handleMoveToTop = () => console.log("Move to Top");
  const handleMoveToBottom = () => console.log("Move to Bottom");

  useEffect(() => {
    getAllHabits();
    getAllTodos();
    getUserAccount();
  }, []);

  return (
    <section className="h-screen md:h-[calc(100vh-20px)] m-2 md:m-[10px] rounded-xl shadow-2xl p-3 overflow-auto scrollbar-thin scrollbar-thumb-[#ebd451e1] scrollbar-track-gray-300 hover:shadow-xl bg-[#F9F9F9]">
      <>
        <nav>
          <div className="flex justify-between w-full">
            <div className="bg-[#2b2b2b] py-1 px-5 rounded-md">
              <Logo />
            </div>{" "}
            others logout
          </div>
        </nav>
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center w-full h-[20%] px-3 py-2 rounded-sm shadow-md">
          <div className="h-full profile p-1 flex gap-5">
            <div className="h-full">
              <img
                src={avatar}
                alt="avatar"
                className="max-w-full max-h-full rounded-full border-[4px] border-[white] shadow-lg"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <p>{`${userData.firstName || ""} ${
                  userData.lastName || ""
                }`}</p>
              </div>
              <p>@{userData.userName}</p>
              <i className="fa-solid fa-heart text-red-500"></i>
              <i className="fa-solid fa-star text-orange-300"></i>
            </div>
          </div>

          <div className="m-auto text-center mt-5 sm:mt-0 sm:text-left sm:w-[70%]">
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Hi! {userData.firstName}. Ready to Habitivate today?
            </h1>
            <p>Create or complete a task.</p>
            <div className="ml-auto w-[50%] text-end text-[11px] italic">
              <p>
                Small habits, when repeated consistently, lead to remarkable
                results
              </p>
              <p>~ James Clear</p>
            </div>
          </div>
        </header>

        {/* Search and Add Task Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center my-5 sm:my-3 gap-5 sm:gap-10">
          <div className="w-full sm:w-[30%]">
            <Search />
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
                if (option === "daily") {
                  console.log("Add a Daily selected");
                }
                if (option === "todo") setTodoModalOpen(true);
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-2 mt-2 overflow-auto h-full">
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
                  habit={habit}
                  onDelete={handleDelete}
                  onMoveToTop={handleMoveToTop}
                  onMoveToBottom={handleMoveToBottom}
                  refreshHabits={getAllHabits}
                />
              ))
            ) : (
              <p className="text-sm text-center">No habits found </p>
            )}
            <div className="mt-auto text-center text-gray-400 ">
              <div>
                <i className="fa-regular fa-square-plus"></i>
                <i className="fa-regular fa-square-minus"></i>
              </div>

              <p className="text-xs">These are your Habits</p>
              <p className="text-xs">Habits can checked as much you can do them</p>
            </div>
          </div>

          {/* Dailies */}
          <div className="flex flex-col gap-1 border-[4px] p-1">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl">Dailies</h1>
              <div className="flex gap-4 text-sm">
                <p>All</p>
                <p>Due</p>
                <p>Not Due</p>
              </div>
            </div>
            <div className="tile flex h-20 rounded-lg overflow-hidden">
              <span className="p-4 bg-[#F2BE02] text-white">
                <input type="checkbox" />
              </span>
              <p className="w-full px-2 py-1 bg-white">
                Read 15 mins every day
              </p>
            </div>
          </div>

          {/* Todos */}
          <div className="flex flex-col gap-1 border-[4px] p-1 overflow-auto scrollbar-thin scrollbar-thumb-[#ebd451e1] scrollbar-track-gray-300 h-full">
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
                <HoverOverlay
                  key={todo.user}
                  todo={todo}
                  onDelete={deleteTodo}
                  onMoveToTop={handleMoveToTop}
                  onMoveToBottom={handleMoveToBottom}
                  refreshHabits={getAllTodos}
                />
              ))
            ) : (
              <p className="text-sm text-center">No todo found add a todo</p>
            )}
          </div>
        </div>

        <hr className="my-10 mx-10" />

        <Footer />

        {/* Modals */}
        <Modal
          isOpen={isHabitModalOpen}
          onRequestClose={() => setHabitModalOpen(false)}
          className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <HabitsPost />
        </Modal>

        <Modal
          isOpen={isTodoModalOpen}
          onRequestClose={() => setTodoModalOpen(false)}
          className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <TodoPost />
        </Modal>
      </>
    </section>
  );
};

export default HabitsDashboard;

