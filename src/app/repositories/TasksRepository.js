const db = require("../../database/index");

class TasksRepository {
  async findAll(queryParams = "asc") {
    // Protegendo contra SQL Injection
    const direction = queryParams.toLowerCase() == "desc" ? "desc" : "asc";

    const rows = await db.query(`
    SELECT *
    FROM tarefas
    ORDER BY tarefas.titulo ${direction}`);

    return rows;
  }

  async findById(id) {
    const  row  = await db.query(`
    SELECT *
    FROM tarefas
    WHERE tarefas.id = $1`, [id]);
    return row;
  }

  async create({titulo, descricao, status}) {
    const [ row ] =  await db.query(`
    INSERT INTO tarefas(titulo, descricao, status)
    VALUES($1, $2, $3)
    RETURNING *
    `, [titulo, descricao, status]);

    return row;
  };

  async update(id, [titulo, descricao, status]) {

    const editedTask = await db.query(`
      UPDATE tarefas
      SET titulo = $1, descricao = $2, status = $3
      WHERE id = $4
      RETURNING *
      `, [titulo, descricao, status, id]);

    return editedTask;
  }

  async delete (id) {
    const deleteTask = await db.query( `
    DELETE FROM tarefas
    WHERE id = $1`, [id]);
    return deleteTask;
  }

}

module.exports = new TasksRepository();
