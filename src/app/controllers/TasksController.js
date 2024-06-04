const TasksRepository = require("../repositories/TasksRepository");

class TasksController {
  async index(request, response) {
    const queryParams = request.query.orderBy;
    const tasks = await TasksRepository.findAll(queryParams);

    response.json(tasks);
  }

  async show(request, response) {
    const { id } = request.params;
    const [ tasks ] = await TasksRepository.findById(id);

    if (!tasks) {
      return response.status(404).json({error: "Task not found"});
    }

    response.json(tasks);

  }

  async store(request, response) {
    const { id } = request.params;
    let { titulo , descricao , status } = request.body;

    let [ taskExists ] = await TasksRepository.findById(id);

    if (!["pendente", "em progresso", "concluída"].includes(status.toLowerCase()) || !status) {
      return response.status(400).json({error: "Status is invalid."});
    }

    if (!titulo) {
      return response.status(400).json({error: "Title is required"});
    }

    if (taskExists) {
      return response.status(400).json({error: "This task already exists"});
    }

    const task = await TasksRepository.create(
      {titulo, descricao, status}
    );

    response.status(201).json(task);
  }

  async update(request, response) {
    const { id } = request.params;
    const { titulo , descricao, status } = request.body;

    const [ task ] = await TasksRepository.findById(id);

    if (task?.id != id || !task) {
      return response.status(404).json({error: "Task not found"});
    }

    if (!request.body.titulo) {
      return response.status(400).json({error: "Title is required"});
    }

    const taskToEdit = await TasksRepository.update(id, [titulo, descricao, status]);

    response.send(taskToEdit);

  }

  async delete(request, response) {
    const { id } = request.params;

    await TasksRepository.delete(id);
    response.sendStatus(204);

  }
}


// Singleton
module.exports = new TasksController();

