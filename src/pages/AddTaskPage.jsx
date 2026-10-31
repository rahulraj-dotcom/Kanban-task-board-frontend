import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Flag,
  ListTodo,
  Plus,
  Type,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import useTask from "../hooks/useTask";
import { useEffect } from "react";

const AddTaskPage = () => {
  const { register, handleSubmit, reset, errors, tasks, addTask, updateTask } =
    useTask();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const index = searchParams.get("index");

  useEffect(() => {
    if (index !== null) {
      reset(tasks[Number(index)]);
    }
  }, [index, tasks, reset]);

  const formSubmit = (data) => {
    if (index !== null) {
      updateTask(Number(index), data);
    } else {
      addTask(data);
    }

    reset();
    navigate("/all-tasks");
  };

  return (
    <div className="min-h-screen bg-[#101426] px-5 py-8 text-white md:px-8 lg:px-12">
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition hover:text-orange-400"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold md:text-4xl">
          {index !== null ? "Edit Task" : "Add New Task"}
        </h1>

        <p className="mt-2 text-md text-orange-400 font-bold">
          Create a new task and organize your workflow.
        </p>
      </div>

      {/* ================= FORM CONTAINER ================= */}
      <div className="mx-auto max-w-3xl rounded-lg border border-white/10 bg-[#18213b] p-5 shadow-xl md:p-8">
        {/* FORM HEADER */}
        <div className="mb-7 flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="rounded-xl bg-orange-500/20 p-3 text-orange-400">
            <ListTodo size={28} />
          </div>

          <div>
            <h2 className="text-xl font-bold">Task Information</h2>
            <p className="mt-1 text-sm font-semibold text-gray-400">
              Fill in the details below to create your task.
            </p>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-6"
        >
          {/* TASK TITLE */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="flex items-center gap-2 text-sm font-semibold text-gray-200"
            >
              <Type size={17} className="text-purple-400" />
              Task Title
            </label>

            <input
              {...register("title", {
                required: "Task title is required",
              })}
              type="text"
              placeholder="e.g. Design Login Page"
              className="w-full rounded-md border-2 border-white/10 bg-[#101426] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500/50 "
            />
            {errors.title && (
              <p className="text-sm text-red-400 font-bold">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-semibold text-gray-200"
            >
              <FileText size={17} className="text-purple-400" />
              Description
            </label>

            <textarea
              {...register("description", {
                required: "Task description is required",
              })}
              rows="5"
              placeholder="Describe what needs to be done..."
              className="w-full rounded-md border-2 border-white/10 bg-[#101426] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500/50 "
            />
            {errors.description && (
              <p className="text-sm text-red-400 font-bold">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* PRIORITY + DUE DATE */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* PRIORITY */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="priority"
                className="flex items-center gap-2 text-sm font-semibold text-gray-200"
              >
                <Flag size={17} className="text-orange-400" />
                Priority
              </label>

              <select
                {...register("priority", {
                  required: "Task priority is required",
                })}
                id="priority"
                defaultValue=""
                className="w-full rounded-md border-2 border-white/10 bg-[#101426] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500/50 "
              >
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <p className="text-sm text-red-400 font-bold">
                  {errors.priority.message}
                </p>
              )}
            </div>

            {/* DUE DATE */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="dueDate"
                className="flex items-center gap-2 text-sm font-semibold text-gray-200"
              >
                <CalendarDays size={17} className="text-orange-400" />
                Due Date
              </label>

              <input
                {...register("dueDate", {
                  required: "Task date is required",
                })}
                type="date"
                className="w-full rounded-md border-2 border-white/10 bg-[#101426] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500/50 "
              />
              {errors.dueDate && (
                <p className="text-sm text-red-400 font-bold">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
          </div>

          {/* STATUS */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="status"
              className="flex items-center gap-2 text-sm font-semibold text-gray-200"
            >
              <ListTodo size={17} className="text-purple-400" />
              Task Status
            </label>

            <select
              {...register("status", {
                required: "Task status is required",
              })}
              id="status"
              defaultValue="todo"
              className="w-full rounded-md border-2 border-white/10 bg-[#101426] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-500 focus:border-orange-500/50 "
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-400 font-bold">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* FORM BUTTONS */}
          <div className="mt-3 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
            <Link
              to="/"
              className="flex items-center justify-center rounded-md border-2 border-white/10 px-8 py-3 font-bold text-gray-300 transition hover:bg-white/5"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="flex items-center justify-center border-2 border-orange-500 gap-2 rounded-md bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              <Plus size={20} />
              {index !== null ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;
