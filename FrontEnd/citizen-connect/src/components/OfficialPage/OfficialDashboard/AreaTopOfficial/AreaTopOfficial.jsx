import { React, useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../../../context/SidebarContext.jsx";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AreaTopOfficial = () => {
  const { openSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();
  const [name, setName] = useState("User");
  const [location, setLocation] = useState()

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
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser && loggedInUser.location) {
          setLocation(loggedInUser.location);
        } else {
          console.error("User location is not available in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };
    fetchLocation();
  }, []);

  return (
    <section className="content-area-top">
      <div className="area-top-1">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h3 className="area-top-title">Dashboard</h3>
      </div>
      <div className="area-top-2">
        <p>Hello, {name}, {location} Government Official</p>
      </div>
    </section>
  );
};

export default AreaTopOfficial;