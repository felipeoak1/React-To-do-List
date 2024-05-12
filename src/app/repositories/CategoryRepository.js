const db = require("../../database/index");

class CategoryRepository {

  async findById(id) {
    const [ categoryExist ] = await db.query(`
      SELECT *
      FROM categories
      WHERE id = $1
    `, [id]);

    return categoryExist;
  }

  async findByName (name) {
    const [ categoryName ] = await db.query(`
      SELECT *
      FROM categories
      WHERE name = $1
    `, [name]);

    return categoryName;
  }

  async index(order = "asc") {
    const direction = order == "desc" ? "desc" : "asc";

    const categories = await db.query(`
    SELECT *
    FROM categories
    ORDER BY name ${direction}
    `);

    return categories;
  }

  async create(name) {

    const [ newCategory ] = await db.query(`
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING *
  `, [name]);

  return newCategory;

  }

  async update(id, name) {
    const [ updateCategory ] = await db.query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);

    return updateCategory;
  }

  async delete(id) {

    const deletedCategory = await db.query(`
      DELETE
      FROM categories
      WHERE id = $1
      RETURNING *
    `, [id]);


    return deletedCategory;
  }
}

module.exports = new CategoryRepository();
