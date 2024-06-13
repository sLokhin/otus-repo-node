class CourseRepository {
  #courses = [];
  #nextId = 1;

  getAll() {
    return this.#courses;
  }

  getById(id) {
    return this.#courses.find((user) => user.id === id);
  }

  create(course) {
    course.id = this.#nextId++;
    this.#courses.push(course);
    return course;
  }

  update(id, updatedCourse) {
    const index = this.#courses.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.#courses[index] = { id, ...updatedCourse };
      return this.#courses[index];
    }
    return null;
  }

  delete(id) {
    const index = this.#courses.findIndex((user) => user.id === id);
    if (index !== -1) {
      return this.#courses.splice(index, 1);
    }
    return null;
  }
}

export default CourseRepository;
