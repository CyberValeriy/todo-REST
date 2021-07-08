const Task = require("../models/task");

const response = (status,message,res,body = {})=>{
res.status(status).json({message:message,body:body});
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
    return response(500,err,res)
  }
  response(200,"Task Created!",res);
};

exports.getTasks = async (req, res) => {
  let tasks;
  try {
    tasks = await Task.find();
  } catch (err) {
    return response(500,"Fetching failed",res)
  }
  const message = tasks.length == 0 ? "No tasks" : "";
  response(200,message,res,tasks);
};

exports.putUpdateTask = async (req, res) => {
  const taskId = req.body.taskId;
  if (!taskId) {
    return response(404,'Invalid task id',res);
  }
  const update = { title: req.body.title || "No title", description: req.body.description || "No description" };
  try {
    await Task.findByIdAndUpdate(taskId, update, { new: true });
  } catch (err) {
    return response(500,'Cast failed',res);
  }
  response(201,'Task updated!',res);
};

exports.deleteTask = async (req, res) => {
  const taskId = req.body.taskId;
  if(!taskId){
      return response(404,'No id!',res)
  }
  try {
    await Task.findByIdAndDelete(taskId);
  } catch (err) {
    return response(404,'Cast failed!',res);
  }
  response(200,'Task deleted',res);
};
