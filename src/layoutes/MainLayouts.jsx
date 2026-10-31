import { Outlet } from "react-router";
import AsideNavbar from "../components/AsideNavbar";

const MainLayouts = () => {
  return (
    <div className="flex h-screen bg-[#101426]">
      <div className="h-screen">
        <AsideNavbar />
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;
