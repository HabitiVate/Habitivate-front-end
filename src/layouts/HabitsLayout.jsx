import avatar from "../assets/Images/avatar.jpg";
import Button from "../components/Button";

const HabitsDashboard = () => {
  return (
    <section className="h-screen md:h-[calc(100vh-20px)] m-2 md:m-[10px] rounded-xl shadow-2xl bg-[#fcf7ee] mt-auto">
      <div className="w-full h-full p-3">
        <section className="flex justify-between items-center w-full h-[20%]">
          {/* this the where I create the profile and progress bars */}
          <div className="h-full profile p-1 flex gap-5">
            <div className="h-full">
              <img
                src={avatar}
                alt="avatar"
                className="max-w-full max-h-full rounded-full border-[4px] border-[#95af00] shadow-lg"
              />
            </div>

            <div className="flex flex-col gap-3">
              <p>@laraCroft</p>
              <i className="fa-solid fa-heart text-red-500"></i>
              <i className="fa-solid fa-star text-orange-300"></i>
            </div>
          </div>

          <div>
            <Button text="Add a Task" />
          </div>
        </section>

        {/* this is the main container for the habits, Dailes and Todos */}
        <div className="h-auto mt-2">
          <div className="grid grid-cols-3 gap-3 px-2">
            {/* this is where I work on the main container for the habits */}
            <div className="flex justify-center flex-col gap-1 border-[4px] p-1">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">Habits</h1>
                <div className="flex gap-4 text-sm">
                  <p>All</p>
                  <p>Weak</p>
                  <p>Strong</p>
                </div>
              </div>

              {/* this where I create a dummy tile for the habits */}
              <div className="tile flex justify-center h-20 rounded-lg overflow-hidden">
                <span className="p-4 bg-[#F2BE02] text-white">
                  <i className="fa-solid fa-plus"></i>
                </span>
                <p className="w-full px-2 py-1 bg-white">
                  Read 15mins everyday
                </p>
                <span className="p-4 bg-[#f2be02] text-white">
                  <i className="fa-solid fa-minus"></i>
                </span>
              </div>


            </div>

            <div>
              <h1>Dailies</h1>
            </div>

            <div>
              <h1>Todos</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HabitsDashboard;
