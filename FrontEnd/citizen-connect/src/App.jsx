import { useContext, useEffect } from "react";
import "./App.css";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/ThemeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound, AdminDashboard } from "./screens";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import Incident from "./components/Report-Incident/Incident";
import Polls from "./components/Polls/Polls";
import AllIncidents from "./components/Incidents/AllIncidents";
import { CreatePoll } from "./components";
import PollMng from "./components/AdminPages/PollManagement/PollMng";
import ReportedIncidents from "./components/OfficialPage/ReportedIncidents/ReportedIncidents";
import OfficialRoute from "./components/OfficialRoute/OfficialRoute";
import OfficialScreen from "./screens/officialDashboard/OfficialScreen";
import Summary from "./components/OfficialPage/Summary/Summary";
import IncidentDetails from "./components/OfficialPage/IncidentDetails/IncidentDetails";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import RequestPasswordReset from "./components/RequestReset/RequestPasswordReset";
import AIChat from "./components/AIChat/AIChat";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/request-password-reset" element={<RequestPasswordReset />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route element={<BaseLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/incident" element={<Incident />} />
            <Route path="/poll" element={<Polls />} />
            <Route path="/allincidents" element={<AllIncidents />} />
            <Route path="/chat" element={<AIChat />} />
            <Route
              path="/admindashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/createpoll"
              element={
                <AdminRoute>
                  <CreatePoll />
                </AdminRoute>
              }
            />
            <Route
              path="/managepoll"
              element={
                <AdminRoute>
                  <PollMng />
                </AdminRoute>
              }
            />
            <Route
              path="/officialdashboard"
              element={
                <OfficialRoute>
                  <OfficialScreen />
                </OfficialRoute>
              }
            />
            <Route
              path="/reportedincidents"
              element={
                <OfficialRoute>
                  <ReportedIncidents />
                </OfficialRoute>
              }
            />
            <Route
              path="/summary"
              element={
                <OfficialRoute>
                  <Summary />
                </OfficialRoute>
              }
            />
            <Route
              path="/view/:incidentId"
              element={
                <OfficialRoute>
                  <IncidentDetails/>
                </OfficialRoute>
              }
            />
          </Route>
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router>
    </>
  );
}

export default App;
