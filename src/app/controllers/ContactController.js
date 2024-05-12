const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(request, response) {
    // Listar todos os contatos
    const queryParams = request.query.order;
    const contacts = await ContactsRepository.findAll(queryParams);

    response.json(contacts);
  }

  async show(request, response) {
    // Obter um único registro
    const { id } = request.params;
    const [ contact ] = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({error: "User not found"});
    }

    response.json(contact);

  }

  async store(request, response) {
    // Criar novo registro
    let { name, email, phone, category_id } = request.body;
    let [ emailExists ] = await ContactsRepository.findByEmail(email);


    if (!name) {
      return response.status(400).json({error: "Name is required"});
    }

    if (emailExists) {
      return response.json({error: "Email already in use"});
    }

    const contact = await ContactsRepository.create(
      {name, email, phone, category_id}
    );

    response.status(200).json(contact);
  }

  async update(request, response) {
    // Editar novo registro
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const [ contato ] = await ContactsRepository.findById(id);

    const [ contactExists ] = await ContactsRepository.findByEmail(email);

    if (contato?.id != id || !contato) {
      return response.status(404).json({error: "User not found"});
    }

    if (contactExists?.email == email ) {
      return response.status(400).json({error: "Email already in use"});
    }

    if (!request.body.name) {
      return response.status(400).json({error: "Name is required"});
    }

    const contactToEdit = await ContactsRepository.update(id, [name, email, phone, category_id]);

    response.send(contactToEdit);

  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await ContactsRepository.delete(id);
    // 204: No Content - Sem body
    response.sendStatus(204);

  }
}


// Singleton
module.exports = new ContactController();
