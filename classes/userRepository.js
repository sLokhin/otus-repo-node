class UserRepository {
  #users = [];
  #nextId = 1;

  getAll() {
    return this.#users;
  }

  getById(id) {
    return this.#users.find((user) => user.id === id);
  }

  create(user) {
    user.id = this.#nextId++;
    this.#users.push(user);
    return user;
  }

  update(id, updatedUser) {
    const index = this.#users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.#users[index] = { id, ...updatedUser };
      return this.#users[index];
    }
    return null;
  }

  delete(id) {
    const index = this.#users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return this.#users.splice(index, 1);
    }
    return null;
  }

  login(name) {
    const user = this.#users.find((user) => user.name === name);
    if (user !== -1) {
      user.status = 'online';
      return user;
    }
    return null;
  }

  logout(name) {
    const user = this.#users.find((user) => user.name === name);
    if (user !== -1) {
      user.status = 'offline';
      return user;
    }
    return null;
  }
}

export default UserRepository;
