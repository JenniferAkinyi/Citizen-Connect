import { Outlet } from "react-router-dom";
import AreaTop from "../components/Dashboard/AreaTop/AreaTop";


const BaseLayout = () => {
  return (
    <main className="page-wrapper">
      <AreaTop />
      <Outlet />
    </main>
  );
};

export default BaseLayout;