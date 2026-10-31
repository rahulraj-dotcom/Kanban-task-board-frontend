import { BookPlus, Check, ClipboardList, House, Settings } from "lucide-react";
import { NavLink } from "react-router";

const AsideNavbar = () => {
  return (
    <aside className="flex h-screen w-72 flex-col bg-[#8f7ae5] px-5 py-6 text-white">
      {/* Logo */}
      <div className="border-b-2 border-white/30 pb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-500 p-3">
            <Check size={30} strokeWidth={4} />
          </div>

          <h1 className="text-3xl font-bold">TaskFlow</h1>
        </div>

        <p className="mt-3 text-sm font-medium leading-6 text-white/80">
          Manage your work, one task
          <br />
          at a time.
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex flex-col gap-3">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 rounded-lg px-5 py-3 text-lg font-semibold transition ${
              isActive ? "bg-orange-600 shadow-lg" : "hover:bg-white/10"
            }`
          }
        >
          <House size={24} />
          <span>Home</span>
        </NavLink>

        {/* Add Tasks */}
        <NavLink
          to="/add-tasks"
          className={({ isActive }) =>
            `flex items-center gap-4 rounded-lg px-5 py-3 text-lg font-semibold transition ${
              isActive ? "bg-orange-600 shadow-lg" : "hover:bg-white/10"
            }`
          }
        >
          <BookPlus  size={24} />
          <span>Add Tasks</span>
        </NavLink>

        {/* All Tasks */}
        <NavLink
          to="/all-tasks"
          className={({ isActive }) =>
            `flex items-center gap-4 rounded-lg px-5 py-3 text-lg font-semibold transition ${
              isActive ? "bg-orange-600 shadow-lg" : "hover:bg-white/10"
            }`
          }
        >
          <ClipboardList size={24} />
          <span>All Tasks</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AsideNavbar;
