const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/create", taskController.postAddTask); //create

router.put("/edit", taskController.putUpdateTask); //edit

router.delete("/delete", taskController.deleteTask); //delete

router.get("/", taskController.getTasks); //get all

module.exports = router;
