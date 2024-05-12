const db = require("../../database/index");

class ContactsRepository {
  async findAll(queryParams = "asc") {
    // Protegendo contra SQL Injection
    const direction = queryParams.toLowerCase() == "desc" ? "desc" : "asc";

    const rows = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}`);

    return rows;
  }

  async findById(id) {
    const  row  = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1`, [id]);
    return row;
  }

  async findByEmail(email) {
    const contactEmail  = await db.query(`
    SELECT *
    FROM contacts
    WHERE email = $1`, [email]);

    return contactEmail;
  }

  async create({name, email, phone, category_id}) {
    const [ row ] =  await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  };

  async update(id, [name, email, phone, category_id]) {

    const editedContact = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
      `, [name, email, phone, category_id, id]);

     return editedContact;
  }

  async delete (id) {
    const deleteContact = await db.query( `
    DELETE FROM contacts
    WHERE id = $1`, [id]);
    return deleteContact;
  }

}

module.exports = new ContactsRepository();
