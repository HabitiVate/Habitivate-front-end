import { useEffect, useState } from "react";
import avatar from "../assets/Images/avatar.jpg";
import Button from "../components/Button";
import Search from "../components/Search";
import { apiGetHabits } from "../services/habits";
import HoverOverlay from "../components/HabitTile";
import { apiDeleteHabits } from "../services/habits";
import { toast } from "react-toastify";

const HabitsDashboard = () => {
  const [habits, setHabits] = useState([]);

  // Actions for each overlay button

  const getAllHabits = async () => {
    try {
      const response = await apiGetHabits();
      console.log(response.data);
      setHabits(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => console.log("Edit:");
  const handleDelete = async (habitId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this habit?");
      if (!confirmed) return;
      const response = await apiDeleteHabits(habitId);
      console.log("deleted", response.data);
      toast.success("Habit deleted successfully");
      getAllHabits();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("failed to delete")
    }
  };
  const handleMoveToTop = () => console.log("Move to Top:");
  const handleMoveToBottom = () => console.log("Move to Bottom:");

  useEffect(() => {
    getAllHabits();
  }, []);

  return (
    <section className="h-screen md:h-[calc(100vh-20px)] m-2 md:m-[10px] rounded-xl shadow-2xl bg-[#fcf7ee] mt-auto overflow-hidden">
      <div className="w-full h-full p-3">
        {/* this is the code for the header */}
        <header className="text-white flex items-center w-full h-[20%] bg-[#95af00] px-3 py-2 rounded-sm">
          {/* this the where I create the profile and progress bars */}
          <div className="h-full profile p-1 flex gap-5">
            <div className="h-full">
              <img
                src={avatar}
                alt="avatar"
                className="max-w-full max-h-full rounded-full border-[4px] border-[white] shadow-lg"
              />
            </div>

            <div className="flex flex-col gap-3">
              <p>@laraCroft</p>
              <i className="fa-solid fa-heart text-red-500"></i>
              <i className="fa-solid fa-star text-orange-300"></i>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col gap-2 w-full">
            <h1 className="text-3xl font-extrabold">
              Hi! Lara. Ready to Habitivate today?
            </h1>
            <p>create or complete a task.</p>
            <div>QUOTES GOES HERE</div>
          </div>
        </header>

        {/* this is where the search and add a task button is worked on */}
        <div className="flex justify-around items-center my-5">
          <div className=" w-[30%]">
            <Search />
          </div>

          <div>
            <Button
              icon={<i className="mr-2 fa-solid fa-plus"></i>}
              text={`Add a Task`}
            />
          </div>
        </div>

        {/* this is the main container for the habits, Dailes and Todos */}
        <div className="h-screen mt-2 overflow-auto">
          <div className="grid items-start grid-cols-3 gap-3 px-2 h-full ">
            {/* this is where I work on the main container for the habits */}
            <div className="flex justify-center flex-col gap-1 border-[4px] p-1 overflow-auto ">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">Habits</h1>
                <div className="flex gap-4 text-sm">
                  <p>All</p>
                  <p>Weak</p>
                  <p>Strong</p>
                </div>
              </div>

              {/* this where I create a dummy tile for the habits */}
              {/* Habit Tiles */}
              {habits.map((habit) => (
                <HoverOverlay
                  key={habit.user}
                  habit={habit}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onMoveToTop={handleMoveToTop}
                  onMoveToBottom={handleMoveToBottom}
                />
              ))}
            </div>

            <div className="flex justify-center flex-col gap-1 border-[4px] p-1">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">Dailies</h1>
                <div className="flex gap-4 text-sm">
                  <p>All</p>
                  <p>Due</p>
                  <p>Not Due</p>
                </div>
              </div>

              {/* this where I create a dummy tile for the habits */}
              <div className="tile flex justify-center h-20 rounded-lg overflow-hidden">
                <span className="p-4 bg-[#F2BE02] text-white">
                  <input type="checkbox" />
                </span>
                <p className="w-full px-2 py-1 bg-white">
                  Read 15mins everyday
                </p>
              </div>
            </div>

            <div className="flex justify-center flex-col gap-1 border-[4px] p-1">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">To Do's</h1>
                <div className="flex gap-4 text-sm">
                  <p>Active</p>
                  <p>Scheduled</p>
                  <p>Complete</p>
                </div>
              </div>

              {/* this where I create a dummy tile for the habits */}
              <div className="tile flex justify-center h-20 rounded-lg overflow-hidden">
                <span className="p-4 bg-[#F2BE02] text-white">
                  <input type="checkbox" />
                </span>
                <p className="w-full px-2 py-1 bg-white">
                  Read 15mins everyday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HabitsDashboard;
