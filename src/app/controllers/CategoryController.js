const CategoryRepository = require("../repositories/CategoryRepository");

class CategoryController {

  async index(request, response) {
    const { order } = request.query;

    const categories = await CategoryRepository.index(order);

    response.send(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      return response.sendStatus(400).json({error: "Category not found"});
    }

    response.send(categoryExists);
  }

  async store(request, response) {
    const { name } = request.body;

    const nameExists = await CategoryRepository.findByName(name);

    if (!name) {
      return response.status(400).json({error: "Name is required"});
    }

    if (nameExists?.name == name) {
      return response.status(400).json({error: "Name is already in use"});
    }

    const newCategory = await CategoryRepository.create(name);

    response.send(newCategory);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const categoryId = await CategoryRepository.findById(id);
    const categoryExists = await CategoryRepository.findByName(name);

    if (!name) {
      return response.json({error: "Name is required"});
    }

    if (categoryExists?.name == name) {
      return response.status(400).json({error: "Name is already in use"});
    }

    if (!categoryId) {
      return response.status(404).json({error: "Category not found"});
    }

    const newCategory = await CategoryRepository.update(id, name);

    response.json(newCategory);
  }

  // async delete(request, response) {
  //   const { id } = request.params;

  //   const deleteOp = await CategoryRepository.delete(id);

  //   response.json(deleteOp);
  // }
}

module.exports = new CategoryController();
