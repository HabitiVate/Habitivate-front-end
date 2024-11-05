import { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [state, setState] = useState(true);

  return (
    <>
      <section className="landing-page h-screen md:h-[calc(100vh-20px)] m-2 md:m-[10px] flex items-center justify-center rounded-xl shadow-2xl">
        <div className="overlay flex justify-center items-center w-full h-full md:h-full rounded-xl bg-[#353535c2]">
          <div className="w-full flex justify-center items-center gap-5 h-full flex-col px-4 md:px-0">
            <h1 className="title text-5xl md:text-9xl font-extrabold text-white text-center">
              <span className="text-[85px] md:text-[155px] text-[#95af00]">
                H
              </span>
              abiti
              <span className="text-[85px] md:text-[155px] text-[#95af00]">
                V
              </span>
              ate
            </h1>
            <div className="text-center text-sm md:text-base lg:text-lg text-white space-y-1">
              <p>Revolutionizing Habit Formation and Task Management</p>
              <p>Transform your life, one habit at a time</p>
            </div>
            <Link to={"/login"}>
              <button
                className={`px-6 py-3 bg-[#95af00] text-white font-semibold rounded-lg duration-300 ${
                  state ? "animate-pulse" : ""
                }`}
                onMouseEnter={() => setState(false)}
                onMouseLeave={() => setState(true)}
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
