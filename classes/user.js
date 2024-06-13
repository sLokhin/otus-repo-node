class User {
  constructor(id, password, name, email) {
    this.id = id;
    this.password = password;
    this.name = name;
    this.email = email;
    this.status = 'created';
  }
}

export default User;
