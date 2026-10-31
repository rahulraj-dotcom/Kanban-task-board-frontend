import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TaskContext } from "../context/taskContext";
import { useNavigate } from "react-router";

const useTask = () => {
  const { tasks, addTask, updateTask, deleteTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    addTask(data);

    navigate("/");
    reset();
  };

  return {
    register,
    handleSubmit,
    reset,
    errors,
    formSubmit,
    tasks,
    updateTask,
    addTask,
    deleteTask
  };
};

export default useTask;
