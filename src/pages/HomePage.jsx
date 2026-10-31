import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router";
import useTask from "../hooks/useTask";
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const { tasks } = useTask();
  const [search, setSearch] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPriority =
      selectedPriority === "all" || task.priority === selectedPriority;

    const matchesStatus =
      selectedStatus === "all" || task.status === selectedStatus;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const filteredTodoTasks = filteredTasks.filter(
    (task) => task.status === "todo",
  );

  const filteredInProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress",
  );

  const filteredCompletedTasks = filteredTasks.filter(
    (task) => task.status === "completed",
  );

  return (
    <div className="min-h-screen bg-[#101426] px-5 py-6 text-white md:px-8 lg:px-10">
      {/* ================= HEADER ================= */}
      <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Kanban Task Board</h1>

          <p className="mt-2 text-gray-400">
            Plan <span className="mx-2">•</span>
            Track <span className="mx-2">•</span>
            Get Things Done
          </p>
        </div>

        <button
          onClick={() => navigate("/add-tasks")}
          className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-8 py-3 font-bold transition hover:bg-orange-600"
        >
          <Plus size={20} />
          Add Task
        </button>
      </header>

      {/* ================= SUMMARY CARDS ================= */}
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Total Tasks */}
        <div className="rounded-lg border border-white/10 bg-[#18213b] p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-purple-500/20 p-3 text-purple-400">
              <CheckCircle2 size={28} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-400">Total Tasks</p>

              <h2 className="mt-1 text-2xl font-bold">{tasks.length}</h2>
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="rounded-lg border border-white/10 bg-[#18213b] p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-500/20 p-3 text-blue-400">
              <Clock3 size={28} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-400">In Progress</p>

              <h2 className="mt-1 text-2xl font-bold">
                {inProgressTasks.length}
              </h2>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-lg border border-white/10 bg-[#18213b] p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-green-500/20 p-3 text-green-400">
              <CheckCircle2 size={28} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-400">Completed</p>

              <h2 className="mt-1 text-2xl font-bold">
                {completedTasks.length}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEARCH + FILTER ================= */}
      <section className="mt-6 flex flex-col gap-4 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={21}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search tasks by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border-2 border-white/10 bg-[#18213b] py-4 pl-12 pr-4 text-white outline-none placeholder:text-gray-500 focus:border-orange-500/50"
          />
        </div>

        {/* Priority Filter */}
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="rounded-lg border-2 border-white/10 bg-[#18213b] px-5 py-4 text-gray-300 outline-none focus:border-orange-500/50"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="rounded-lg border border-white/10 bg-[#18213b] px-5 py-4 text-gray-300 outline-none focus:border-orange-500/50"
        >
          <option value="all">All Statuses</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </section>

      {/* ================= KANBAN BOARD ================= */}
      <section className="mt-6 grid gap-5 xl:grid-cols-3">
        {/* ================= TODO ================= */}
        <div className="rounded-lg border-2 border-white/10 bg-[#11182e]">
          {/* Column Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-gray-300" />

              <h2 className="text-xl font-bold">Todo</h2>
            </div>

            <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-gray-300">
              {todoTasks.length}
            </span>
          </div>

          {/* Tasks */}
          <div className="flex flex-col gap-4 p-4">
            {/* Tasks */}
            {filteredTodoTasks.length > 0 ? (
              filteredTodoTasks.map((task, index) => (
                <div
                  key={index}
                  className="rounded-lg border-2 border-white/10 bg-[#19213d] p-5"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold">{task.title}</h3>
                    <MoreVertical size={19} className="text-gray-500" />
                  </div>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {task.description}
                  </p>

                  <div className="mt-4">
                    <span className="rounded-md bg-orange-500/20 px-4 py-2 text-xs font-bold text-orange-400">
                      {task.priority}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
                    <CalendarDays size={17} />
                    {task.dueDate}
                  </div>
                </div>
              ))
            ) : (
              <p className="py-5 text-center text-gray-500">
                No tasks available
              </p>
            )}{" "}
            {/* Add Task */}
            <button
              onClick={() => navigate("/add-tasks")}
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/20 py-3 font-bold text-gray-400 transition hover:border-orange-500 hover:text-orange-500"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>
        </div>

        {/* ================= IN PROGRESS ================= */}
        <div className="rounded-lg border border-white/10 bg-[#11182e]">
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-blue-500" />

              <h2 className="text-xl font-bold">In Progress</h2>
            </div>

            <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-gray-300">
              {inProgressTasks.length}
            </span>
          </div>

          <div className="flex flex-col gap-4 p-4">
            {filteredInProgressTasks.length > 0 ? (
              filteredInProgressTasks.map((task, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-white/10 bg-[#19213d] p-5"
                >
                  <h3 className="text-lg font-bold">{task.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {task.description}
                  </p>

                  <div className="mt-4">
                    <span className="rounded-md bg-orange-500/20 px-4 py-2 text-xs font-bold text-orange-400">
                      {task.priority}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
                    <CalendarDays size={17} />
                    {task.dueDate}
                  </div>
                </div>
              ))
            ) : (
              <p className="py-5 text-center text-gray-500">
                No tasks available
              </p>
            )}

            {/* Add Task */}
            <button
              onClick={() => navigate("/add-tasks")}
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/20 py-3 font-bold text-gray-400 transition hover:border-orange-500 hover:text-orange-500"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>
        </div>

        {/* ================= COMPLETED ================= */}
        <div className="rounded-lg border border-white/10 bg-[#11182e]">
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-green-400" />

              <h2 className="text-xl font-bold">Completed</h2>
            </div>

            <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-gray-300">
              {completedTasks.length}
            </span>
          </div>

          <div className="flex flex-col gap-4 p-4">
            {filteredCompletedTasks.length > 0 ? (
              filteredCompletedTasks.map((task, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-white/10 bg-[#19213d] p-5"
                >
                  <h3 className="text-lg font-bold">{task.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {task.description}
                  </p>

                  <div className="mt-4">
                    <span className="rounded-md bg-green-500/20 px-4 py-2 text-xs font-bold text-green-400">
                      {task.priority}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
                    <CalendarDays size={17} />
                    {task.dueDate}
                  </div>
                </div>
              ))
            ) : (
              <p className="py-5 text-center text-gray-500">
                No tasks available
              </p>
            )}

            {/* Add Task */}
            <button
              onClick={() => navigate("/add-tasks")}
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/20 py-3 font-semibold text-gray-400 transition hover:border-orange-500 hover:text-orange-500"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
