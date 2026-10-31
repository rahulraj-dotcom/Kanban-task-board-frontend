import { useState } from "react";
import {
  Search,
  Plus,
  CalendarDays,
  Flag,
  ListTodo,
  Clock3,
  CheckCircle2,
  Circle,
  Edit3,
  Trash2,
  List,
  LayoutGrid,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import useTask from "../hooks/useTask";

const AllTaskPage = () => {
  const navigate = useNavigate();

  const { tasks, deleteTask } = useTask();
  const [search, setSearch] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const todoTasks = tasks.filter((task) => task.status === "todo");

  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  const completedTasks = tasks.filter((task) => task.status === "completed");

  const priorityStyle = {
    high: "bg-red-500/10 text-red-400",
    medium: "bg-yellow-500/10 text-yellow-400",
    low: "bg-green-500/10 text-green-400",
  };

  const statusStyle = {
    todo: "bg-zinc-500/10 text-zinc-400",
    "in-progress": "bg-blue-500/10 text-blue-400",
    completed: "bg-green-500/10 text-green-400",
  };

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

  return (
    <div className="min-h-screen bg-[#101426] px-4 py-6 text-white sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">All Tasks</h1>
          <p className="mt-2 text-sm font-semibold text-orange-400">
            Manage and organize all your tasks in one place.
          </p>
        </div>

        <Link
          to="/add-tasks"
          className="flex w-fit items-center gap-2 rounded-md bg-orange-500 px-5 py-3 text-sm font-bold transition hover:bg-orange-600"
        >
          <Plus size={18} />
          Add New Task
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border-2 border-white/5 bg-[#18213b] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-400">Total Tasks</p>
            <ListTodo size={22} className="text-purple-400" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">{tasks.length}</h2>{" "}
          <p className="mt-1 text-xs text-gray-500">All created tasks</p>
        </div>

        <div className="rounded-lg border-2 border-white/5 bg-[#18213b] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-400">Todo</p>
            <Circle size={22} className="text-gray-400" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">{todoTasks.length}</h2>{" "}
          <p className="mt-1 text-xs text-gray-500">Tasks waiting to start</p>
        </div>

        <div className="rounded-lg border-2 border-white/5 bg-[#18213b] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-400">In Progress</p>
            <Clock3 size={22} className="text-blue-400" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">{inProgressTasks.length}</h2>{" "}
          <p className="mt-1 text-xs text-gray-500">Currently working on</p>
        </div>

        <div className="rounded-lg border-2 border-white/5 bg-[#18213b] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-400">Completed</p>
            <CheckCircle2 size={22} className="text-green-400" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">{completedTasks.length}</h2>{" "}
          <p className="mt-1 text-xs text-gray-500">Successfully completed</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 rounded-lg border-2 border-white/5 bg-[#18213b] p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search tasks by title..."
              className="w-full rounded-lg border-2 font-semibold border-white/10 bg-[#101426] py-3 pl-10 pr-4 text-sm outline-none placeholder:text-gray-500 focus:border-orange-500"
            />
          </div>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="rounded-lg border-2 font-semibold border-white/10 bg-[#101426] px-4 py-3 text-sm text-gray-300 outline-none focus:border-orange-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border-2 font-semibold border-white/10 bg-[#101426] px-4 py-3 text-sm text-gray-300 outline-none focus:border-orange-500"
          >
            <option value="all">All Statuses</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Tasks Container */}
      <div className="overflow-hidden rounded-lg border border-white/5 bg-[#18213b]">
        {/* Tasks Header */}
        <div className="flex flex-col justify-between gap-3 border-b border-white/5 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">Task List</h2>
            <p className="mt-1 text-xs text-gray-500">
              All your tasks at a glance
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-orange-500/10 p-2 text-orange-400">
              <List size={19} />
            </button>
            <button className="rounded-lg p-2 text-gray-500 hover:bg-white/5">
              <LayoutGrid size={19} />
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead className="bg-[#11182e] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4 font-bold">Task</th>
                <th className="px-5 py-4 font-bold">Priority</th>
                <th className="px-5 py-4 font-bold">Status</th>
                <th className="px-5 py-4 font-bold">Due Date</th>
                <th className="px-5 py-4 text-center font-bold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                  <tr
                    key={index}
                    className="border-t border-white/5 transition hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-5">
                      <h3 className="text-sm font-medium">{task.title}</h3>
                      <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                        {task.description}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${priorityStyle[task.priority]}`}
                      >
                        <Flag size={12} className="mr-1 inline" />
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${statusStyle[task.status]}`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <span className="flex items-center gap-2 text-xs text-gray-400">
                        <CalendarDays size={15} />
                        {task.dueDate}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() =>
                            navigate(`/add-tasks?index=${tasks.indexOf(task)}`)
                          }
                          className="text-blue-400"
                        >
                          <Edit3 size={17} />
                        </button>

                        <button
                          onClick={() => deleteTask(tasks.indexOf(task))}
                          className="text-red-400"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500">
                    No tasks available. Create your first task!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Task Cards */}
        <div className="grid gap-3 p-4 md:hidden">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <div
                key={index}
                className="rounded-lg border border-white/5 bg-[#11182e] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">{task.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {task.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-5">
                    <button
                      onClick={() =>
                        navigate(`/add-tasks?index=${tasks.indexOf(task)}`)
                      }
                      className="text-blue-400"
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      onClick={() => deleteTask(tasks.indexOf(task))}
                      className="text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-md px-4 py-2 text-xs ${priorityStyle[task.priority]}`}
                  >
                    {task.priority}
                  </span>

                  <span
                    className={`rounded-md px-4 py-2 text-xs ${statusStyle[task.status]}`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <CalendarDays size={14} />
                  {task.dueDate}
                </div>
              </div>
            ))
          ) : (
            <p className="py-10 text-center text-gray-500">
              No tasks available. Create your first task!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTaskPage;
