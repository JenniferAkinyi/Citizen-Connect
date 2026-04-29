import { Outlet } from "react-router-dom";

const BaseLayout = () => {
  return (
    <main className="page-wrapper">
      <Outlet />
    </main>
  );
};

export default BaseLayout;