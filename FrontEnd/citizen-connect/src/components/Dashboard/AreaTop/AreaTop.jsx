import { React, useContext, useEffect, useState } from "react";
import "./AreaTop.css";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const AreaTop = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [name, setName] = useState("User");
  const [active, setActive] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Incidents", path: "/incident" },
    { name: "Polls", path: "/poll" },
    { name: "Governance", path: "/chat" },
  ];

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser && loggedInUser.name) {
          setName(loggedInUser.name);
        } else {
          console.error("User name is not available in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    fetchUserName();
  }, []);

  return (
    <section className="content-area-top">
      <div className="area-top-1">
        <h3 className="area-top-title">Citizen Connect</h3>
        <div className="area-top-nav">
          <ul>
            {navItems.map((item) => (
              <li
                key={item.name}
                className={location.pathname === item.path ? "active" : ""}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="area-top-2">
        <p>Hello, {name}</p>
      </div>
    </section>
  );
};

export default AreaTop;
