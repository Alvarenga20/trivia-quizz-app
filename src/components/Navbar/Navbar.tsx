import { Link, useLocation } from "react-router-dom";
import { FaHome, FaQuestionCircle, FaChartBar } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navbarElArr = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/quiz", icon: <FaQuestionCircle />, label: "Quiz" },
    { to: "/results", icon: <FaChartBar />, label: "Results" },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white fixed top-0 left-0 w-screen h-16 shadow-lg z-50">
      <ul className="flex justify-evenly items-center h-full">
        {navbarElArr.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link
              to={item.to}
              className={`flex flex-col items-center justify-center text-white hover:text-yellow-300 transition-all duration-300 ${
                location.pathname === item.to ? "text-yellow-300 scale-110" : ""
              }`}
            >
              <span
                className={`text-2xl mt-1 ${
                  location.pathname === item.to
                    ? "text-yellow-300 animate-bounce-bounded"
                    : ""
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`text-sm md:text-md mt-[3px] ${
                  location.pathname === item.to ? "font-bold" : ""
                }`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
