const Task = require("../models/task");

const errorHandler = (status,message,res)=>{
res.status(status).json({message:message});
}

exports.postAddTask = async (req, res) => {
  const title = req.body.title || "No title";
  const description = req.body.description || "No description";

  try {
    await new Task({
      title: title,
      description: description,
    }).save();
  } catch (err) {
    return errorHandler(500,err,res)
  }

  res.status(200).json({ message: "Task created!" });
};

exports.getTasks = async (req, res) => {
  let tasks;
  try {
    tasks = await Task.find();
  } catch (err) {
    return errorHandler(500,"Fetching failed",res)
  }

  const message = tasks.length == 0 ? "No tasks" : "";
  res.status(200).json({ message: message, body: tasks });
};

exports.putUpdateTask = async (req, res) => {
  const taskId = req.body.taskId;
  if (!taskId) {
    return errorHandler(404,'Invalid task id',res);
  }
  const update = { title: req.body.title || "No title", description: req.body.description || "No description" };

  try {
    await Task.findByIdAndUpdate(taskId, update, { new: true });
  } catch (err) {
    return errorHandler(500,'Cast failed',res);
  }
  res.status(201).json({ message: "Task updated!" });
};

exports.deleteTask = async (req, res) => {
  const taskId = req.body.taskId;
  if(!taskId){
      return errorHandler(404,'No id!',res)
  }
  try {
    await Task.findByIdAndDelete(taskId);
  } catch (err) {
    return errorHandler(404,'Cast failed!',res);
  }
  res.status(200).json({ message: "Task deleted!" });
};
