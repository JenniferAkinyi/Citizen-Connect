import { useContext, useRef, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { SidebarContext } from '../../context/SidebarContext';
import {
  MdOutlineClose,
  MdOutlineCrisisAlert,
  MdOutlineFolder,
  MdOutlineGridView,
  MdOutlineLogin,
  MdOutlineLogout,
  MdOutlinePeople,
  MdOutlinePoll
} from 'react-icons/md';
import './Sidebar.css';
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
  }, [isLoggedIn]);

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav 
      className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <span className='sidebar-brand-text'>Citizen Connect</span>
        </div>
        <button className='sidebar-close-btn' onClick={closeSidebar}>
          <MdOutlineClose size={24}/>
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className='menu-list'>
            <li className='menu-item'>
              <NavLink to='/dashboard' className='menu-link' activeclassname='active'>
                <span className='menu-link-icon'>
                  <MdOutlineGridView size={18}/>
                </span>
                <span className='menu-link-text'>Home</span>
              </NavLink>
            </li>
          </ul>
          <ul className='menu-list'>
            <li className='menu-item'>
              <NavLink to='/incident' className='menu-link' activeclassname='active'>
                <span className='menu-link-icon'>
                  <MdOutlineCrisisAlert size={18}/>
                </span>
                <span className='menu-link-text'>Report Incident</span>
              </NavLink>
            </li>
          </ul>
          <ul className='menu-list'>
            <li className='menu-item'>
              <NavLink to='/poll' className='menu-link' activeclassname='active'>
                <span className='menu-link-icon'>
                  <MdOutlinePoll size={18}/>
                </span>
                <span className='menu-link-text'>Public Polls</span>
              </NavLink>
            </li>
          </ul>
          <ul className='menu-list'>
            <li className='menu-item'>
              <NavLink to='/allincidents' className='menu-link' activeclassname='active'>
                <span className='menu-link-icon'>
                  <MdOutlineFolder size={18}/>
                </span>
                <span className='menu-link-text'>Reported Incidents</span>
              </NavLink>
            </li>
          </ul>
          <ul className='menu-list'>
            <li className='menu-item'>
              <NavLink to='/profile' className='menu-link' activeclassname='active'>
                <span className='menu-link-icon'>
                  <MdOutlinePeople size={18}/>
                </span>
                <span className='menu-link-text'>Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebar-menu sidebar-menu2">
          <ul className='menu-list'>
            <li className='menu-item'>
              {isLoggedIn ? (
                <NavLink to='/' onClick={handleLogout} className='menu-link' activeclassname='active'>
                  <span className='menu-link-icon'>
                    <MdOutlineLogout size={20}/>
                  </span>
                  <span className='menu-link-text'>Logout</span>
                </NavLink>
              ) : (
                <NavLink to='/' onClick={handleLogin} className='menu-link' activeclassname='active'>
                  <span className='menu-link-icon'>
                    <MdOutlineLogin size={20}/>
                  </span>
                  <span className='menu-link-text'>Login</span>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;