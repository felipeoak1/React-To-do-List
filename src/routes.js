const { Router } = require("express");
const TasksController = require("./app/controllers/TasksController");

const router = Router();

// Tasks
router.get("/tasks",TasksController.index);
router.get("/tasks/:id", TasksController.show);
router.post("/tasks", TasksController.store);
router.put("/tasks/:id", TasksController.update);
router.delete("/tasks/:id", TasksController.delete);


module.exports = router;
