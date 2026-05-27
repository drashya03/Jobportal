import { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { setShowRecruiterLogin, setShowUserLogin, userData, logoutUser } =
    useContext(AppContext);

  return (
    <div className="shadow py-4 bg-white sticky top-0 z-40">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer h-8 sm:h-9 hover:opacity-90 transition"
          src={assets.logo}
          alt="Job Portal Logo"
        />

        {userData ? (
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to={"/applications"}
              className="text-sm text-gray-600 hover:text-blue-600 font-medium transition duration-200"
            >
              Applied Jobs
            </Link>
            <span className="text-gray-300 max-sm:hidden">|</span>

            {/* Bespoke Custom Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 focus:outline-none">
                <img
                  className="w-9 h-9 rounded-full border-2 border-blue-500/20 object-cover shadow-sm group-hover:border-blue-500 transition duration-300"
                  src={userData.image || "https://avatar.iran.liara.run/public"}
                  alt="User Profile"
                />
                <span className="max-sm:hidden text-sm text-gray-700 font-medium group-hover:text-blue-600 transition duration-200">
                  {userData.name}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:rotate-180 transition duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu - Sleek Glassmorphic Transition */}
              <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md border border-gray-100 rounded-xl shadow-xl py-2 opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-300 origin-top-right z-50">
                <div className="px-4 py-3 border-b border-gray-50">
                  <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                    Logged in as
                  </p>
                  <p className="text-sm font-semibold text-neutral-800 truncate mt-0.5">
                    {userData.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {userData.email}
                  </p>
                </div>
                <div className="py-1">
                  <Link
                    to="/applications"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                    My Applications
                  </Link>
                </div>
                <div className="border-t border-gray-50 py-1">
                  <button
                    onClick={logoutUser}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 max-sm:text-xs">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => setShowUserLogin(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 sm:px-9 py-2.5 rounded-full transition duration-300 shadow-md shadow-blue-500/10"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
