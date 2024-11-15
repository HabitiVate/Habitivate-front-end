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

Modal.setAppElement("#root");

const HabitsDashboard = () => {
  const [habits, setHabits] = useState([]);
  const [todos, setTodos] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isHabitModalOpen, setHabitModalOpen] = useState(false);

  // get user account details
  const getUserAccount = async () => {
    try {
      const response = await apiGetProfile();
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // to get all habits
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

  const handleMoveToTop = () => console.log("Move to Top");
  const handleMoveToBottom = () => console.log("Move to Bottom");

  useEffect(() => {
    getAllHabits();
    getAllTodos();
    getUserAccount();
  }, []);

  return (
    <section className="md:h-[calc(100vh-20px)] m-2 md:m-[10px] rounded-xl shadow-2xl bg-[#fcf7ee] mt-auto">
      <div className="w-full h-full p-3">
        {/* Header */}
        <header className="text-white flex items-center w-full h-[20%] bg-[#95af00] px-3 py-2 rounded-sm">
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
                <p>{userData.firstName}</p>
                <p>{userData.lastName}</p>
              </div>
              <p>@{userData.userName}</p>
              <i className="fa-solid fa-heart text-red-500"></i>
              <i className="fa-solid fa-star text-orange-300"></i>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col gap-2 w-full">
            <h1 className="text-3xl font-extrabold">
              Hi! {userData.firstName}. Ready to Habitivate today?
            </h1>
            <p>Create or complete a task.</p>
            <div>QUOTES GOES HERE</div>
          </div>
        </header>

        {/* Search and Add Task Button */}
        <div className="flex justify-around items-center my-5">
          <div className="w-[30%]">
            <Search />
          </div>

          <div>
            <Button
              icon={<i className="mr-2 fa-solid fa-plus"></i>}
              text={`Add a Task`}
              options={[
                { label: "Add a Habit", value: "add-habit" },
                { label: "Add a Daily", value: "add-daily" },
                { label: "Add a Todo", value: "add-todo" },
              ]}
              onOptionSelect={(option) => {
                if (option.value === "add-habit") {
                  setHabitModalOpen(true);
                }
                if (option.value === "add-daily") {
                  console.log("Add a Daily selected");
                }
                if (option.value === "add-todo") {
                  console.log("Add a Todo selected");
                }
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-2">
          <div className="grid items-start grid-cols-3 gap-3 px-2 max-w-full max-h-full">
            {/* Habits */}
            <div className="flex justify-center flex-col gap-1 border-[4px] p-1 overflow-auto scrollbar-thin scrollbar-thumb-[#ebd451e1] scrollbar-track-gray-300">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">Habits</h1>
                <div className="flex gap-4 text-sm">
                  <p>All</p>
                  <p>Weak</p>
                  <p>Strong</p>
                </div>
              </div>
              {habits.map((habit) => (
                <HoverOverlay
                  key={habit.user}
                  habit={habit}
                  onDelete={handleDelete}
                  onMoveToTop={handleMoveToTop}
                  onMoveToBottom={handleMoveToBottom}
                  refreshHabits={getAllHabits}
                />
              ))}
            </div>

            {/* Dailies */}
            <div className="flex justify-center flex-col gap-1 border-[4px] p-1">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">Dailies</h1>
                <div className="flex gap-4 text-sm">
                  <p>All</p>
                  <p>Due</p>
                  <p>Not Due</p>
                </div>
              </div>
              <div className="tile flex justify-center h-20 rounded-lg overflow-hidden">
                <span className="p-4 bg-[#F2BE02] text-white">
                  <input type="checkbox" />
                </span>
                <p className="w-full px-2 py-1 bg-white">
                  Read 15 mins every day
                </p>
              </div>
            </div>

            {/* Todos */}
            <div className="flex justify-center flex-col gap-1 border-[4px] p-1 overflow-auto scrollbar-thin scrollbar-thumb-[#ebd451e1] scrollbar-track-gray-300">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">Todos</h1>
                <div className="flex gap-4 text-sm">
                  <p>Active</p>
                  <p>Scheduled</p>
                  <p>Completed</p>
                </div>
              </div>
              {todos.map((todo) => (
                <HoverOverlay
                  key={todo.user}
                  todo={todo}
                  onDelete={deleteTodo}
                  onMoveToTop={handleMoveToTop}
                  onMoveToBottom={handleMoveToBottom}
                  refreshHabits={getAllTodos}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Habit Modal */}
        <Modal
          isOpen={isHabitModalOpen}
          onRequestClose={() => setHabitModalOpen(false)}
          className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-xl font-bold">Create a Habit</h2>
          {/* Habit Creation Form */}
          <Button text="create"/>
        </Modal>
      </div>
    </section>
  );
};

export default HabitsDashboard;
