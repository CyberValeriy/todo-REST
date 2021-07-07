const Task = require("../models/task");

exports.postAddTask = async (req, res) => {
  const title = req.body.title || "No title";
  const description = req.body.description || "No description";

  try {
    await new Task({
      title: title,
      description: description,
    }).save();
  } catch (err) {
    return res.status(500).json({ message: err });
  }

  res.status(200).json({ message: "Task created!" });
};

exports.getTasks = async (req, res) => {
  let tasks;
  try {
    tasks = await Task.find();
  } catch (err) {
    return res.status(500).json({ message: err });
  }

  const message = tasks.length == 0 ? "No tasks" : "";
  res.status(200).json({ message: message, body: tasks });
};

exports.putUpdateTask = async (req, res) => {
  const taskId = req.body.taskId;
  if (!taskId) {
    return res.status(404).json({ message: "Invalid task id!" });
  }
  const update = { title: req.body.title || "No title", description: req.body.description || "No description" };

  try {
    await Task.findByIdAndUpdate(taskId, update, { new: true });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  res.status(201).json({ message: "Task updated!" });
};

exports.deleteTask = async (req, res) => {
  const taskId = req.body.taskId;
  if(!taskId){
      return res.status(404).json({message:'No id!'})
  }
  try {
    await Task.findByIdAndDelete(taskId);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  res.status(200).json({ message: "Task deleted!" });
};
